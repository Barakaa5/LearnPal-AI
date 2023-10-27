export type UdemyCourseLocale = {
  _class: string; // Classification type, in this case, indicating a "locale" object
  locale: string; // Locale code representing the language and possibly the region, e.g., "en_US" for English (United States)
  title: string; // Full name of the locale, e.g., "English (US)" representing the language and possibly the region
  english_title: string; // English name of the locale, e.g., "English (US)" representing the language and possibly the region
  simple_english_title: string; // Simplified English name of the locale, e.g., "English" representing the language
};

export type UdemyCourseInstructor = {
  _class: string; // Classification type, in this case, indicating a "user" object representing an instructor
  title: string; // Title of the instructor, typically the full name
  name: string; // First name of the instructor
  display_name: string; // Display name of the instructor, typically the full name
  job_title: string; // Job title of the instructor, indicating their profession or expertise
  image_50x50: string; // URL to a 50x50 pixel image of the instructor
  image_100x100: string; // URL to a 100x100 pixel image of the instructor
  initials: string; // Initials of the instructor, typically the first letter of their first and last name
  url: string; // URL path for the instructor's profile on the Udemy platform
};
export type UdemyCourseTypeResponse = {
  _class: string; // Classification type, in this case, indicating a "course" object
  id: number; // Unique identifier for the course
  title: string; // Title of the course
  url: string; // URL path for the course on the Udemy platform
  price: string; // Price of the course in a string format
  visible_instructors: UdemyCourseInstructor[]; // Array of the course's visible instructors
  image_480x270: string; // URL to a 480x270 pixel image representing the course
  locale: UdemyCourseLocale; // Locale of the course
  description: string; // HTML string containing the description of the course
  headline: string; // Headline or tagline of the course
  num_subscribers: number; // Number of subscribers enrolled in the course
  avg_rating: number; // Average rating of the course
  num_reviews: number; // Number of reviews for the course
  created: string; // ISO 8601 timestamp indicating when the course was created
  predictive_score: null | number; // Predictive score for the course, if available
  relevancy_score: null | number; // Relevancy score for the course, if available
  input_features: null; // Input features for the course, if available
  lecture_search_result: null; // Lecture search result for the course, if available
  curriculum_lectures: unknown[]; // Array containing curriculum lecture data, if available
  order_in_results: null | number; // Order in which the course appears in search results, if available
  curriculum_items: unknown[]; // Array containing curriculum item data, if available
  instructor_name: null | string; // Name of the instructor, if available
  tracking_id: string; // Tracking ID for the course, if available
};

// Defining a type for the option within an aggregation
export type AggregationOption = {
  title: string; // Title of the option, like "Paid", "Free", "All Levels", etc.
  count: number; // Count of courses matching this option
  key: string; // Key representing the type of aggregation, like "price", "instructional_level", etc.
  value: string; // Value of this option, used for filtering courses based on this option
};

// Defining a type for each aggregation
export type Aggregation = {
  title: string; // Title of the aggregation, like "Price", "Level", "Features", etc.
  key: string; // Key representing the type of aggregation, used for filtering courses based on this aggregation
  options: AggregationOption[]; // Array of options within this aggregation
};

// Main type for the Udemy Response
export type UdemyCoursesResponse = {
  count: number; // Total count of courses matching the search/filter criteria
  next: string | null; // URL to fetch the next page of courses, or null if this is the last page
  previous: string | null; // URL to fetch the previous page of courses, or null if this is the first page
  results: UdemyCourseTypeResponse[]; // Array of courses matching the search/filter criteria
  aggregations: Aggregation[]; // Array of aggregations to further filter the search results
};

/////////////////////////////////////////////////////////////

export type UdemyCourseReviewType = {
  _class: string;
  id: number;
  content: string;
  rating: number;
};

export type UdemyCourseReviewsResponse = {
  count: number;
  next: string | null; // URL for the next page of reviews (or null if no next page)
  previous: string | null; // URL for the previous page of reviews (or null if no previous page)
  results: UdemyCourseReviewType[]; // An array of course review objects
};
