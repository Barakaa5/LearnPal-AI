'use client';
import { getAllSourcesResults, getAllSourcesSubjects } from '@client/utils';
import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowBarToRight, IconPlus } from '@tabler/icons-react';
import { GoogleBookType } from '@type/books/google-books';
import { PodcastType } from '@type/podcasts/listen-notes';
import { OmdbMovieType } from '@types/movies/omdb';
import { UdemyCourseType } from '@types/online-courses/udemy';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default function ContentPage({ subject }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([
    'courses',
    'books',
    'podcasts',
    'movies',
  ]);

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
    <Stack align="center" h={'100vh'} gap={0}>
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoadingOverlay
            visible={loading}
            overlayProps={{ radius: 'lg', blur: 2 }}
            color={theme.colors.purple[0]}
          />
        </Flex>
      ) : (
        <Flex mt={20} direction="column" gap={'md'} pl={'40px'} pr={'40px'}>
          <Navbar />
          <Box w={'100%'} h={'40%'}>
            <BackgroundImage
              h={'100%'}
              src={'/books-cover.jpg'}
              style={{ borderRadius: '20px' }}
            >
              <Stack h="100%" justify="center" align="start" pl={20}>
                <Text fw={700} size="30px" c={theme.colors.white[0]}>
                  Start Learning {subject}
                </Text>
              </Stack>
            </BackgroundImage>
          </Box>
          <Group justify="space-between">
            <Group w={'40%'} justify="space-between">
              <Chip.Group multiple value={filters} onChange={setFilters}>
                <Chip
                  color={theme.colors.lightPurple[0]}
                  variant="filled"
                  value="courses"
                  size="lg"
                >
                  Courses
                </Chip>
                <Divider size="sm" orientation="vertical" />
                <Chip
                  color={theme.colors.lightPurple[0]}
                  variant="filled"
                  value="books"
                  size="lg"
                >
                  Books
                </Chip>
                <Divider size="sm" orientation="vertical" />

                <Chip
                  color={theme.colors.lightPurple[0]}
                  variant="filled"
                  value="podcasts"
                  size="lg"
                >
                  Podcasts
                </Chip>
                <Divider size="sm" orientation="vertical" />

                <Chip
                  color={theme.colors.lightPurple[0]}
                  variant="filled"
                  value="movies"
                  size="lg"
                >
                  Movies
                </Chip>
              </Chip.Group>
            </Group>

            <Group>
              <Button
                variant="default"
                size="md"
                onClick={() => router.push('/generate')}
              >
                Go Back
              </Button>
              <Button
                color={theme.colors.purple[0]}
                size="md"
                rightSection={<IconArrowBarToRight size={14} />}
              >
                My Plan
              </Button>
            </Group>
          </Group>
          {filters.includes('courses') && (
            <Stack align="start">
              <Title order={2}>Courses</Title>
              <Group justify="space-between">
                {courses.map((course) => (
                  <Card key={course.id} w={'15%'} shadow="sm" padding="xl">
                    <Card.Section>
                      <Image
                        fit="contain"
                        src={course.image}
                        h={150}
                        alt={course.title}
                        fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
                      />
                    </Card.Section>

                    <Stack justify="space-between" gap={'xs'} mt="md">
                      <Text fw={500}>{course.title}</Text>
                      <Badge color={theme.colors.purple[0]} variant="light">
                        By {course.author.name}
                      </Badge>
                      <Text c="dimmed" size="sm">
                        Price: {course.price}
                      </Text>
                      <Text c="dimmed" size="sm">
                        Rating: {Math.round(course.avg_rating)} (
                        {course.num_reviews})
                      </Text>
                      <Text c="dimmed" size="sm">
                        Date: {course.created}
                      </Text>
                      <Group mt={'lg'} m={'auto'}>
                        <Button
                          color={theme.colors.purple[0]}
                          size="compact-sm"
                          leftSection={<IconPlus size={14} />}
                          radius="md"
                        >
                          Add
                        </Button>
                        <Button
                          color={theme.colors.purple[0]}
                          variant="outline"
                          size="compact-sm"
                          radius="md"
                          component="a"
                          href={`https://udemy.com/${course.url}`}
                          target="_blank"
                        >
                          Enroll
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </Group>
            </Stack>
          )}
          {filters.includes('books') && (
            <Stack>
              <Title order={2}>Books</Title>
              <Group justify="space-between">
                {books.map((book) => (
                  <Card key={book.ISBN_13} w={'15%'} shadow="sm" padding="xl">
                    <Card.Section>
                      <Image
                        fit="contain"
                        src={book?.imageLinks?.smallThumbnail}
                        h={150}
                        alt={book.title}
                        fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
                      />
                    </Card.Section>

                    <Stack justify="space-around" mt="md" gap="xs">
                      <Text fw={500}>{book.title}</Text>
                      <Badge color={theme.colors.purple[0]} variant="light">
                        By {book.authors}
                      </Badge>
                      <Text c="dimmed" size="sm">
                        Pages: {book.pageCount}
                      </Text>
                      <Text c="dimmed" size="sm">
                        Date: {book.publishedDate}
                      </Text>
                      <Group mt={'lg'} m={'auto'}>
                        <Button
                          color={theme.colors.purple[0]}
                          size="compact-sm"
                          leftSection={<IconPlus size={14} />}
                          radius="md"
                        >
                          Add
                        </Button>
                        <Button
                          color={theme.colors.purple[0]}
                          variant="outline"
                          size="compact-sm"
                          radius="md"
                          component="a"
                          href={book.infoLink}
                          target="_blank"
                        >
                          Read
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </Group>
            </Stack>
          )}
          {filters.includes('podcasts') && (
            <Stack>
              <Title order={2}>Podcasts</Title>
              <Group justify="space-between">
                {podcasts.map((pod) => (
                  <Card key={pod.id} w={'15%'} shadow="sm" padding="xl">
                    <Card.Section>
                      <Image
                        fit="contain"
                        src={pod.image}
                        h={110}
                        alt={pod.title_original}
                        fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
                      />
                    </Card.Section>

                    <Stack justify="space-between" gap={'xs'} mt="md">
                      <Text fw={500}>{pod.title_original}</Text>
                      <Badge color={theme.colors.purple[0]} variant="light">
                        {pod.total_episodes} episodes
                      </Badge>
                      <Text c="dimmed" size="sm">
                        {pod.listen_score}
                      </Text>
                      <Group mt={'lg'} m={'auto'}>
                        <Button
                          color={theme.colors.purple[0]}
                          size="compact-sm"
                          leftSection={<IconPlus size={14} />}
                          radius="md"
                        >
                          Add
                        </Button>
                        <Button
                          color={theme.colors.purple[0]}
                          variant="outline"
                          size="compact-sm"
                          radius="md"
                          component="a"
                          href={pod.website}
                          target="_blank"
                        >
                          Listen
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </Group>
            </Stack>
          )}
          {filters.includes('movies') && (
            <Stack>
              <Title order={2}>Movies</Title>
              <Group justify="space-between">
                {movies.map((movie) => (
                  <Card key={movie.imdbID} w={'15%'} shadow="sm" padding="xl">
                    <Card.Section>
                      <Image
                        src={movie.Poster}
                        fit="contain"
                        h={200}
                        alt={movie.Title}
                        fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
                      />
                    </Card.Section>

                    <Stack justify="space-between" gap={'xs'} mt="md">
                      <Text fw={500}>{movie.Title}</Text>
                      <Badge color={theme.colors.purple[0]} variant="light">
                        By {movie.Director}
                      </Badge>
                      <Text c="dimmed" size="sm">
                        Year: {movie.Year}
                      </Text>
                      <Text c="dimmed" size="sm">
                        Rating: {movie.Metascore}
                      </Text>
                      <Text c="dimmed" size="sm">
                        Genre: {movie.Genre}
                      </Text>
                      <Group mt="lg" m={'auto'}>
                        <Button
                          color={theme.colors.purple[0]}
                          size="compact-sm"
                          leftSection={<IconPlus size={14} />}
                          radius="md"
                        >
                          Add
                        </Button>
                        <Button
                          color={theme.colors.purple[0]}
                          variant="outline"
                          size="compact-sm"
                          radius="md"
                          component="a"
                          target="_blank"
                        >
                          Watch
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                ))}
              </Group>
            </Stack>
          )}
        </Flex>
      )}
    </Stack>
  );
}
