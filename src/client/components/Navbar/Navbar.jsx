import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const theme = useMantineTheme();
  const router = useRouter();
  const session = useSession();
  return (
    <Group w={'100%'} justify="space-between" h={60}>
      <Group>
        <Image src={'/learnpal_logo.svg'} width={60} height={60} />
        <Text
          style={(theme) => ({
            color: theme.colors.purple,
          })}
          size="lg"
          fw={700}
        >
          LearnPal.ai
        </Text>
      </Group>
      <Group>
        <Button
          onClick={() => router.push('/generate')}
          color="black"
          variant="transparent"
        >
          Generate
        </Button>
        <Button color="black" variant="transparent">
          Explore
        </Button>
        <Button
          onClick={() => {
            router.push('/plans');
          }}
          color="black"
          variant="transparent"
        >
          My Plans
        </Button>
        <Button color="black" variant="transparent">
          About
        </Button>
      </Group>
      <Group>
        {session?.data?.user ? (
          <Button onClick={() => signOut()} color={theme.colors.purple[0]}>
            Log Out
          </Button>
        ) : (
          <Button color={theme.colors.purple[0]}>Log In</Button>
        )}
      </Group>
    </Group>
  );
}
