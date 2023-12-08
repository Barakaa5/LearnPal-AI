'use client';

import { addNewPlan } from '@client/utils/firestore';
import {
  Button,
  CopyButton,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowBarToRight, IconMoodSad } from '@tabler/icons-react';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { YouTubeVideo } from '@type/youtube';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlanType } from '../types';
import { isInPlan } from '../utils';
import BookCard from './cards/BookCard';
import CourseCard from './cards/CourseCard';
import MovieCard from './cards/MovieCard';
import PodcastCard from './cards/PodcastCard';
import YoutubeCard from './cards/YoutubeCard';

export default function PlanModal({
  plan,
  setPlan,
  isPlanEmpty,
  isPlanOpen,
  setIsPlanEmpty,
  setIsPlanOpen,
  subject,
}: {
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
  isPlanEmpty: boolean;
  isPlanOpen: boolean;
  setIsPlanEmpty: Dispatch<SetStateAction<boolean>>;
  setIsPlanOpen: Dispatch<SetStateAction<boolean>>;
  subject: string;
}) {
  const theme = useMantineTheme();
  const session = useSession();
  const [savePlanLodaing, setSavePlanLoading] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportPlanId, setExportPlanId] = useState(null);

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

  const savePlan = async () => {
    if (session?.data?.user.email) {
      setSavePlanLoading(true);
      const newId = await addNewPlan(session.data.user.email, {
        ...plan,
        subject,
        date: new Date(),
        createdBy: session?.data?.user.email,
      });
      setSavePlanLoading(false);
      setPlan({
        books: [],
        courses: [],
        podcasts: [],
        movies: [],
        youtube: [],
      });
      setIsPlanOpen(false);
      return newId;
    }
  };

  const handleExport = async () => {
    const newPlanId = await savePlan();
    setExportPlanId(newPlanId);
    setIsExportModalOpen(true);
  };

  return (
    <>
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
                    isInPlan={isInPlan(course, 'courses', plan)}
                    setPlan={setPlan}
                    plan={plan}
                  />
                </Grid.Col>
              ))}
              {plan.books.map((book: GoogleBookType) => (
                <Grid.Col key={book.ISBN_13} span={{ base: 12, md: 6, lg: 3 }}>
                  <BookCard
                    isInPlan={isInPlan(book, 'books', plan)}
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
                    isInPlan={isInPlan(podcast, 'podcasts', plan)}
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
                    isInPlan={isInPlan(movie, 'movies', plan)}
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
                    isInPlan={isInPlan(video, 'youtube', plan)}
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
              <Button onClick={savePlan} variant="default" size="md">
                Save
              </Button>
              <Button
                color={theme.colors.purple[0]}
                size="md"
                onClick={() => handleExport()}
                rightSection={<IconArrowBarToRight size={14} />}
              >
                Export
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
      <Modal
        opened={isExportModalOpen}
        onClose={() => {
          setExportPlanId(null);
          setIsExportModalOpen(false);
        }}
        withCloseButton={false}
        centered
      >
        {exportPlanId ? (
          <Stack>
            <TextInput value={`http://localhost:3000/plan/${exportPlanId}`} />
            <CopyButton value={`http://localhost:3000/plan/${exportPlanId}`}>
              {({ copied, copy }) => (
                <Button
                  color={
                    !copied
                      ? theme.colors.purple[0]
                      : theme.colors.lightPurple[0]
                  }
                  onClick={copy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </CopyButton>
          </Stack>
        ) : (
          <Flex>
            <Loader />
          </Flex>
        )}
      </Modal>
    </>
  );
}
