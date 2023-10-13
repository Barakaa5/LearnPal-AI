import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { getServerSession } from 'next-auth';
import SessionProvider from '../client/providers/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/options';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider>{children}</MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
