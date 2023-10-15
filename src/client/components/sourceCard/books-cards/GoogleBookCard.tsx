import { Button, Card, Divider, Image, Stack, Text } from '@mantine/core';
import { GoogleBookType } from '@type/books/google-books';
import dayjs from 'dayjs';

const GoogleBookCard = ({ book }: { book: GoogleBookType }) => {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${book?.title} ${book?.authors}`
  )}`;
  return (
    <Card shadow="xs" padding="md" radius="xl" w={300}>
      <Card.Section>
        <Image
          src={book?.imageLinks?.thumbnail}
          alt={book?.title}
          height={140}
          radius="xl"
          style={{
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
      </Card.Section>
      <Text size="xs" m="auto" mt={10} fw={700}>
        {book?.title}
      </Text>
      <Text size="xs" c="dimme" m="auto" my={10}>
        by {book?.authors}
      </Text>

      <Divider />
      <Stack gap={5} py={20} px={5}>
        <Text size="xs">
          <strong>Published by:</strong> {book?.publisher}
        </Text>
        <Text size="xs">
          <strong>Published Date:</strong>{' '}
          {dayjs(book?.publishedDate).format('DD/MM/YYYY')}
        </Text>
        <Text size="xs">
          <strong>ISBN-13:</strong> {book?.ISBN_13}
        </Text>
      </Stack>

      <Divider />

      <Text size="sm" c="dimmed" my={10}>
        {book?.description?.slice(0, 100)}...
      </Text>

      <Divider />

      <Button
        variant="outline"
        color="blue"
        fullWidth
        mt="md"
        radius="xl"
        component="a"
        href={googleSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        More Info
      </Button>
    </Card>
  );
};

export default GoogleBookCard;
