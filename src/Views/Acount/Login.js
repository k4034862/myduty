import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dialog } from '../../Component/Dialog';
import Register from './Register';
import FindId from '../../Factories/Acount/FindId';
import FindPw from '../../Factories/Acount/FindPw';
// TODO remove, this demo shouldn't need to reset the theme.
// function Login(props) {
//     return <Typography variant="body2" color="text.secondary" alian="center" {...props}></Typography>;
// }
function Login(props) {
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {!props.register.register ? (
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="text"
                                id="ID"
                                // label="ID"
                                // name="ID"
                                value={props.inputs.userId}
                                onChange={(e) => {
                                    props.setInputs({
                                        ...props.inputs,
                                        userId: e.target.value,
                                    });
                                }}
                                placeholder="ID"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={props.inputs.userPw}
                                onChange={(e) => {
                                    props.setInputs({
                                        ...props.inputs,
                                        userPw: e.target.value,
                                    });
                                }}
                                name="password"
                                // label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder="PASSWORD"
                            />
                            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="기억하기" /> */}

                            <Grid container>
                                <Grid item xs>
                                    <Button
                                        variant="Text"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={() => {
                                            props.setRegister({
                                                ...props.register,
                                                userId: '',
                                                userNm: '',
                                                userPw: '',
                                                email: '',
                                                userTel: '',
                                                register: true,
                                            });
                                        }}
                                    >
                                        회원가입
                                    </Button>
                                </Grid>
                                <Grid item xs>
                                    <Button
                                        variant="Text"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={() => {
                                            props.setInputs({
                                                ...props.inputs,
                                                findId: true,
                                            });
                                        }}
                                    >
                                        아이디 찾기
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="Text"
                                        sx={{ mt: 2, mb: 2 }}
                                        onClick={() => {
                                            props.setInputs({
                                                ...props.inputs,
                                                findPw: true,
                                            });
                                        }}
                                    >
                                        비밀번호 찾기
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 0, mb: 2 }}
                                onClick={() => {
                                    props.LoginBtn();
                                }}
                            >
                                로그인
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Register inputs={props.register} setInputs={props.setRegister} RegisterBtn={props.RegisterBtn} />
                )}
                <Dialog
                    open={props.inputs.findId}
                    onClose={() => {
                        props.setInputs({
                            ...props.inputs,
                            findId: false,
                        });
                    }}
                    useSaveButton={false}
                    // fullScreen={Commons.IsMobile() ? true : false}
                    title="아이디 찾기"
                    children={<FindId />}
                />
                <Dialog
                    open={props.inputs.findPw}
                    onClose={() => {
                        props.setInputs({
                            ...props.inputs,
                            findPw: false,
                        });
                    }}
                    useSaveButton={false}
                    // fullScreen={Commons.IsMobile() ? true : false}
                    title="비밀번호 찾기"
                    children={<FindPw />}
                />

                {/* <Login sx={{ mt: 8, mb: 4 }}></Login> */}
            </Container>
        </ThemeProvider>
    );
}
export default Login;
