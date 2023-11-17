import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { PodcastType } from '@type/podcasts/listen-notes';
import { YouTubeVideo } from '@type/youtube';
import { promptForInitialUserInput } from '@utils/prompts/prompt-utils';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const getAllSourcesSubjects = async (userInput: string) => {
  const initialPrompt = promptForInitialUserInput(userInput);

  const palmResponse = await axios.post(`${BASE_URL}/plamLLM`, {
    prompt: initialPrompt,
  });

  return palmResponse.data;
};

const axiosGetRequest = (path: string, subjectValue: string) =>
  axios.get(`${BASE_URL}/${path}`, { params: { subject: subjectValue } });

const processResponse = (
  response: PromiseSettledResult<AxiosResponse<unknown, unknown>>
) => (response.status === 'fulfilled' ? response.value.data : []);

export const getAllSourcesResults = async ({
  moviesSubject,
  booksSubject,
  onlineCoursesSubject,
  podcastsSubject,
  youtubeSubject,
}: {
  moviesSubject: string;
  booksSubject: string;
  onlineCoursesSubject: string;
  podcastsSubject: string;
  youtubeSubject: string;
}) => {
  const responses = await Promise.allSettled([
    axiosGetRequest('online-courses/udemy', onlineCoursesSubject),
    axiosGetRequest('books/google-books', booksSubject),
    axiosGetRequest('movies/OMDB', moviesSubject),
    axiosGetRequest('youtube', youtubeSubject),
    axiosGetRequest('podcasts/listen-notes', podcastsSubject),
  ]);

  return {
    onlineCourses: processResponse(responses[0]) as UdemyCourseType[],
    googleBooks: processResponse(responses[1]) as GoogleBookType[],
    omdbMovies: processResponse(responses[2]) as OmdbMovieType[],
    youtubeVideos: processResponse(responses[3]) as YouTubeVideo[],
    podcasts: processResponse(responses[4]) as PodcastType,
  };
};
