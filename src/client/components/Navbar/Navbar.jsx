import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import Image from 'next/image';

export default function Navbar() {
  const theme = useMantineTheme();
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
        <Button color="black" variant="transparent">
          Generate
        </Button>
        <Button color="black" variant="transparent">
          Explore
        </Button>
        <Button disabled color="black" variant="transparent">
          Blog
        </Button>
        <Button color="black" variant="transparent">
          About
        </Button>
      </Group>
      <Group>
        <Button color={theme.colors.purple[0]}>Log In</Button>
      </Group>
    </Group>
  );
}
