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
}: {
  moviesSubject: string;
  booksSubject: string;
  onlineCoursesSubject: string;
  podcastsSubject: string;
}) => {
  const [coursesResponse, booksResponse, moviesResponse, youtubeResponse] =
    await Promise.all([
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
          subject: 'barcelona',
        },
      }),
      // axios.get(`http://localhost:3000/api/podcasts/listen-notes`, {
      //   params: {
      //     subject: podcastsSubject,
      //   },
      // }),
    ]);

  const onlineCourses = coursesResponse.data;
  const googleBooks = booksResponse.data;
  const omdbMovies = moviesResponse.data;
  const youtubeVideos = youtubeResponse.data;

  // const podcasts = podcastsResponse.data;
  return {
    onlineCourses,
    googleBooks,
    omdbMovies,
    podcasts: [],
    youtubeVideos,
  };
};
