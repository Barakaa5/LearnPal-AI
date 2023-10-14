'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  colors: {
    purple: ['#925FE2'],
    lightPurple: ['#BC9FEB'],
  },
});

export default function CustomMantineProvider({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
