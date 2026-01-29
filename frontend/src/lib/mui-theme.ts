import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b', // Gold/Amber to match our cinematic theme
    },
    secondary: {
      main: '#0ea5e9', // Blue
    },
    background: {
      default: '#0a0c10',
      paper: '#1a1d23',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
