import { fetchAllMoviesFromOMDB } from '@server/movies/OMDB';
import { askPalmLLM } from '@server/palmLLM';
import { getMoviesPrompt } from '@utils/prompts/prompt-utils';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');

  const moviesPrompt = getMoviesPrompt(subject || '');

  let parsedResponse;

  while (typeof parsedResponse !== 'object') {
    // while the response is not an object, keep asking for a response
    const palmAnswer = await askPalmLLM(moviesPrompt);
    if (palmAnswer?.startsWith('[')) {
      parsedResponse = JSON.parse(palmAnswer);
    }
  }

  const allMovieResults = await fetchAllMoviesFromOMDB(parsedResponse);
  return Response.json(allMovieResults);
}
