import { UdemyCourseType } from '@type/online-courses/udemy';
import { UdemyCourseReviewsResponse, UdemyCoursesResponse } from '../types';

const API_KEY = process.env.UDEMY_API_KEY || '';

const PAGE_SIZE = 6;

export const getAllCourses = async (
  fieldsParameter: string,
  searchTerm: string
) => {
  const locale = 'en';
  const additionalParams = `instructional_level=beginner&language=${locale}&ratings=4.5`;

  const firstPageUrl = `https://www.udemy.com/api-2.0/courses/?search=${searchTerm}&additionalParams=${additionalParams}&${fieldsParameter}&page_size=${PAGE_SIZE}`;

  const firstPageData = await fetchPage(firstPageUrl);

  const parsedCourses = firstPageData.results.map((course) => ({
    id: course?.id,
    created: course?.created,
    url: course?.url,
    image: course?.image_480x270,
    num_subscribers: course?.num_subscribers,
    avg_rating: course?.avg_rating,
    num_reviews: course?.num_reviews,
    title: course?.title,
    price: course?.price,
    author: {
      name: course?.visible_instructors[0]?.title,
      job_title: course?.visible_instructors[0]?.job_title,
      image_100x100: course?.visible_instructors[0]?.image_100x100,
    },
    locale: course?.locale?.title,
    description: cleanText(course?.description),
    headline: course?.headline,
  }));

  const weights = {
    num_subscribers: 0.5,
    avg_rating: 0.4,
    num_reviews: 0.1,
  };

  const sortedCourses = parsedCourses.sort((a, b) => {
    const rankA =
      a.num_subscribers * weights.num_subscribers +
      a.avg_rating * weights.avg_rating +
      a.num_reviews * weights.num_reviews;
    const rankB =
      b.num_subscribers * weights.num_subscribers +
      b.avg_rating * weights.avg_rating +
      b.num_reviews * weights.num_reviews;

    return rankB - rankA; // to sort in descending order
  });

  return sortedCourses as UdemyCourseType[];
};

export const cleanText = (text: string) => {
  if (!text) {
    return '';
  }
  // Remove HTML tags and entities using a regular expression
  const strippedText = text.replace(/<[^>]*>|&[^;]+;/g, '');

  // Remove unwanted characters like '***' and '"'
  const cleanedText = strippedText.replace(/["*]+/g, '');

  return cleanedText;
};

export const fetchPage = async (url: string): Promise<UdemyCoursesResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(API_KEY)}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return await response.json();
};

export default async function getAllReviewsForCourse(
  courseId: string
): Promise<string[]> {
  try {
    const firstPageData = await fetchReviewsForCoursePage(
      generatePageUrl(courseId, 1)
    );
    const totalPages = Math.ceil(firstPageData.count / 100);

    const pagePromises = Array.from({ length: totalPages - 1 }, (_, i) =>
      fetchReviewsForCoursePage(generatePageUrl(courseId, i + 2))
    );
    const allPagesData = await Promise.all([
      Promise.resolve(firstPageData),
      ...pagePromises,
    ]);
    const allReviews = allPagesData.flatMap((pageData) =>
      pageData.results.reduce((acc: string[], review) => {
        if (review?.content) {
          acc.push(review.content);
        }
        return acc;
      }, [])
    );

    return allReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

const generatePageUrl = (courseId: string, page: number) =>
  `https://www.udemy.com/api-2.0/courses/${courseId}/reviews/?page=${page}&page_size=100&fields[course_review]=rating,content`;

// Utility function to fetch a page of reviews
const fetchReviewsForCoursePage = async (
  url: string
): Promise<UdemyCourseReviewsResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(API_KEY),
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};
