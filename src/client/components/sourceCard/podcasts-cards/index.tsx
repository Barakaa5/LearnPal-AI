import { Group, Stack, Text } from '@mantine/core';
import { PodcastType } from '@type/podcasts/listen-notes';
import PodcastCard from './PodcastCard';

const PodcastsCards = ({ podcasts }: { podcasts: PodcastType[] }) => {
  if (podcasts?.length) {
    return (
      <Stack p={10} align="left">
        <Text variant="h1" c={'Black'} fw={700}>
          Podcasts Cards
        </Text>
        <Group m={10} justify="space-between">
          {podcasts?.map((podcast: PodcastType) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </Group>
      </Stack>
    );
  } else {
    return null;
  }
};

export default PodcastsCards;
