import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ButtonGroup from '@mui/material/ButtonGroup';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
// import { useNavigate } from "react-router-dom";
import Calendar from '../Factories/Home/Home';
import { Outlet, useNavigate } from 'react-router-dom';
import { Snackbar } from '../Component/Snackbar';
import axios from 'axios';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function MiniDrawer() {
    const [snacks, setSnacks] = React.useState({
        type: 'info',
        open: false,
        message: '',
    });
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [inputs, setInputs] = React.useState([
        {
            userId: '',
        },
    ]);
    const navigate = useNavigate(); //Route move api

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //친구 팝업창
    const [openPopup, setOpenPopup] = useState(false);

    const handleClickOpen = () => {
        setOpenPopup(true);
    };

    const handleClose = () => {
        setOpenPopup(false);
        setInputs({
            ...inputs,
            userId: '',
        });
    };
    /////////////

    const [largeMenuArray, setLargeMenuArray] = React.useState(['홈', '사용자그룹', '일정관리']); // Drawer large Menu Array
    //로그아웃 버튼
    const logOut = () => {
        sessionStorage.removeItem('user_id');
        navigate('/');
    };
    //팝업 친구 추가
    const saveConfirm = async () => {
        var userId = sessionStorage.getItem('userId'); //로그인된 아이디

        let getData = new URLSearchParams({
            USER_ID: userId,
            USER_ID_FN: inputs.userId,
        });
        // navigate("/Home");
        await axios
            .get('/friendAdd', {
                headers: {
                    'Content-Type': `application/json`,
                },
                params: getData,
            })
            .then((e) => {
                console.log(e);
                //데이터가 없으면 아이디나 비밀번호가 맞지않음.
                if (e.data.length === 0) {
                    setSnacks({
                        ...snacks,
                        open: true,
                        type: 'info',
                        message: '아이디나 비밀번호가 틀렷습니다.',
                    });
                } else {
                    setSnacks({
                        ...snacks,
                        open: true,
                        type: 'success',
                        message: '로그인에 성공하였습니다.',
                    });
                    setOpenPopup(false);
                    setInputs({
                        ...inputs,
                        userId: '',
                    });
                }
            })
            .catch((e) => {
                console.log('error', e);
            });
    };
    const BasicClick = async (_text) => {
        if (_text == '홈') {
            navigate('/Home');
        } else if (_text === '사용자그룹') {
            navigate('/UserGroup');
        } else if (_text === '일정관리') {
            navigate('/CalendarManagement');
        }
    };
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* leftbar */}
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {largeMenuArray.map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => BasicClick(text)}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {text === '홈' ? (
                                        <HomeIcon />
                                    ) : text === '사용자그룹' ? (
                                        <GroupIcon />
                                    ) : (
                                        <CalendarMonthIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* topbar */}
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton variant="text" onClick={(e) => navigate('/Home')}>
                            DUTY
                        </IconButton>
                    </div>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        <Button variant="contained" onClick={handleClickOpen}>
                            <PersonAddAltIcon fontSize="small"></PersonAddAltIcon>
                        </Button>
                        <Button variant="contained" onClick={handleClickOpen}>
                            <NotificationsActiveIcon fontSize="small"></NotificationsActiveIcon>
                        </Button>

                        <Button variant="contained" onClick={logOut}>
                            <LogoutIcon fontSize="small"></LogoutIcon>
                        </Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>

            {/* main */}
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
            </Box>
            <Dialog open={openPopup} onClose={handleClose}>
                <DialogTitle>친구추가</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        id="ID"
                        onChange={(e) => {
                            setInputs({
                                ...inputs,
                                userId: e.target.value,
                            });
                        }}
                        placeholder="ID"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveConfirm} color="primary">
                        추가
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                type={snacks.type}
                open={snacks.open}
                message={snacks.message}
                onClose={() => {
                    setSnacks({
                        ...snacks,
                        open: false,
                    });
                }}
            />
        </Box>
    );
}
