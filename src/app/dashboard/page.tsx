'use client';

import BooksCards from '@client/components/sourceCard/books-cards';
import MoviesCards from '@client/components/sourceCard/movies-cards';
import OnlineCoursesCards from '@client/components/sourceCard/online-courses-cards';
import PodcastsCards from '@client/components/sourceCard/podcasts-cards';
import { getAllSourcesResults, getAllSourcesSubjects } from '@client/utils';
import { Avatar, Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { PodcastType } from '@type/podcasts/listen-notes';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
export default function Dashboard() {
  const { data: session } = useSession();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);

  const handleOnClick = async () => {
    setButtonClicked(true);
    try {
      const { moviesSubject, booksSubject, onlineCoursesSubject } =
        await getAllSourcesSubjects(subject);

      const { onlineCourses, googleBooks, omdbMovies, podcasts } =
        await getAllSourcesResults({
          moviesSubject,
          booksSubject,
          onlineCoursesSubject,
        });

      setCourses(onlineCourses);
      setBooks(googleBooks);
      setMovies(omdbMovies);
      setPodcasts(podcasts);
    } catch (error) {
      console.error(error);
    }
    setButtonClicked(false);
  };

  return (
    <Stack h={'100vh'}>
      <Stack m={10} align="left" justify="left">
        <Text>Dashboard</Text>
        <Group>
          <Avatar src={session?.user?.image} />
          <Text>{session?.user?.name}</Text>
        </Group>
        <Button
          onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          mr="auto"
          mt={10}
        >
          signOut
        </Button>
      </Stack>
      <Group m={10} align="center" justify="center">
        <TextInput
          placeholder="Enter your Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button onClick={handleOnClick} loading={buttonClicked}>
          search{' '}
        </Button>
      </Group>
      <OnlineCoursesCards courses={courses} />
      <BooksCards books={books} />
      <MoviesCards movies={movies} />
      <PodcastsCards podcasts={podcasts} />
    </Stack>
  );
}
