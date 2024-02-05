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
// TODO remove, this demo shouldn't need to reset the theme.
// function Login(props) {
//     return <Typography variant="body2" color="text.secondary" alian="center" {...props}></Typography>;
// }
function Register(props) {
    const defaultTheme = createTheme();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        회원가입
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
                            value={props.setInputs.userId}
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
                            type="text"
                            id="NAME"
                            // label="ID"
                            // name="ID"
                            value={props.setInputs.userNm}
                            onChange={(e) => {
                                props.setInputs({
                                    ...props.inputs,
                                    userNm: e.target.value,
                                });
                            }}
                            placeholder="이름"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={props.setInputs.userPw}
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={props.inputs.email}
                            onChange={(e) => {
                                props.setInputs({
                                    ...props.inputs,
                                    email: e.target.value,
                                });
                            }}
                            name="email"
                            id="email"
                            placeholder="이메일"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={props.inputs.userTel}
                            onChange={(e) => {
                                props.setInputs({
                                    ...props.inputs,
                                    userTel: e.target.value,
                                });
                            }}
                            name="userTel"
                            id="userTel"
                            placeholder="전화번호"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 0, mb: 2 }}
                            onClick={() => {
                                props.RegisterBtn();
                            }}
                        >
                            회원가입
                        </Button>
                    </Box>
                </Box>

                {/* <Login sx={{ mt: 8, mb: 4 }}></Login> */}
            </Container>
        </ThemeProvider>
    );
}
export default Register;
