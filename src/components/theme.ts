import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#004F8A",
      light: "#0063ac",
      dark: "#003f6e",
    },
    secondary: {
      main: "#dadde8",
      light: "#bac3d3",
      dark: "#63779b",
    }
  },
});

export default theme;
