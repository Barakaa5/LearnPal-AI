import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { getServerSession } from 'next-auth';
import CustomMantineProvider from '../client/providers/CustomMantineProvider';
import SessionProvider from '../client/providers/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/options';

export const metadata = {
  title: 'Syllabus.ai',
  description: 'I have followed setup instructions carefully ',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider session={session}>
          <CustomMantineProvider>{children}</CustomMantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
