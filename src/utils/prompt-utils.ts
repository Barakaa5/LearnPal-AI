export const promptForInitialUserInput = (userInput: string) => {
  const prompt = `User's input: ${userInput}

Your task is to analyze the user's input and suggest the most relevant subjects for finding content from external APIs related to movies, books, and online courses. The goal is to enhance the user's experience by guiding them towards enriching and useful resources, even if their initial query needs some refinement.

Consider the context and intent behind the user's request, and also take into account the user's level of knowledge and understanding. For example, if the user's input appears to be from a beginner, focus on suggesting subjects suitable for newcomers in the context of books.

Your recommendations should be formatted as follows:

{
  "moviesSubject": "<suggested_subject>",
  "booksSubject": "<suggested_subject>",
  "onlineCoursesSubject": "<suggested_subject>"
}

For books, prioritize subjects that are accessible to beginners, while for movies and online courses, aim to closely align with the user's expressed interest. Additionally, explore related fields that can provide a more comprehensive understanding of the topic.

Please provide thoughtful and relevant suggestions to ensure the user's query leads to valuable content.`;
  return prompt;
};
