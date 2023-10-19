import { askPalmLLM } from '@client/utils/palmLLM';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const palmResponse = await askPalmLLM(prompt);
  const parsedResponse = JSON.parse(palmResponse || '{}');
  return Response.json(parsedResponse);
}
