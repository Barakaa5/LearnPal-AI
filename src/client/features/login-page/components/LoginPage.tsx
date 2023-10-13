'use client';
import { Box, Stack } from '@mantine/core';
import CredentialsLogin from './CredentialsLogin';
import GoogleButton from './GoogleButton';

export default function LoginPage() {
  return (
    <Stack h={'100vh'}>
      <Stack w={'100%'}>
        <Box variant="h2" color={'#FFFFFF'}>
          Login
        </Box>
        <Box variant="h6" color={'rgba(255, 255, 255, 0.7)'}>
          Enter your account details
        </Box>
        <CredentialsLogin />
        <GoogleButton />
      </Stack>
    </Stack>
  );
}
