export type UdemyCourseType = {
  id: number;
  created: string;
  url: string;
  image: string;
  num_subscribers: number;
  avg_rating: number;
  num_reviews: number;
  title: string;
  price: string;
  author: {
    name: string;
    job_title: string;
    image_100x100: string;
  };
  locale: string;
  description: string;
  headline: string;
  reviews?: string[];
};
