import { palmClient } from '@client/lib/palmLLM';

export const askPalmLLM = async (
  prompt: string,
  modelName: string = 'models/text-bison-001'
) => {
  const response = await palmClient.generateText({
    model: modelName,
    prompt: {
      text: prompt,
    },
  });
  return response[0].candidates?.[0]?.output;
};
