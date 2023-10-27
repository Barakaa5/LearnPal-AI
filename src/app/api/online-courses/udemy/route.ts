import getAllReviewsForCourse, {
  getAllCourses,
} from '@server/online-courses/udemy/utils';

export async function GET(request: Request) {
  const url = new URL(request.url); // Assuming your server is running on http://localhost:3000
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }

  const fieldsParameterForTheAIALgo =
    'fields[course]=title,headline,price,url,image_480x270,created,visible_instructors,avg_rating,num_reviews,num_subscribers,locale,description';

  const courses = await getAllCourses(fieldsParameterForTheAIALgo, subject);

  const fetchReviewsPromises = courses.map((course) =>
    getAllReviewsForCourse(course.id.toString()).then((reviews) => {
      course.reviews = reviews;
    })
  );

  try {
    await Promise.all(fetchReviewsPromises);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Optionally, you might want to send a response with an error status/code
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }

  return Response.json(courses);
}
