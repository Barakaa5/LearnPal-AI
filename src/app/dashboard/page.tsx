'use client';

import BooksCards from '@client/components/sourceCard/books-cards';
import OnlineCoursesCards from '@client/components/sourceCard/online-courses-cards';
import { Avatar, Button, Group, Stack, Text, TextInput } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
export default function Dashboard() {
  const { data: session } = useSession();
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);

  const handleOnClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/online-courses/udemy`,
        {
          params: {
            subject,
          },
        }
      );
      const data = response.data;
      setCourses(data);
      const response2 = await axios.get(
        `http://localhost:3000/api/books/google-books`,
        {
          params: {
            subject,
          },
        }
      );
      const data2 = response2.data;
      setBooks(data2);
    } catch (error) {
      console.error(error);
    }
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
        <Button onClick={handleOnClick}>search </Button>
      </Group>
      <OnlineCoursesCards courses={courses} />
      <BooksCards books={books} />
    </Stack>
  );
}
