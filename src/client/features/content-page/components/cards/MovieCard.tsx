'use client';

import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCalendarDue,
  IconMinus,
  IconMovie,
  IconPlus,
  IconThumbUp,
} from '@tabler/icons-react';
import { OmdbMovieType } from '@type/movies/omdb';
import { Dispatch, SetStateAction } from 'react';
import { PlanType } from '../../ContentPage';

export default function MovieCard({
  movie,
  isInPlan,
  plan,
  setPlan,
}: {
  movie: OmdbMovieType;
  isInPlan: boolean;
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
}) {
  const theme = useMantineTheme();
  return (
    <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
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
        <Divider />
        <Group>
          <IconThumbUp width="20px" />
          <Text c="dimmed" size="sm">
            Rating: {movie.Metascore}
          </Text>
        </Group>
        <Group>
          <IconCalendarDue width={'20px'} />
          <Text c="dimmed" size="sm">
            Year: {movie.Year}
          </Text>
        </Group>
        <Group>
          <IconMovie width="20px" />
          <Text
            style={{ maxWidth: '80%' }}
            // truncate="end"
            c="dimmed"
            size="sm"
          >
            Genre: {movie.Genre}
          </Text>
        </Group>
        <Divider />
        <Group mt="lg" m={'auto'}>
          {isInPlan ? (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconMinus size={14} />}
              radius="md"
              onClick={() => {
                const modifiedMovies = plan.movies.filter(
                  (planMovie) => planMovie.imdbID != movie.imdbID
                );
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  movies: modifiedMovies,
                }));
              }}
            >
              Remove
            </Button>
          ) : (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconPlus size={14} />}
              radius="md"
              onClick={() =>
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  movies: [...prevPlan.movies, movie],
                }))
              }
            >
              Add
            </Button>
          )}
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
  );
}
