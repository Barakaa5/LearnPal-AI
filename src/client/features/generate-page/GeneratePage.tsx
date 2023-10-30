'use client';
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

const SuggestionCard = ({ subject, imgSrc }) => {
  const theme = useMantineTheme();
  return (
    <Paper radius={'lg'} h={240} w={240} shadow="md" p="lg">
      <Stack h="100%" justify="space-around" align="center">
        <Text size="26px" fw={'900'}>
          {subject}
        </Text>
        <Image alt="subject-icon" width={'64'} height={'64'} src={imgSrc} />
        <Button variant="outline" color={theme.colors.purple[0]}>
          Try!
        </Button>
      </Stack>
    </Paper>
  );
};

export default function GeneratePage() {
  const theme = useMantineTheme();
  const [input, setInput] = useState('');
  const router = useRouter();
  return (
    <Stack align="center" h={'100vh'} gap={'0'}>
      <Navbar />
      <Box w={'100%'} pl={'40px'} pr={'40px'} mb={'20px'} h={'40%'}>
        <BackgroundImage
          h={'100%'}
          src={'/books-cover.jpg'}
          style={{ borderRadius: '20px' }}
        >
          <Stack h="100%" justify="center" align="center">
            <Text fw={700} size="30px" c={theme.colors.white[0]}>
              What do you wish to learn today?
            </Text>
            <TextInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              radius="xl"
              size="l"
              w={'300px'}
              placeholder="Enter a subject"
              rightSectionWidth={35}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.colors.purple[0]}
                  variant="filled"
                  onClick={() => router.push(`/content/${input}`)}
                >
                  <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
            />
          </Stack>
        </BackgroundImage>
      </Box>
      <Box mb={'30px'} w={'100%'} pl={'40px'} pr={'40px'}>
        <Group
          bg={theme.colors.lightPurple[0]}
          w={'100%'}
          h={'80px'}
          style={{ borderRadius: '20px' }}
          justify="space-between"
          pl={'8%'}
          pr={'8%'}
        >
          <Select
            placeholder="Language"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            w={'20%'}
            size="md"
          />
          <Select
            placeholder="Timeframe (Soon!)"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            size="md"
            w={'20%'}
            disabled
          />
          <Select
            placeholder="Level"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            size="md"
            w={'20%'}
          />
          <Select
            placeholder="<Something>"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            size="md"
            w={'20%'}
          />
        </Group>
      </Box>
      <Box w={'100%'} pl={'40px'} pr={'40px'}>
        <Text mb={'20px'} fw={'700'} size="25px">
          Suggestions:
        </Text>
        <Group justify="space-around">
          <SuggestionCard subject="Spanish" imgSrc="/icons_spain.png" />
          <SuggestionCard subject="Web-Dev" imgSrc="/icons_web-dev.png" />
          <SuggestionCard subject="Physics" imgSrc="/icons_physics.png" />
          <SuggestionCard subject="Drawing" imgSrc="/icons_drawing.svg" />
          <SuggestionCard subject="Chinese" imgSrc="/icons_china.png" />
          <SuggestionCard
            subject="Video Editing"
            imgSrc="/icons_video-editing.png"
          />
        </Group>
      </Box>
    </Stack>
  );
}
