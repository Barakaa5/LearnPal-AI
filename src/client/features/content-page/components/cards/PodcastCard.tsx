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
import { PodcastResponse } from '@server/podcasts/listen-notes/type';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { PlanType } from '../../ContentPage';

export default function PodcastCard({
  podcast,
  isInPlan,
  plan,
  setPlan,
}: {
  podcast: PodcastResponse;
  isInPlan: boolean;
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
}) {
  const theme = useMantineTheme();
  return (
    <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
      <Card.Section>
        <Image
          fit="contain"
          src={podcast.image}
          h={110}
          alt={podcast.title_original}
          fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
        />
      </Card.Section>

      <Stack justify="space-between" gap={'xs'} mt="md">
        <Text fw={500}>{podcast.title_original}</Text>
        <Badge color={theme.colors.purple[0]} variant="light">
          {podcast.total_episodes} episodes
        </Badge>
        <Divider />
        <Text c="dimmed" size="sm">
          {podcast.listen_score}
        </Text>
        <Divider />
        <Group mt={'lg'} m={'auto'}>
          {isInPlan ? (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconMinus size={14} />}
              radius="md"
              onClick={() => {
                const modifiedPodcasts = plan.podcasts.filter(
                  (planPodcast) => planPodcast.id != podcast.id
                );
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  podcasts: modifiedPodcasts,
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
                  podcasts: [...prevPlan.podcasts, podcast],
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
            href={podcast.website}
            target="_blank"
          >
            Listen
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
