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
function FindPw(props) {
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
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            id="ID"
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
                            type="text"
                            id="USERNM"
                            value={props.inputs.userNm}
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
                            type="text"
                            id="email"
                            value={props.inputs.email}
                            onChange={(e) => {
                                props.setInputs({
                                    ...props.inputs,
                                    email: e.target.value,
                                });
                            }}
                            placeholder="이메일"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            id="userTel"
                            value={props.inputs.userTel}
                            onChange={(e) => {
                                props.setInputs({
                                    ...props.inputs,
                                    userTel: e.target.value,
                                });
                            }}
                            placeholder="전화번호"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={() => {
                                props.FindPwBtn();
                            }}
                        >
                            비밀번호 찾기
                        </Button>
                    </Box>
                </Box>

                {/* <Login sx={{ mt: 8, mb: 4 }}></Login> */}
            </Container>
        </ThemeProvider>
    );
}
export default FindPw;
