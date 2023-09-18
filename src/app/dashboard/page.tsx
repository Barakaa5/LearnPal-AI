'use client';

import { Button, Container, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
export default function Dashboard() {
  const { data: session } = useSession();
  
  return (
    <Container>
      <Typography variant="h2">dashboard</Typography>
      <Button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
        signOut
      </Button>
    </Container>
  );
}
