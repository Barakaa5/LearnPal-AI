'use client';

import {
  Avatar,
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
  IconCalendarDue,
  IconMinus,
  IconPlus,
  IconTag,
  IconThumbUp,
} from '@tabler/icons-react';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { Dispatch, SetStateAction } from 'react';
import { PlanType } from '../../ContentPage';

const formatCourseDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default function CourseCard({
  course,
  isInPlan,
  plan,
  setPlan,
}: {
  isInPlan: boolean;
  course: UdemyCourseType;
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
}) {
  const theme = useMantineTheme();

  return (
    <Card
      style={{ maxWidth: '300px', minHeight: '500px' }}
      shadow="sm"
      padding="xl"
      withBorder
    >
      <Card.Section>
        <Image
          fit="contain"
          src={course.image}
          h={150}
          alt={course.title}
          fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
        />
      </Card.Section>

      <Stack justify="space-between" gap={'xs'} mt="md">
        <Text fw={500}>{course.title}</Text>
        <Group>
          <Badge
            style={{ maxWidth: '75%' }}
            color={theme.colors.purple[0]}
            variant="light"
          >
            By: {course.author.name}
          </Badge>
          <Avatar src={course.author.image_100x100} size="sm" />
        </Group>
        <Divider />
        <Group>
          <IconTag width={'20px'} />
          <Text c="dimmed" size="sm">
            Price: {course.price}
          </Text>
        </Group>
        <Group>
          <IconThumbUp width={'20px'} />
          <Text c="dimmed" size="sm" style={{ maxWidth: '80%' }}>
            Rating: {Math.round(course.avg_rating * 100) / 100} (
            {course.num_reviews} Reviews)
          </Text>
        </Group>
        <Group>
          <IconCalendarDue width={'20px'} />
          <Text c="dimmed" size="sm">
            Date: {formatCourseDate(course.created)}
          </Text>
        </Group>
        <Divider />
        <Group mt={'lg'} m={'auto'}>
          {!isInPlan ? (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconPlus size={14} />}
              radius="md"
              onClick={() =>
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  courses: [...prevPlan.courses, course],
                }))
              }
            >
              Add
            </Button>
          ) : (
            <Button
              color={theme.colors.purple[0]}
              size="compact-sm"
              leftSection={<IconMinus size={14} />}
              radius="md"
              onClick={() => {
                const modifiedCourses = plan.courses.filter(
                  (planCourse) => planCourse.id != course.id
                );
                setPlan((prevPlan) => ({
                  ...prevPlan,
                  courses: modifiedCourses,
                }));
              }}
            >
              Remove
            </Button>
          )}
          <Button
            color={theme.colors.purple[0]}
            variant="outline"
            size="compact-sm"
            radius="md"
            component="a"
            href={`https://udemy.com/${course.url}`}
            target="_blank"
          >
            Enroll
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
