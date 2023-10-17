'use client';
import AppleIcon from '@client/features/login-page/assets/images/icons_apple.svg';
import FacebookIcon from '@client/features/login-page/assets/images/icons_facebook.svg';
import GoogleIcon from '@client/features/login-page/assets/images/icons_google.svg';
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

export default function LoginPage() {
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
    <Box
      style={{
        display: 'flex',
      }}
    >
      <Box
        h={'100vh'}
        w={'33%'}
        style={(theme) => ({
          backgroundColor: theme.colors.lightPurple,
          borderEndEndRadius: '50px',
          borderStartEndRadius: '50px',
        })}
      >
        <BackgroundImage
          src="https://images.unsplash.com/photo-1697213825057-10356bfc8713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3571&q=80"
          style={{
            borderEndEndRadius: '50px',
            borderStartEndRadius: '50px',
            opacity: '0.5',
          }}
          h={'100vh'}
          w={'100%'}
        ></BackgroundImage>
      </Box>
      <Stack
        h={'100vh'}
        w={'67%'}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            width: '100%',
            display: 'flex',
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
            Syllabus.ai
          </Text>
        </Box>
        <Stack
          style={{
            height: '70%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box style={{ marginBottom: '70px' }} variant="h2">
            <Title
              style={{
                margin: 'auto',
                width: 'fit-content',
              }}
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
              width: '210px',
            })}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Login
          </Button>
          <Group
            style={{
              width: '210px',
              gap: 'unset',
              justifyContent: 'space-between',
            }}
          >
            <ActionIcon
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
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
          <Button
            leftSection={<IconPlus size={20} />}
            color="black"
            variant="transparent"
            size="md"
          >
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
