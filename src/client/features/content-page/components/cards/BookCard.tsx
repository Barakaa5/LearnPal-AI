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
  IconBook,
  IconCalendarDue,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { GoogleBookType } from '@type/books/google-books';
import { Dispatch, SetStateAction } from 'react';
import { PlanType } from '../../types';

export default function BookCard({
  book,
  isInPlan,
  plan,
  setPlan,
  disableAddRemove,
  showType,
}: {
  book: GoogleBookType;
  isInPlan: boolean;
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
  disableAddRemove: boolean;
  showType: boolean;
}) {
  const theme = useMantineTheme();

  return (
    <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
      <Card.Section>
        <Image
          fit="contain"
          src={book?.imageLinks?.smallThumbnail}
          h={150}
          alt={book.title}
          fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
        />
      </Card.Section>

      <Stack justify="space-around" mt="md" gap="xs">
        <Text fw={500}>{book.title}</Text>
        <Group>
          {showType && (
            <Badge color={theme.colors.purple[0]} variant="light">
              Book
            </Badge>
          )}
          <Badge color={theme.colors.purple[0]} variant="light">
            By {book.authors}
          </Badge>
        </Group>
        <Divider />
        <Group>
          <IconBook width="20px" />
          <Text c="dimmed" size="sm">
            Pages: {book.pageCount}
          </Text>
        </Group>
        <Group>
          <IconCalendarDue width={'20px'} />
          <Text c="dimmed" size="sm">
            Year: {new Date(book.publishedDate).getFullYear()}
          </Text>
        </Group>
        <Divider />
        <Group mt={'lg'} m={'auto'}>
          {isInPlan ? (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconMinus size={14} />}
              radius="md"
              disabled={disableAddRemove}
              onClick={
                !disableAddRemove
                  ? () => {
                      const modifiedBooks = plan.books.filter(
                        (planBook) => planBook.title != book.title
                      );
                      setPlan((prevPlan) => ({
                        ...prevPlan,
                        books: modifiedBooks,
                      }));
                    }
                  : () => {}
              }
            >
              Remove
            </Button>
          ) : (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconPlus size={14} />}
              radius="md"
              disabled={disableAddRemove}
              onClick={
                !disableAddRemove
                  ? () =>
                      setPlan((prevPlan) => ({
                        ...prevPlan,
                        books: [...prevPlan.books, book],
                      }))
                  : () => {}
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
            href={book.infoLink}
            target="_blank"
          >
            Read
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
