import { askPalmLLM } from '@client/utils/palmLLM';
import { OmdbMovieType } from '@type/movies/omdb';
import axios from 'axios';

const api_key = '22ffee94';
async function searchMoviesWithOMDB(
  title: string
): Promise<OmdbMovieType | null> {
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
}

function parsePalmResponse(palmAnswer: string): string[] {
  const cleanedResponse = JSON.stringify(palmAnswer || '').replace(
    /```json|```/g,
    ''
  );
  return JSON.parse(JSON.parse(cleanedResponse));
}
async function fetchAllMoviesFromOMDB(
  movieTitles: string[]
): Promise<OmdbMovieType[]> {
  const allMovieResults: OmdbMovieType[] = [];

  for (const title of movieTitles) {
    const movie = await searchMoviesWithOMDB(title);
    if (movie) {
      allMovieResults.push(movie);
    }
  }

  return allMovieResults;
}

export async function GET(request: Request) {
  const url = new URL(request.url); // Assuming your server is running on http://localhost:3000
  const subject = url.searchParams.get('subject');

  const moviesPrompt = `Give me the 5 best movies on the subject of '${subject}', 3 feature films, and 2 documentary films or shows, from 2000 and above. Return a JSON with this format: ['movie title 1','movie title 2',...]`;
  const palmAnswer = await askPalmLLM(moviesPrompt);

  if (!palmAnswer) {
    return Response.json([]);
  }

  const movieTitles = parsePalmResponse(palmAnswer);

  const allMovieResults = await fetchAllMoviesFromOMDB(movieTitles);
  return Response.json(allMovieResults);
}
