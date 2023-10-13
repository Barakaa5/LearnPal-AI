import { Group, Stack, Text } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import GoogleBookCard from './GoogleBookCard';

const BooksCards = ({ books }: { books: GoogleBookType[] }) => {
  if (books?.length) {
    return (
      <Stack p={10} align="left">
        <Text variant="h1" c={'Black'} fw={700}>
          Books
        </Text>
        <Group m={10} justify="space-between">
          {books?.map((book: GoogleBookType) => (
            <GoogleBookCard key={book.ISBN_13} book={book} />
          ))}
        </Group>
      </Stack>
    );
  } else {
    return null;
  }
};

export default BooksCards;
