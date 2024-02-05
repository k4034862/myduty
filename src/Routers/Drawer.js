import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import { styled, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const MiniDrawer = () => {
    const drawerWidth = 240;
    const navigate = useNavigate(); //Route move api
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logOut = () => {
        sessionStorage.removeItem('user_id');
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            <Sidebar open={open} />
            <TopBar open={open} handleDrawerOpen={handleDrawerOpen} logOut={logOut} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    overflowY: 'auto',
                    height: '100%', // 전체 높이를 사용하도록 설정
                    marginTop: '64px', // AppBar의 높이만큼 marginTop을 줌
                    marginLeft: open ? `${drawerWidth}px` : 0, // Drawer가 열려있으면 marginLeft을 줌
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Outlet />
                {/* <Calendar height="100%" /> */}
            </Box>
        </Box>
    );
};

export default MiniDrawer;
