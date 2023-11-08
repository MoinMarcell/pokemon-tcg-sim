import {AppUserRequest} from "../models/AppUserRequest.tsx";
import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from '@mui/icons-material/Email';
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function Register() {
    const navigate = useNavigate();

    const [appUserRequest, setAppUserRequest] = useState<AppUserRequest>({
        username: "",
        password: "",
        email: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setAppUserRequest({
            ...appUserRequest,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/v1/users/register", appUserRequest)
            .then(() => {
                toast.success("Registration successful! You can now log in.");
                navigate("/success");
            })
            .catch((e) => {
                if (e.response.status == 400) {
                    toast.error("Username or Email already taken.")
                } else {
                    toast.error("Something went wrong. Try again later.")
                }
            });
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
                    autoComplete={"new-username"}
                    label="Username"
                    id="register-username"
                    name="username"
                    sx={{
                        width: '25ch',
                    }}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <PersonIcon/>
                            </InputAdornment>,
                    }}
                    variant="standard"
                />
                <FormControl sx={{width: '25ch'}} variant="standard">
                    <InputLabel htmlFor="register-password">Password</InputLabel>
                    <Input
                        required
                        autoComplete={"new-password"}
                        onChange={handleChange}
                        name={"password"}
                        id="register-password"
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
                <TextField
                    required
                    autoComplete={"new-email"}
                    label="Email"
                    id="register-email"
                    name="email"
                    sx={{
                        width: '25ch',
                    }}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">
                                <EmailIcon/>
                            </InputAdornment>,
                    }}
                    variant="standard"
                />
                <Button type={"submit"} variant={"contained"} sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "black",
                }}>
                    Register
                </Button>
            </Box>
        </Box>
    );
}