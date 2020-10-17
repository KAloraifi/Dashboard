import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NavigationBar from './components/NavigationBar/NavigationBar';
import Dashboard from './Dashboard';
import { CssBaseline } from '@material-ui/core';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(() =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
        primary: {
          // light: will be calculated from palette.primary.main,
          main: '#ffd54f'
          // dark: will be calculated from palette.primary.main,
        },
        secondary: {
          // light: will be calculated from palette.secondary.main,
          main: '#f44336'
          // dark: will be calculated from palette.secondary.main,
        },
      },
      props: {
        MuiButtonBase: {
          disableRipple: true,
        },
      },
      typography: {
        body2: {
          fontSize: '1rem'
        }
      },
    })
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
