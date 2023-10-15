import { palmClient } from '@client/lib/palmLLM';

export const askPalmLLM = async (
  prompt: string,
  modelName: string = 'models/text-bison-001'
) => {
  // Generate text using the TextServiceClient
  const response = await palmClient.generateText({
    model: modelName,
    prompt: {
      text: prompt,
    },
  });
  return response[0].candidates?.[0]?.output;
};
