export const promptForInitialUserInput = (userInput: string) => {
  const prompt = `Based on the user's input: "${userInput}", you are tasked with analyzing and understanding the general subject the user wants to study, as well as gauging their level of expertise or understanding in the topic.

The application, Syllabus AI, works with various APIs to suggest movies, books, online courses, and podcasts relevant to the user's interest. These APIs include UDEMY for online courses, Google for books, an additional LLM for movie recommendations, and a podcasts API for podcast recommendations.

For each API, the topic to be queried may slightly differ based on the nature and utility of the content being sought:
- For books (via Google API), the focus might be on topics that are enriching and educational. Consider whether the user is a beginner or advanced in the subject, and tailor the suggestion to be accessible based on their level.
- For online courses (via UDEMY API), the recommendation should lean towards practical application and usability, potentially favoring beginner-friendly or introductory courses unless the user seems advanced.
- For movies (via an additional LLM), the suggestions can be broader, intersecting with related fields or themes that might not be strictly educational but are relevant and intriguing based on the user's input.
- For podcasts (via a podcasts API), the recommendations could span a range of introductory to advanced topics depending on the user's expertise, with a focus on engaging and insightful content.

Ensure that each suggested subject is thoughtfully considered to guide the user toward valuable and suitable content across movies, books, online courses, and podcasts, enhancing their learning journey.

Your recommendations should be formatted as follows (in JSON format - only the object itself is required - don't add any other signs or words in the beginning or the end of the prompt):

{
   "moviesSubject": "<suggested_subject>",
   "booksSubject": "<suggested_subject>",
   "onlineCoursesSubject": "<suggested_subject>",
   "podcastsSubject": "<suggested_subject>"
}

Example 1: User Input - "I want to learn basic concepts of Physics": 
{
  "moviesSubject": "Science and Physics",
  "booksSubject": "Physics for Beginners",
  "onlineCoursesSubject": "Introduction to Physics",
  "podcastsSubject": "Physics Explained"
}

Example 2: User Input - "I'm interested in exploring the art of storytelling in cinema.": 
{
  "moviesSubject": "Storytelling in Cinema",
  "booksSubject": "Film Storytelling and Screenwriting",
  "onlineCoursesSubject": "Cinematic Storytelling Techniques",
  "podcastsSubject": "Cinema Storytelling Insights"
}

Example 3: User Input - "Looking to advance my skills in web development, focusing on React.":
{
  "moviesSubject": "Web Development Documentaries",
  "booksSubject": "Advanced React",
  "onlineCoursesSubject": "React for Experienced Developers",
  "podcastsSubject": "React Development Insights"
}`;

  return prompt;
};

export const getMoviesPrompt = (subject: string) => {
  const prompt = `Based on the subject '${subject}', curate a list of movies and shows that deeply resonate with this topic, ensuring they are insightful and enrich the viewer's understanding and appreciation of the subject. Consider movies and shows from the year 2000 onwards.

Your response should exclusively be a JSON array, containing:
- First three entries: Titles of feature films that are creatively engaging and illustrative of the subject.
- Last two entries: Titles of documentaries or educational shows that offer factual, in-depth exploration of the subject.

Here are some examples to guide your curation:

- If the subject is "Artificial Intelligence":
  ["A.I. Artificial Intelligence", "Ex Machina", "Her", "The Social Dilemma", "AlphaGo"]

- If the subject is "Environmental Conservation":
  ["Avatar", "The Day After Tomorrow", "Wall-E", "An Inconvenient Truth", "Planet Earth II"]

- If the subject is "Historical Wars":
  ["Gladiator", "Saving Private Ryan", "300", "The World at War", "Band of Brothers"]

Remember, your output should strictly be the JSON array with movie and show titles relevant to the subject, without additional text or explanation.`;

  return prompt;
};
