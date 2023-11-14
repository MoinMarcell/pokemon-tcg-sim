import {CircularProgress, InputAdornment, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from '@mui/icons-material/Email';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {Navigate, useNavigate} from "react-router-dom";
import {AppUser} from "../../App.tsx";
import axios from "axios";

type RegisterProps = {
    appUser: AppUser | null | undefined,
}

export default function Register(props: Readonly<RegisterProps>) {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isUsernameAlreadyExists, setIsUsernameAlreadyExists] = useState(false);
    const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState(false);

    if (props.appUser) {
        toast.error("You are already registered!")
        return <Navigate to={"/"}/>;
    }

    function checkUsernameAlreadyExists(event: React.FocusEvent<HTMLInputElement>) {
        event.preventDefault();
        if (username.length > 2) {
            setIsLoading(true)
            axios.get("/api/v1/users/check-user?username=" + username)
                .then((r) => setIsUsernameAlreadyExists(r.data))
                .catch((e) => console.log(e))
                .finally(() => setIsLoading(false));
        }
    }

    function checkEmailAlreadyExists(event: React.FocusEvent<HTMLInputElement>) {
        event.preventDefault();
        if (email.includes("@") && email.includes(".")) {
            setIsLoading(true)
            axios.get("/api/v1/users/check-user?email=" + email)
                .then((r) => setIsEmailAlreadyExists(r.data))
                .catch((e) => console.log(e))
                .finally(() => setIsLoading(false));
        }
    }

    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true)
        axios.post("/api/v1/users/register", {
            username: username,
            password: password,
            email: email,
        }).then(() => {
            toast.success("Successfully registered! You can now login.")
            navigate("/login")
        }).catch((error) => {
            toast.error(error.response.data)
            setIsError(true)
        }).finally(() => {
            setIsLoading(false);
            setPassword("");
            setUsername("");
            setEmail("");
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    return (
        <Box
            onSubmit={handleRegister}
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: '1rem',
                padding: 1,
            }}
            noValidate={false}
            autoComplete="off"
        >
            <TextField
                error={isError || isUsernameAlreadyExists}
                label="Username"
                id="register-username"
                value={username}
                onBlur={checkUsernameAlreadyExists}
                helperText={isUsernameAlreadyExists && "Username already exists!"}
                required
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="register-username"
                sx={{m: 1, width: '100%'}}
                InputProps={{
                    startAdornment: <InputAdornment
                        position="start"><IconButton><PersonIcon/></IconButton></InputAdornment>,
                    endAdornment: isLoading &&
                        <InputAdornment position="start"><CircularProgress size={20}/></InputAdornment>
                }}
            />
            <TextField
                error={isError}
                label="Password"
                helperText="Password must be at least 8 characters long and include at least one number."
                type={showPassword ? 'text' : 'password'}
                id="register-password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="register-password"
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
            <TextField
                error={isError || isEmailAlreadyExists}
                helperText={isEmailAlreadyExists && "Email already exists!"}
                label="Email"
                id="register-email"
                value={email}
                onBlur={checkEmailAlreadyExists}
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="register-email"
                sx={{m: 1, width: '100%'}}
                InputProps={{
                    startAdornment: <InputAdornment
                        position="start"><IconButton><EmailIcon/></IconButton></InputAdornment>,
                    endAdornment: isLoading &&
                        <InputAdornment position="start"><CircularProgress size={20}/></InputAdornment>
                }}
            />
            {
                isLoading ?
                    <Button color="primary" sx={{width: '100%'}} disabled>
                        Registering...<CircularProgress size={15} sx={{ml: 1}}/>
                    </Button> :
                    <Button type="submit" color="primary" sx={{width: '100%'}}
                            disabled={isError || isEmailAlreadyExists || isUsernameAlreadyExists || username.length < 3 || !email.includes('@') || !email.includes('.') || password.length < 8}>Register</Button>
            }
        </Box>
    );
}