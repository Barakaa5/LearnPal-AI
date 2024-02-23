import { OmdbMovieType } from '@type/movies/omdb';
import axios from 'axios';

const api_key = process.env.OMDB_API_KEY || '';

const searchMoviesWithOMDB = async (
  title: string
): Promise<OmdbMovieType | null> => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${api_key}&t=${title}`,
      {
        params: {
          api_key: api_key,
          query: title,
        },
      }
    );
    return response.data as OmdbMovieType;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchAllMoviesFromOMDB = async (
  movieTitles: string[]
): Promise<OmdbMovieType[]> => {
  const allMovieResults: OmdbMovieType[] = [];

  for (const title of movieTitles) {
    const movie = await searchMoviesWithOMDB(title);
    if (movie) {
      allMovieResults.push(movie);
    }
  }

  return allMovieResults;
};
