import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

export default function Navbar() {
  const theme = useMantineTheme();
  return (
    <Group w={'100%'} justify="space-between" h={60} pl={40} pr={40}>
      <Text
        style={(theme) => ({
          color: theme.colors.purple,
        })}
        size="lg"
        fw={700}
      >
        Syllabus.ai
      </Text>
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
        {/* <Button>Sign Up</Button> */}
      </Group>
    </Group>
  );
}
