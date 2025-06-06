import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer, Toolbar, Typography, IconButton, Divider } from '@mui/material';
import DefaultAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import NarbarTreeView from '../src/components/NavbarTreeView';
import routes from '../routes';

const drawerWidth = 300;

const AppBar = styled(DefaultAppBar, {
    shoudForwardProp: (prop) => prop !== 'open',
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

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <AppBar position='fixed' open={open} color="" sx={{ boxShadow: 'none' }}>
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
                        MUI-Dashboard
                    </Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {<ChevronLeftIcon color='secondary' />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <NarbarTreeView />
            </Drawer>
            <Main open={open}>
                <Toolbar />
                {children}
                <Toolbar />
            </Main>
        </Box>
    );
}

AppLayout.propTypes = {
    children: PropTypes.object.isRequired,
}