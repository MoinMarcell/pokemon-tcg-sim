import Box from "@mui/material/Box";
import {CircularProgress, InputAdornment, TextField} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, {FormEvent, useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {toast} from "react-toastify";
import {AppUser} from "../../App.tsx";
import {Link, Navigate, useNavigate} from "react-router-dom";

type LoginProps = {
    appUser: AppUser | null | undefined,
    handleGetMe: () => void,
}

export default function Login(props: Readonly<LoginProps>) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userExists, setUserExists] = useState(true);

    if (props.appUser) {
        toast.error("You are already logged in!")
        return <Navigate to={"/"}/>;
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function checkUsernameAlreadyExists(event: React.FocusEvent<HTMLInputElement>) {
        event.preventDefault();
        if (username.length > 2) {
            setIsLoading(true)
            axios.get("/api/v1/users/check-user?username=" + username)
                .then((r) => setUserExists(r.data))
                .catch((e) => console.log(e))
                .finally(() => setIsLoading(false));
        }
    }

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        axios.post("/api/v1/auth/login", {}, {
            auth: {
                username: username,
                password: password
            }
        }).then((response) => {
            const data = response.data;
            toast.success("Welcome back, " + data.username + "!");
            navigate("/")
            props.handleGetMe();
        }).catch((error) => {
            if (error.response.status === 401) {
                toast.error("Incorrect username or password!");
            } else {
                toast.error("Something went wrong!");
            }
        }).finally(() => {
            setIsLoading(false);
            setPassword("");
            setUsername("");
        });
    }

    return (
        <Box onSubmit={handleLogin} component="form" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: '1rem',
            padding: 1,
        }}>
            <TextField
                label="Username"
                id="login-username"
                error={!userExists}
                value={username}
                onBlur={checkUsernameAlreadyExists}
                helperText={
                    !userExists && (
                        <>
                            Username does not exist! You may want to{' '}
                            <Link to="/register">Register</Link> first.
                        </>
                    )
                }
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="login-username"
                sx={{m: 1, width: '100%'}}
                InputProps={{
                    startAdornment: <InputAdornment
                        position="start"><IconButton><PersonIcon/></IconButton></InputAdornment>,
                    endAdornment: isLoading &&
                        <InputAdornment position="start"><CircularProgress size={20}/></InputAdornment>
                }}
            />
            <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="login-password"
                sx={{m: 1, width: '100%'}}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <IconButton onClick={handleClickShowPassword}>
                                {
                                    showPassword
                                        ? <VisibilityOffIcon/>
                                        : <VisibilityIcon/>
                                }
                            </IconButton>
                        </InputAdornment>,
                }}
            />
            {
                isLoading ?
                    <Button color="primary" sx={{width: '100%'}} disabled>
                        Logging in...<CircularProgress size={15} sx={{ml: 1}}/>
                    </Button> :
                    <Button
                        type="submit"
                        color="primary"
                        sx={{width: '100%'}}
                        disabled={username.length < 3 || password.length < 8 || !userExists}
                    >
                        Login
                    </Button>
            }
        </Box>
    );
}