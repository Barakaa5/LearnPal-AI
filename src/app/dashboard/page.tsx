'use client';

import BooksCards from '@client/components/sourceCard/books-cards';
import MoviesCards from '@client/components/sourceCard/movies-cards';
import OnlineCoursesCards from '@client/components/sourceCard/online-courses-cards';
import { Avatar, Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
export default function Dashboard() {
  const { data: session } = useSession();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);

  const handleOnClick = async () => {
    setButtonClicked(true);
    try {
      const [coursesResponse, booksResponse, moviesResponse] =
        await Promise.all([
          axios.get(`http://localhost:3000/api/online-courses/udemy`, {
            params: {
              subject: subject,
            },
          }),
          axios.get(`http://localhost:3000/api/books/google-books`, {
            params: {
              subject: subject,
            },
          }),
          axios.get(`http://localhost:3000/api/movies/OMDB`, {
            params: {
              subject: subject,
            },
          }),
        ]);

      const onlineCourses = coursesResponse.data;
      const googleBooks = booksResponse.data;
      const omdbMovies = moviesResponse.data;

      setCourses(onlineCourses);
      setBooks(googleBooks);
      setMovies(omdbMovies);
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
    </Stack>
  );
}
