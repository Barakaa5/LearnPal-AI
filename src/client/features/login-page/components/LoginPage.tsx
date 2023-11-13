'use client';
import AppleIcon from '@client/features/login-page/assets/images/icons_apple.svg';
import FacebookIcon from '@client/features/login-page/assets/images/icons_facebook.svg';
import GoogleIcon from '@client/features/login-page/assets/images/icons_google.svg';
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
  const heroImageUrl =
    'https://images.unsplash.com/photo-1588702547954-4800ead296ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3553&q=80';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);

    signIn('credentials', {
      redirect: true, // Set to true to enable automatic redirection
      email,
      password,
    });
  };
  return (
    <Box display={'flex'}>
      <Box
        h={'100vh'}
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
        >
          <Center h={'100%'} p="md">
            <Title c={'white'} order={1}>
              {/* What do you wish to learn today? */}
            </Title>
          </Center>
        </BackgroundImage>
      </Box>
      <Stack h={'100vh'} w={'67%'} display={'flex'} align="center">
        <Box
          w={'100%'}
          display={'flex'}
          style={{
            padding: '10px 20px 0 0',
            justifyContent: 'flex-end',
          }}
        >
          {/* temporary until we design a logo */}
          <Text
            style={(theme) => ({
              color: theme.colors.purple,
            })}
            size="lg"
            fw={700}
          >
            LearnPal.ai
          </Text>
        </Box>
        <Stack h={'70%'} align="center">
          <Box style={{ marginBottom: '70px' }} variant="h2">
            <Title
              style={{
                margin: 'auto',
              }}
              w={'fit-content'}
              order={1}
            >
              Log In
            </Title>
          </Box>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles={{
              input: { backgroundColor: '#F1F3F5' },
              root: {
                marginBottom: '20px',
                width: '380px',
              },
            }}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles={{
              input: { backgroundColor: '#F1F3F5' },
              root: {
                marginBottom: '160px',
                width: '380px',
              },
            }}
          />
          <Button
            variant="filled"
            size="xl"
            style={(theme) => ({
              backgroundColor: theme.colors.purple,
            })}
            w={'210px'}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Login
          </Button>
          <Group w={'210px'} justify="space-between">
            <ActionIcon
              onClick={() => signIn('google', { callbackUrl: '/generate' })}
              variant="transparent"
              size={'xl'}
            >
              <Image src={GoogleIcon} alt="GoogleIcon" width={36} height={36} />
            </ActionIcon>
            <ActionIcon
              size={'xl'}
              disabled
              variant="transparent"
              aria-label="Settings"
            >
              <Image
                src={FacebookIcon}
                alt="facebookIcon"
                width={36}
                height={36}
              />
            </ActionIcon>
            <ActionIcon
              size={'xl'}
              disabled
              variant="transparent"
              aria-label="Settings"
            >
              <Image src={AppleIcon} alt="GoogleIcon" width={36} height={36} />
            </ActionIcon>
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
}
