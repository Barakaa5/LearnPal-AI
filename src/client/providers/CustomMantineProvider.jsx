'use client';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Manrope } from 'next/font/google';
const manrope = Manrope({ subsets: ['latin'], weight: '300' });

const theme = createTheme({
  colors: {
    purple: ['#925FE2'],
    white: ['#ffffff'],
    lightPurple: ['#BC9FEB'],
  },
  fontFamily: manrope.style.fontFamily,
});

export default function CustomMantineProvider({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
