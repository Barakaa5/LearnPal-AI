'use client';
import { Stack, Typography, useTheme } from '@mui/material';
import CredentialsLogin from './CredentialsLogin';
import GoogleButton from './GoogleButton';

export default function LoginPage() {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems={'center'}
      height={'100vh'}
      sx={{ backgroundColor: theme.palette.primary.main }}
      justifyContent="space-between"
    >
      <Stack width={'100%'} alignItems={'center'}>
        <Typography
          variant="h2"
          color={'#FFFFFF'}
          align={'center'}
          marginBottom={'12px'}
        >
          Login
        </Typography>
        <Typography
          variant="h6"
          color={'rgba(255, 255, 255, 0.7)'}
          marginBottom={'48px'}
        >
          Enter your account details
        </Typography>
        <CredentialsLogin />
        <GoogleButton />
      </Stack>
      <Stack
        width={'100%'}
        height={'100vh'}
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        Hello World
      </Stack>
    </Stack>
  );
}
