'use client';
import { createTheme } from '@mui/material/styles';

import { ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C1D21',
    },
    secondary: {
      main: '#925FE2',
    },
    info: {
      main: 'rgba(255, 255, 255, 0.5)',
    },
  },
});

const ThemeOverrideProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeOverrideProvider;
