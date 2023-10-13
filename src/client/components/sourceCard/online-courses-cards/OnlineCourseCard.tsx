import { UdemyCourseType } from '@client/types/online-courses/udemy';
import { Button, Card, Divider, Image, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';

const UdemyCourseCard = ({ course }: { course: UdemyCourseType }) => {
  return (
    <Card shadow="xs" padding="md" radius="xl" w={300} withBorder>
      <Card.Section>
        <Image
          src={course.image}
          height={140}
          alt={course.title}
          radius="xl"
          style={{
            borderEndEndRadius: 0,
            borderEndStartRadius: 0,
          }}
        />
      </Card.Section>

      <Text size="xs" m="auto" mt={10} fw={700}>
        {course.title}
      </Text>
      <Text size="xs" c="dimme" m="auto" my={10}>
        by {course.author.name}
      </Text>

      <Divider />

      <Stack gap={5} py={20} px={5}>
        <Text size="xs">
          <strong>Created:</strong> {dayjs(course.created).format('DD/MM/YYYY')}
        </Text>
        <Text size="xs">
          <strong>Average Rating:</strong> {course.avg_rating.toFixed(3)}
        </Text>
        <Text size="xs">
          <strong>Reviews:</strong> {course.num_reviews}
        </Text>
        <Text size="xs">
          <strong>Subscribers:</strong> {course.num_subscribers}
        </Text>
        <Text size="xs">
          <strong>Language:</strong> {course.locale}
        </Text>
      </Stack>

      <Divider />

      <Text size="sm" c="dimmed" my={10}>
        {course.description.slice(0, 100)}...
      </Text>

      <Divider />

      <Button
        variant="outline"
        color="blue"
        fullWidth
        mt="md"
        radius="xl"
        component="a"
        href={'https://www.udemy.com' + course.url}
        target="_blank"
      >
        Go to course
      </Button>
    </Card>
  );
};

export default UdemyCourseCard;
