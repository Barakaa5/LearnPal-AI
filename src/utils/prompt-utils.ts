// export const promptForInitialUserInput = (userInput: string) => {
//   const prompt = `User's input: ${userInput}

// Your task is to analyze the user's input and suggest the most relevant subjects for finding content from external APIs related to movies, books, and online courses. The goal is to enhance the user's experience by guiding them towards enriching and useful resources, even if their initial query needs some refinement.

// Consider the context and intent behind the user's request, and also take into account the user's level of knowledge and understanding. For example, if the user's input appears to be from a beginner, focus on suggesting subjects suitable for newcomers in the context of books.

// Your recommendations should be formatted as follows:

// {
//   "moviesSubject": "<suggested_subject>",
//   "booksSubject": "<suggested_subject>",
//   "onlineCoursesSubject": "<suggested_subject>"
// }

// For books, prioritize subjects that are accessible to beginners, while for movies and online courses, aim to closely align with the user's expressed interest. Additionally, explore related fields that can provide a more comprehensive understanding of the topic.

// Please provide thoughtful and relevant suggestions to ensure the user's query leads to valuable content.`;
//   return prompt;
// };

export const promptForInitialUserInput = (userInput: string) => {
  const prompt = `Based on the user's input: "${userInput}", you are tasked with analyzing and understanding the general subject the user wants to study, as well as gauging their level of expertise or understanding in the topic.

The application, Syllabus AI, works with various APIs to suggest movies, books, and online courses relevant to the user's interest. These APIs include UDEMY for online courses, Google for books, and an additional LLM for movie recommendations.

For each API, the topic to be queried may slightly differ based on the nature and utility of the content being sought:
- For books (via Google API), the focus might be on topics that are enriching and educational. Consider whether the user is a beginner or advanced in the subject, and tailor the suggestion to be accessible based on their level.
- For online courses (via UDEMY API), the recommendation should lean towards practical application and usability, potentially favoring beginner-friendly or introductory courses unless the user seems advanced.
- For movies (via an additional LLM), the suggestions can be broader, intersecting with related fields or themes that might not be strictly educational but are relevant and intriguing based on the user's input.


Ensure that each suggested subject is thoughtfully considered to guide the user toward valuable and suitable content across movies, books, and online courses, enhancing their learning journey.

Your recommendations should be formatted as follows (in JSON format - only the object itself is required - don't add any other signs or words in the beginning or the end of the prompt):

{
   "moviesSubject": "<suggested_subject>",
   "booksSubject": "<suggested_subject>",
   "onlineCoursesSubject": "<suggested_subject>"
}

Example 1: User Input - "I want to learn basic concepts of Physics": 
{
  "moviesSubject": "Science and Physics",
  "booksSubject": "Physics for Beginners",
  "onlineCoursesSubject": "Introduction to Physics"
}

Example 2: User Input - "I'm interested in exploring the art of storytelling in cinema.": 
{
  "moviesSubject": "Storytelling in Cinema",
  "booksSubject": "Film Storytelling and Screenwriting",
  "onlineCoursesSubject": "Cinematic Storytelling Techniques"
}

Example 3: User Input - "Looking to advance my skills in web development, focusing on React.":
{
  "moviesSubject": "Web Development Documentaries",
  "booksSubject": "Advanced React",
  "onlineCoursesSubject": "React for Experienced Developers"
}`;

  return prompt;
};
