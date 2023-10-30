'use client';
import ContentPage from '@client/features/content-page/ContentPage';
import { Box } from '@mantine/core';
import { useParams } from 'next/navigation';

export default function Content() {
  const params = useParams();
  if (params?.subject) {
    return <ContentPage subject={params.subject} />;
  }
  return <Box>Error</Box>;
}
