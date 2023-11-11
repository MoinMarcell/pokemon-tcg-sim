import React, {FormEvent, useState} from "react";
import {Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import {Link} from "react-router-dom";

type LoginProps = {
    login: (username: string, password: string) => void;
}

export default function Login(props: Readonly<LoginProps>) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.login(username, password);
        setPassword("");
        setUsername("");
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit}>
            <Box component={"div"} sx={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                <TextField
                    required
                    autoComplete={"current-username"}
                    label="Username"
                    id="login-username"
                    sx={{
                        width: '25ch',
                    }}
                    onChange={(event) => setUsername(event.target.value)}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <PersonIcon/>
                            </InputAdornment>,
                    }}
                    variant="standard"
                />
                <FormControl sx={{width: '25ch'}} variant="standard">
                    <InputLabel htmlFor="login-password">Password</InputLabel>
                    <Input
                        required
                        autoComplete={"current-password"}
                        onChange={(event) => setPassword(event.target.value)}
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        startAdornment={
                            <InputAdornment position="start">
                                <PasswordIcon/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button type={"submit"} variant={"contained"} sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "black",
                }}>
                    Login
                </Button>
                <Link to="/reset-password">Reset Password</Link>
            </Box>
        </Box>
    );
}
