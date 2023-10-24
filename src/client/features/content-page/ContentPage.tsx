'use client';
import { getAllSourcesResults, getAllSourcesSubjects } from '@client/utils';
import { Box, Group, Stack, useMantineTheme } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { PodcastType } from '@type/podcasts/listen-notes';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default function ContentPage({ subject }) {
  const theme = useMantineTheme();
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    try {
      const {
        moviesSubject,
        booksSubject,
        onlineCoursesSubject,
        podcastsSubject,
      } = await getAllSourcesSubjects(subject);

      const { onlineCourses, googleBooks, omdbMovies, podcasts } =
        await getAllSourcesResults({
          moviesSubject,
          booksSubject,
          onlineCoursesSubject,
          podcastsSubject,
        });

      setCourses(onlineCourses);
      setBooks(googleBooks);
      setMovies(omdbMovies);
      setPodcasts(podcasts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (
      courses.length > 0 &&
      books.length > 0 &&
      movies.length > 0 &&
      podcasts.length > 0
    ) {
      setLoading(false);
    }
  }, [courses, books, movies, podcasts]);

  return (
    <Stack align="center" h={'100vh'} gap={'0'}>
      <Navbar />
      {subject}
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <>
          <Group>
            Courses:
            {courses.map((course) => (
              <span key={course.id}>{course?.title}</span>
            ))}
          </Group>
          <Group>
            Books:
            {books.map((book) => (
              <span key={book.ISBN_13}>{book?.title}</span>
            ))}
          </Group>
          <Group>
            Podcasts:
            {podcasts.map((pod) => (
              <span key={pod.id}>{pod?.title_original}</span>
            ))}
          </Group>
          <Group>
            Movies:
            {movies.map((movie) => (
              <span key={movie.imdbID}>{movie?.Title}</span>
            ))}
          </Group>
        </>
      )}
    </Stack>
  );
}
