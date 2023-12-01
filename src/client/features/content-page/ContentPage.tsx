'use client';

import { getAllSourcesResults, getAllSourcesSubjects } from '@client/utils';
import {
  Flex,
  Grid,
  Loader,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PodcastResponse } from '@server/podcasts/listen-notes/type';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { YouTubeVideo } from '@type/youtube';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ContentFilterNavigation from './components/ContentFilterNavigation';
import BookCard from './components/cards/BookCard';
import CourseCard from './components/cards/CourseCard';
import MovieCard from './components/cards/MovieCard';
import PodcastCard from './components/cards/PodcastCard';
import YoutubeCard from './components/cards/YoutubeCard';
import { PlanType } from './types';
import { isInPlan } from './utils';

export default function ContentPage({ subject }: { subject: string }) {
  const theme = useMantineTheme();
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastResponse[]>([]);
  const [youTubeVideos, setYouTubeVideos] = useState<YouTubeVideo[]>([]);

  const contentTypes = ['courses', 'books', 'podcasts', 'movies', 'youtube'];

  const [filters, setFilters] = useState(contentTypes);
  const [plan, setPlan] = useState<PlanType>({
    books: [],
    courses: [],
    podcasts: [],
    movies: [],
    youtube: [],
  });

  const isSomeDataExists =
    courses.length > 0 ||
    books.length > 0 ||
    movies.length > 0 ||
    podcasts.length > 0;

  const handleSearch = async () => {
    try {
      const {
        moviesSubject,
        booksSubject,
        onlineCoursesSubject,
        podcastsSubject,
      } = await getAllSourcesSubjects(subject);

      const {
        onlineCourses,
        googleBooks,
        omdbMovies,
        podcasts,
        youtubeVideos,
      } = await getAllSourcesResults({
        moviesSubject,
        booksSubject,
        onlineCoursesSubject,
        podcastsSubject,
        youtubeSubject: subject,
      });

      setCourses(onlineCourses);
      setBooks(googleBooks);
      setMovies(omdbMovies);
      setPodcasts(podcasts.podcasts);
      setYouTubeVideos(youtubeVideos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  if (!isSomeDataExists) {
    return (
      <Stack align="center" h={'100vh'} gap={0}>
        <Flex justify="center" align="center" h="100%">
          <Loader color={theme.colors.purple[0]} />
        </Flex>
      </Stack>
    );
  } else {
    return (
      <Stack align="center" h={'100vh'} gap={0}>
        <Stack mt={20} gap={'md'} pl={'40px'} pr={'40px'}>
          <Navbar />
          <ContentFilterNavigation
            filters={filters}
            subject={subject}
            plan={plan}
            setPlan={setPlan}
            setFilters={setFilters}
          />

          {filters.includes('courses') && (
            <Stack align="start">
              <Title order={2}>Courses</Title>
              <Grid align="stretch">
                {courses.map((course) => (
                  <Grid.Col
                    h={530}
                    key={course.id}
                    span={{ base: 12, md: 4, lg: 2 }}
                  >
                    <CourseCard
                      key={course.id}
                      course={course}
                      plan={plan}
                      isInPlan={isInPlan(course, 'courses', plan)}
                      setPlan={setPlan}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          )}
          {filters.includes('books') && (
            <Stack>
              <Title order={2}>Books</Title>
              <Grid>
                {books.map((book) => (
                  <Grid.Col
                    h={450}
                    key={book.title}
                    span={{ base: 12, md: 4, lg: 2 }}
                  >
                    <BookCard
                      isInPlan={isInPlan(book, 'books', plan)}
                      setPlan={setPlan}
                      plan={plan}
                      book={book}
                      key={book.ISBN_13}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          )}
          {filters.includes('podcasts') && (
            <Stack>
              <Title order={2}>Podcasts</Title>
              <Grid>
                {podcasts?.map((podcast) => (
                  <Grid.Col
                    h={450}
                    key={podcast.id}
                    span={{ base: 12, md: 4, lg: 2 }}
                  >
                    <PodcastCard
                      isInPlan={isInPlan(podcast, 'podcasts', plan)}
                      setPlan={setPlan}
                      plan={plan}
                      podcast={podcast}
                      key={podcast.id}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          )}
          {filters.includes('movies') && (
            <Stack>
              <Title order={2}>Movies</Title>
              <Grid>
                {movies.map((movie) => (
                  <Grid.Col
                    h={550}
                    key={movie.imdbID}
                    span={{ base: 12, md: 4, lg: 2 }}
                  >
                    <MovieCard
                      isInPlan={isInPlan(movie, 'movies', plan)}
                      setPlan={setPlan}
                      plan={plan}
                      movie={movie}
                      key={movie.imdbID}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          )}
          {filters.includes('youtube') && (
            <Stack>
              <Title order={2}>Youtube Videos</Title>
              <Grid>
                {youTubeVideos?.map((video) => (
                  <Grid.Col
                    h={550}
                    key={video.title}
                    span={{ base: 12, md: 4, lg: 2 }}
                  >
                    <YoutubeCard
                      video={video}
                      isInPlan={isInPlan(video, 'youtube', plan)}
                      setPlan={setPlan}
                      plan={plan}
                      key={video.title}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  }
}
