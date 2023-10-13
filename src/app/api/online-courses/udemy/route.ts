import { getAllCourses } from '@server/online-courses/udemy/utils';

export async function GET(request: Request) {
  // get 'searchterm' param from request

  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchterm');

  const fieldsParameterForTheAIALgo =
    'fields[course]=title,headline,price,url,image_480x270,created,visible_instructors,avg_rating,num_reviews,num_subscribers,locale,description';

  const searchText = 'physics';

  const courses = await getAllCourses(fieldsParameterForTheAIALgo, searchText);

  return Response.json(courses);

  //   for (const course of courses) {
  //     const courseId = course.id;
  //     const reviews = await getAllReviewsForCourse(courseId);
  //     course.reviews = reviews;
  //   }

  // export default async function getAllReviewsForCourse(courseId: string) {
  //   const allReviews = [];
  //   let nextPage = `https://www.udemy.com/api-2.0/courses/${courseId}/reviews/?page=1&page_size=100&fields[course_review]=rating,content`;

  //   while (nextPage) {
  //     const response = await fetch(nextPage, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: 'Basic ' + btoa(API_KEY),
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const data = await response.json();
  //     data.results = data.results.reduce((acc, review) => {
  //       if (review.content !== '') {
  //         acc.push(review.content);
  //       }
  //       return acc;
  //     }, []);

  //     if (data.results && data.results.length > 0) {
  //       allReviews.push(...data.results);
  //     }

  //     nextPage = data.next;
  //   }

  //   return allReviews;
  // }
}
