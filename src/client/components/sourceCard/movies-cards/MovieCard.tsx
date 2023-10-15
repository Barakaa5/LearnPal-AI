import { Button, Card, Divider, Image, Stack, Text } from '@mantine/core';
import { OmdbMovieType } from '@type/movies/omdb';

const MovieCard = ({ movie }: { movie: OmdbMovieType }) => {
  return (
    <Card shadow="xs" padding="md" radius="xl" w={300} withBorder>
      <Card.Section>
        <Image
          src={movie.Poster}
          height={140}
          alt={movie.Title}
          radius="xl"
          style={{
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
      </Card.Section>

      <Text size="xs" m="auto" mt={10} fw={700}>
        {movie.Title} ({movie.Year})
      </Text>
      <Text size="xs" c="dimmed" m="auto" my={10}>
        Directed by {movie.Director}
      </Text>

      <Divider />

      <Stack gap={5} py={20} px={5}>
        <Text size="xs">
          <strong>Genre:</strong> {movie.Genre}
        </Text>
        <Text size="xs">
          <strong>Actors:</strong> {movie.Actors}
        </Text>
        <Text size="xs">
          <strong>IMDb Rating:</strong> {movie.imdbRating}
        </Text>
      </Stack>

      <Divider />

      <Text size="sm" c="dimmed" my={10}>
        {movie.Plot}
      </Text>

      <Divider />

      <Button
        variant="outline"
        color="blue"
        fullWidth
        mt="md"
        radius="xl"
        component="a"
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
      >
        View on IMDb
      </Button>
    </Card>
  );
};

export default MovieCard;
