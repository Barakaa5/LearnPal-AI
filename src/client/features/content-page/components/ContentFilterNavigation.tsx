'use client';

import {
  BackgroundImage,
  Box,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowBarToRight } from '@tabler/icons-react';
import router from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { PlanType } from '../types';
import FilterChips from './FilterChips';

export default function ContentFilterNavigation({
  subject,
  filters,
  plan,
  setFilters,
  setIsPlanEmpty,
  setIsPlanOpen,
}: {
  subject: string;
  filters: string[];
  plan: PlanType;
  setPlan: Dispatch<SetStateAction<PlanType>>;
  setFilters: (filters: string[]) => void;
  setIsPlanEmpty: Dispatch<SetStateAction<boolean>>;
  setIsPlanOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();

  useEffect(() => {
    if (
      plan.courses.length === 0 &&
      plan.books.length === 0 &&
      plan.movies.length === 0 &&
      plan.podcasts.length === 0 &&
      plan.youtube.length === 0
    ) {
      setIsPlanEmpty(true);
    } else {
      setIsPlanEmpty(false);
    }
  }, [plan]);

  return (
    <>
      <Box w={'100%'} h={'40%'}>
        <BackgroundImage
          h={'70px'}
          src={'/books-cover.jpg'}
          style={{ borderRadius: '20px' }}
        >
          <Stack h="100%" justify="center" align="start" pl={20}>
            <Text fw={700} size="30px" c={theme.colors.white[0]}>
              Start Learning {subject}
            </Text>
          </Stack>
        </BackgroundImage>
      </Box>
      <Group justify="space-between" mb={30}>
        <FilterChips
          filters={['Courses', 'Books', 'Podcasts', 'Movies', 'YouTube']}
          selectedFilters={filters}
          onFilterChange={setFilters}
        />

        <Group>
          <Button
            variant="default"
            size="md"
            onClick={() => router.push('/generate')}
          >
            Go Back
          </Button>
          <Button
            color={theme.colors.purple[0]}
            size="md"
            rightSection={<IconArrowBarToRight size={14} />}
            onClick={() => setIsPlanOpen(true)}
          >
            My Plan
          </Button>
        </Group>
      </Group>
    </>
  );
}
