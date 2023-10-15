import { Group, Stack, Text } from '@mantine/core';
import { UdemyCourseType } from '@type/online-courses/udemy';
import UdemyCourseCard from './OnlineCourseCard';

const OnlineCoursesCards = ({ courses }: { courses: UdemyCourseType[] }) => {
  if (courses?.length) {
    return (
      <Stack p={10} align="left">
        <Text variant="h1" c={'Black'} fw={700}>
          Online Courses Cards
        </Text>
        <Group m={10} justify="space-between">
          {courses?.map((course: UdemyCourseType) => (
            <UdemyCourseCard key={course.id} course={course} />
          ))}
        </Group>
      </Stack>
    );
  } else {
    return null;
  }
};

export default OnlineCoursesCards;
