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
  IconEye,
  IconMinus,
  IconMovie,
  IconPlus,
  IconThumbUp,
} from '@tabler/icons-react';
import { YouTubeVideo } from '@type/youtube';
import { Dispatch, SetStateAction } from 'react';
import { PlanType } from '../../ContentPage';

const formatYouTubeDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) {
    return '00:00';
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2]
    ? parseInt(match[2], 10).toString().padStart(2, '0')
    : '00';
  const seconds = match[3]
    ? parseInt(match[3], 10).toString().padStart(2, '0')
    : '00';

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export default function YoutubeCard({
  video,
  isInPlan,
  plan,
  setPlan,
}: {
  video: YouTubeVideo;
  isInPlan: boolean;
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
}) {
  const theme = useMantineTheme();
  return (
    <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
      <Card.Section>
        <Image
          src={video.thumbnail}
          fit="contain"
          h={200}
          alt={video.title}
          fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
        />
      </Card.Section>

      <Stack justify="space-between" gap={'xs'} mt="md">
        <Text fw={500}>{video.title}</Text>
        <Badge color={theme.colors.purple[0]} variant="light">
          By {video.channelTitle}
        </Badge>
        <Divider />
        <Group>
          <IconEye width="20px" />
          <Text c="dimmed" size="sm">
            Views: {video.viewCount}
          </Text>
        </Group>
        <Group>
          <IconThumbUp width="20px" />
          <Text c="dimmed" size="sm">
            Likes: {video.likeCount}
          </Text>
        </Group>
        <Group>
          <IconMovie width={'20px'} />
          <Text c="dimmed" size="sm">
            Duration: {formatYouTubeDuration(video.duration)}
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
                const modifiedYoutube = plan.youtube.filter(
                  (planVideo) => planVideo.url !== video.url
                );
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  youtube: modifiedYoutube,
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
                  youtube: [...prevPlan.youtube, video],
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
            href={video.url}
          >
            Watch
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
