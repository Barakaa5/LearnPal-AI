'use client';
import subjects from '@client/constants/subjects';
import { getPlansFromDB } from '@client/utils/firestore';
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBook2,
  IconCertificate,
  IconEar,
  IconMovie,
  IconVideo,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default function PlansPage() {
  const session = useSession();
  const theme = useMantineTheme();
  const [plans, setPlans] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getPlans = async () => {
      if (userEmail) {
        const plansData = await getPlansFromDB(userEmail);
        setPlans(plansData);
      }
    };

    getPlans();
  }, [userEmail]);

  useEffect(() => {
    if (session.data?.user.email) {
      setUserEmail(session.data.user.email);
    }
  }, [session]);

  const PlanCard = ({ plan }) => {
    return (
      <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
        <Card.Section>
          <Image
            fit="contain"
            h={100}
            src={subjects[plan.subject]?.icon}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-around" mt="md" gap="xs">
          <Text fw={500}>{plan?.subject}</Text>
          <Badge color={theme.colors.purple[0]} variant="light">
            {plan?.date?.toDate().toLocaleDateString('he-IL')}
          </Badge>
          <Divider />
          <Group>
            <IconCertificate width={'20px'} />
            <Text c="dimmed" size="sm">
              Courses: {plan.courses.length}
            </Text>
          </Group>
          <Group>
            <IconBook2 width={'20px'} />
            <Text c="dimmed" size="sm">
              Books: {plan.books.length}
            </Text>
          </Group>
          <Group>
            <IconVideo width={'20px'} />
            <Text c="dimmed" size="sm">
              Videos: {plan.youtube.length}
            </Text>
          </Group>
          <Group>
            <IconEar width={'20px'} />
            <Text c="dimmed" size="sm">
              Podcasts: {plan.podcasts.length}
            </Text>
          </Group>
          <Group>
            <IconMovie width={'20px'} />
            <Text c="dimmed" size="sm">
              Movies: {plan.movies.length}
            </Text>
          </Group>
          <Divider />
          <Button color={theme.colors.purple[0]}>View</Button>
        </Stack>
      </Card>
    );
  };
  return (
    <Stack align="center" pl={'40px'} pr={'40px'} h={'100vh'} gap={'0'}>
      <Navbar />

      <Grid
        style={{ overflowY: 'scroll' }}
        w={'100%'}
        justify="flex-start"
        mt="20px"
      >
        {plans.map((plan) => (
          <Grid.Col h={530} span={{ base: 12, md: 6, lg: 3 }}>
            <PlanCard plan={plan} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
