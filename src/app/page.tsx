import { Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container>
      <Typography variant="h2">Hello World</Typography>
      <Link href="/dashboard">dashboard</Link>
    </Container>
  );
}
