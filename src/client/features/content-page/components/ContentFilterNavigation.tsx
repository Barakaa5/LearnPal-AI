'use client';

import {
  BackgroundImage,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowBarToRight, IconMoodSad } from '@tabler/icons-react';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { YouTubeVideo } from '@type/youtube';
import router from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlanType, isInPlan } from '../ContentPage';
import FilterChips from './FilterChips';
import BookCard from './cards/BookCard';
import CourseCard from './cards/CourseCard';
import MovieCard from './cards/MovieCard';
import PodcastCard from './cards/PodcastCard';
import YoutubeCard from './cards/YoutubeCard';

export default function ContentFilterNavigation({
  subject,
  filters,
  plan,
  setPlan,
  setFilters,
}: {
  subject: string;
  filters: string[];
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
  setFilters: (filters: string[]) => void;
}) {
  const theme = useMantineTheme();
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isPlanEmpty, setIsPlanEmpty] = useState(true);

  useEffect(() => {
    if (
      plan.courses.length === 0 &&
      plan.books.length === 0 &&
      plan.movies.length === 0 &&
      plan.podcasts.length === 0 &&
      plan.youtube.length === 0
    ) {
      setIsPlanEmpty(true);
    } else {
      setIsPlanEmpty(false);
    }
  }, [plan]);

  return (
    <>
      <Box w={'100%'} h={'40%'}>
        <BackgroundImage
          h={'70px'}
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
      <Group justify="space-between" mb={30}>
        <FilterChips
          filters={['Courses', 'Books', 'Podcasts', 'Movies', 'YouTube']}
          selectedFilters={filters}
          onFilterChange={setFilters}
        />

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
            onClick={() => setIsPlanOpen(true)}
          >
            My Plan
          </Button>
        </Group>
      </Group>

      <Modal
        opened={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
        size="80%"
        style={{ minHeight: '700px' }}
        withCloseButton={false}
      >
        <Stack>
          <Title order={1}>My Study Plan</Title>
          {isPlanEmpty ? (
            <Flex justify={'center'} align={'center'} h={'700px'}>
              <Text>Your study plan is empty</Text>
              <IconMoodSad />
            </Flex>
          ) : (
            <Grid>
              {plan.courses.map((course: UdemyCourseType) => (
                <Grid.Col key={course.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <CourseCard
                    key={course.id}
                    course={course}
                    isInPlan={isInPlan(course, 'courses')}
                    setPlan={setPlan}
                    plan={plan}
                  />
                </Grid.Col>
              ))}
              {plan.books.map((book: GoogleBookType) => (
                <Grid.Col key={book.ISBN_13} span={{ base: 12, md: 6, lg: 3 }}>
                  <BookCard
                    isInPlan={isInPlan(book, 'books')}
                    setPlan={setPlan}
                    plan={plan}
                    book={book}
                    key={book.ISBN_13}
                  />
                </Grid.Col>
              ))}
              {plan.podcasts?.map((podcast) => (
                <Grid.Col
                  key={podcast.id}
                  style={{ minWidth: '200px' }}
                  span={{ base: 12, md: 6, lg: 3 }}
                >
                  <PodcastCard
                    isInPlan={isInPlan(podcast, 'podcasts')}
                    setPlan={setPlan}
                    plan={plan}
                    podcast={podcast}
                    key={podcast.id}
                  />
                </Grid.Col>
              ))}
              {plan.movies.map((movie: OmdbMovieType) => (
                <Grid.Col key={movie.imdbID} span={{ base: 12, md: 6, lg: 3 }}>
                  <MovieCard
                    isInPlan={isInPlan(movie, 'movies')}
                    setPlan={setPlan}
                    plan={plan}
                    movie={movie}
                    key={movie.imdbID}
                  />
                </Grid.Col>
              ))}
              {plan.youtube.map((video: YouTubeVideo) => (
                <Grid.Col key={video.url} span={{ base: 12, md: 6, lg: 3 }}>
                  <YoutubeCard
                    video={video}
                    isInPlan={isInPlan(video, 'youtube')}
                    setPlan={setPlan}
                    plan={plan}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}
          <Group justify="space-between">
            <Button
              onClick={() => setIsPlanOpen(false)}
              variant="default"
              size="md"
            >
              Exit
            </Button>
            <Group>
              <Button variant="default" size="md">
                Save
              </Button>
              <Button
                color={theme.colors.purple[0]}
                size="md"
                rightSection={<IconArrowBarToRight size={14} />}
              >
                Export
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
