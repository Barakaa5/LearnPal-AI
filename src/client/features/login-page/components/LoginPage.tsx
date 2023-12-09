'use client';

import GoogleIcon from '@client/features/login-page/assets/images/icons_google.svg';
import {
  BackgroundImage,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function LoginPage() {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1588702547954-4800ead296ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3553&q=80';
  const theme = useMantineTheme();
  return (
    <Group justify="space-between">
      <Box
        w={'33%'}
        style={(theme) => ({
          backgroundColor: theme.colors.purple,
          borderEndEndRadius: '50px',
          borderStartEndRadius: '50px',
        })}
      >
        <BackgroundImage
          src={heroImageUrl}
          style={{
            borderEndEndRadius: '50px',
            borderStartEndRadius: '50px',
            opacity: '0.3',
          }}
          h={'100vh'}
          w={'100%'}
        ></BackgroundImage>
      </Box>
      <Stack h={'100vh'} align="center" justify="center" m="auto">
        <Group justify={'flex-end'}>
          <Text c={theme.colors.purple[0]} size="lg" fw={700}>
            LearnPal.ai
          </Text>
          <Image alt="logo" src={'/learnpal_logo.svg'} width={60} height={60} />
        </Group>

        <Stack align="center" justify="center" mr="auto">
          <Title>Log In</Title>

          <Button
            onClick={async () => {
              try {
                await signIn('google', { callbackUrl: '/generate' });
              } catch (error) {
                console.error('Sign in failed:', error);
                // Display error message to user
              }
            }}
            style={{
              border: `1px solid ${theme.colors.purple[0]}`,
            }}
            leftSection={
              <Image src={GoogleIcon} alt="GoogleIcon" width={36} height={36} />
            }
            variant="subtle"
            size={'md'}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Stack>
    </Group>
  );
}
