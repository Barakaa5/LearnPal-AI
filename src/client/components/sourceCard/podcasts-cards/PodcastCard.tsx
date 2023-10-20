import { Button, Card, Divider, Image, Stack, Text } from '@mantine/core';
import { PodcastType } from '@type/podcasts/listen-notes';

const PodcastCard = ({ podcast }: { podcast: PodcastType }) => {
  return (
    <Card shadow="xs" padding="md" radius="xl" w={300} withBorder>
      <Card.Section>
        <Image
          src={podcast.thumbnail}
          alt={podcast.title_original}
          radius="xl"
          style={{
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
      </Card.Section>

      <Text size="xs" m="auto" mt={10} fw={700}>
        {podcast.title_original}
      </Text>
      <Text size="xs" c="dimmed" m="auto" my={10}>
        By {podcast.publisher_original}
      </Text>

      <Divider />

      <Stack gap={5} py={20} px={5}>
        <Text size="xs">
          <strong>Total Episodes:</strong> {podcast.total_episodes}
        </Text>
        <Text size="xs">
          <strong>Explicit Content:</strong>{' '}
          {podcast.explicit_content ? 'Yes' : 'No'}
        </Text>
        <Text size="xs">
          <strong>Listening Time:</strong> {podcast.audio_length_sec} Seconds
        </Text>
      </Stack>

      <Divider />

      <Text size="sm" c="dimmed" my={10}>
        {podcast.description_original.slice(0, 100)}...
      </Text>

      <Divider />

      <Button
        variant="outline"
        color="blue"
        fullWidth
        mt="md"
        radius="xl"
        component="a"
        href={podcast.website}
        target="_blank"
      >
        Visit Website
      </Button>
    </Card>
  );
};

export default PodcastCard;
