import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5f249A',
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
            main: '#DCDFE9',
        },
    },
});

export default theme;