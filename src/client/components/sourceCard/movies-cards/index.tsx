import { Group, Stack, Text } from '@mantine/core';
import { OmdbMovieType } from '@type/movies/omdb';
import MovieCard from './MovieCard';

const MoviesCards = ({ movies }: { movies: OmdbMovieType[] }) => {
  if (movies?.length) {
    return (
      <Stack p={10} align="left">
        <Text variant="h1" c={'Black'} fw={700}>
          Movies Cards
        </Text>
        <Group m={10} justify="space-between">
          {movies?.map((movie: OmdbMovieType) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </Group>
      </Stack>
    );
  } else {
    return null;
  }
};

export default MoviesCards;
