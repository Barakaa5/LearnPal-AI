'use client';
import { Box, Container, Group, Stack } from '@mantine/core';
import CredentialsLogin from './CredentialsLogin';
import GoogleButton from './GoogleButton';

export default function LoginPage() {
  return (
    <Group bg="var(--mantine-color-blue-light)">
      <Box
        h={'100vh'}
        w={'33%'}
        style={(theme) => ({
          backgroundColor: theme.colors.lightPurple,
        })}
      >
        <Box
          h={'100vh'}
          w={'100%'}
          style={(theme) => ({
            backgroundImage: "url('/public/login_img.jpg')",
          })}
        ></Box>
      </Box>
      <Box h={'100vh'} w={'66%'} bg="var(--mantine-color-blue-light)">
        <Container>
          <Stack bg="var(--mantine-color-blue-light)">
            <Box variant="h2" color={'#FFFFFF'}>
              Login
            </Box>
            <Box variant="h6" color={'rgba(255, 255, 255, 0.7)'}>
              Enter your account details
            </Box>
            <CredentialsLogin />
            <GoogleButton />
          </Stack>
        </Container>
      </Box>
    </Group>
  );
}
