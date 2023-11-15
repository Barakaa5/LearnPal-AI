import { promptForInitialUserInput } from '@utils/prompts/prompt-utils';
import axios from 'axios';

export const getAllSourcesSubjects = async (userInput: string) => {
  const initialPrompt = promptForInitialUserInput(userInput);

  const palmResponse = await axios.post(`http://localhost:3000/api/plamLLM`, {
    prompt: initialPrompt,
  });

  return palmResponse.data;
};

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
  const [
    coursesResponse,
    booksResponse,
    moviesResponse,
    youtubeResponse,
    podcastsResponse,
  ] = await Promise.all([
    axios.get(`http://localhost:3000/api/online-courses/udemy`, {
      params: {
        subject: onlineCoursesSubject,
      },
    }),
    axios.get(`http://localhost:3000/api/books/google-books`, {
      params: {
        subject: booksSubject,
      },
    }),
    axios.get(`http://localhost:3000/api/movies/OMDB`, {
      params: {
        subject: moviesSubject,
      },
    }),
    axios.get(`http://localhost:3000/api/youtube`, {
      params: {
        subject: youtubeSubject,
      },
    }),
    axios.get(`http://localhost:3000/api/podcasts/listen-notes`, {
      params: {
        subject: podcastsSubject,
      },
    }),
  ]);

  const onlineCourses = coursesResponse.data;
  const googleBooks = booksResponse.data;
  const omdbMovies = moviesResponse.data;
  const podcasts = podcastsResponse.data.podcasts;
  const youtubeVideos = youtubeResponse.data;

  return {
    onlineCourses,
    googleBooks,
    omdbMovies,
    podcasts,
    youtubeVideos,
  };
};
