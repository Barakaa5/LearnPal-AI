import { askPalmLLM } from '@client/utils/palmLLM';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  let parsedResponse;
  while (typeof parsedResponse !== 'object') {
    // while the response is not an object, keep asking for a response
    const palmResponse = await askPalmLLM(prompt);
    if (palmResponse?.startsWith('{')) {
      parsedResponse = JSON.parse(palmResponse);
    }
  }

  return Response.json(parsedResponse);
}
