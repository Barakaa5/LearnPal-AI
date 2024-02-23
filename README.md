# LearnPal AI

## Introduction

LearnPal AI is an innovative platform designed to transform the way individuals learn new subjects. By integrating Google's state-of-the-art language model, PaLM 2, LearnPal AI offers an unparalleled personalized learning experience. PaLM 2 brings advanced capabilities in multilingual understanding, reasoning, and coding, enabling the platform to curate and provide learning materials with greater accuracy and diversity. From YouTube videos, movies, and series to books, online courses, and podcasts, LearnPal AI creates a comprehensive learning environment tailored to each user's interests and needs. Our mission is to immerse learners in their chosen subjects, facilitating faster and more effective learning through technology.

## Features

### Current Features

- **Authentication**: Secure login and signup functionality to personalize your learning journey.
- **Material Curation**: Upon choosing a subject, users receive a comprehensive list of learning materials across different formats to study.
- **Personal Program**: An option to bookmark and organize materials you find beneficial, creating a tailored learning program.
- **Recommendations for New Subjects**: Offers generic recommendations to inspire users about various subjects to learn. This feature aims to spark curiosity and help users discover new areas of interest.

### Upcoming Features
- **Recommendations**: Intelligent suggestions for new subjects to explore based on your interests and learning history.
- **Social Sharing**: Share your personalized learning plan with friends, fostering a community of learners.
- **Syllabus Creation**: Generate a detailed syllabus for day-to-day learning, either from an existing plan or automatically by the platform, ensuring a structured learning path.
- **Continuous Innovation**: We are always looking to expand LearnPal AI's capabilities with more engaging and useful features.

## Technology Stack

LearnPal AI is built with a modern technology stack ensuring a robust and scalable platform:

- **Frontend**: Next.js, React, Mantine v7
- **Backend**: Firebase for backend services including database and authentication
- **Authentication**: NextAuth for secure and scalable user authentication
- **Typescript**: Ensuring type safety and enhancing development experience
- **Language Model Integration**: PaLM 2 by Google is integrated to enhance content curation and personalization. PaLM 2's advanced understanding and reasoning capabilities in over 100 languages enable LearnPal AI to provide tailored and diverse learning materials, making the learning experience more comprehensive and accessible.


## Getting Started

To get the LearnPal AI development environment up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have Node.js installed on your machine. This will include npm, which is necessary to run the commands.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/learnpal-ai.git
cd learnpal-ai
```

2. Install the necessary packages:

```bash
npm install
# or if you use Yarn
yarn
# or using PNPM
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or with Yarn
yarn dev
# or with PNPM
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Editing

To modify the application, start by editing `pages/index.tsx` or any other page under the `pages` directory. The application supports hot reloading, meaning it will automatically update as you edit and save files.

## Learn More

For more information on the technologies used in LearnPal AI, refer to the following documentation:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - Dive into React to understand the UI library powering LearnPal AI.
- [Firebase](https://firebase.google.com/docs) - Explore Firebase for backend services.
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction) - Understand authentication mechanisms with NextAuth.js.
- [Mantine](https://mantine.dev/docs/getting-started/) - Familiarize yourself with Mantine components.

