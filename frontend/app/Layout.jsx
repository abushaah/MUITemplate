import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import DefaultAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import NavbarTreeView from '../src/components/NavbarTreeView';
import routes from '../routes';

// this page includes the base layout of the side (navbar drawer on the left, title on top, and content)

const drawerWidth = 300;

const AppBar = styled(DefaultAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    ...theme.mixins.toolbar, // content
    justifyContent: 'space-between',
}));

const Main = styled ('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `${drawerWidth}px)`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
    }),
}));

export default function AppLayout({ children }) {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const theme = useTheme ();

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            {/* adjust the app bar background and font colour here */}
            <AppBar position='fixed' open={open} background={theme.palette.primary.main} sx={{ boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open-drawer'
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography>
                        {routes.find(({ path }) => path === pathname)?.name}
                    </Typography>
                </Toolbar>
                <Divider />
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSigin: 'border-box',
                        background: '#252831',
                    },
                }}
                variant='persistent'
                anchor='left'
                open={open}
            >
                <DrawerHeader>
                    <Typography variant='h6' color='white' noWrap>
                        MUI & Vite Dashboard
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronLeftIcon color='secondary' />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <NavbarTreeView />
            </Drawer>
            <Main
                open={open}
                sx={{
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                <Toolbar />
                {children}
                <Toolbar />
            </Main>
        </Box>
    );
}