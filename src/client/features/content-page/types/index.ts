import { PodcastResponse } from '@server/podcasts/listen-notes/type';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { YouTubeVideo } from '@type/youtube';

export type PlanType = {
  courses: UdemyCourseType[];
  books: GoogleBookType[];
  movies: OmdbMovieType[];
  podcasts: PodcastResponse[];
  youtube: YouTubeVideo[];
};
export type ContentItem =
  | UdemyCourseType
  | GoogleBookType
  | OmdbMovieType
  | PodcastResponse
  | YouTubeVideo;

export type ContentType =
  | 'courses'
  | 'books'
  | 'podcasts'
  | 'movies'
  | 'youtube';
