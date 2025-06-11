import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        text: {
            secondary: "#FFFFFF",
        },
        secondary: {
            main: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
        navbar: {
            main: '#FFFFFF',
        },
        icons: {
            main: '#FFFFFF',
        },
        dropdown: {
            main: '#FFFFFF',
        },
    },
});

export default theme;