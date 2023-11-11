import React, {FormEvent, useState} from "react";
import {Box, Button, Container, FormControl, IconButton, Input, InputAdornment, InputLabel,} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function ResetPasswordForm() {

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [showPassword, setShowPassword] = React.useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

    const navigate = useNavigate()

    const [urlSearchParams, _] = useSearchParams()
    const token = urlSearchParams.get("token")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (password === repeatPassword) {
            axios.post("/api/v1/users/password/reset", {token, password}).then(() => {
                toast.success("Password reset successful!")
                navigate("/")
            })
                .catch(() => {
                    toast.error("Something went wrong. Try again later.")
                })
        }
    }

    return <Container
        maxWidth={"lg"}
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "25px",
            padding: "10px"
        }}
    >
        <Box component={"form"}
             sx={{
                 margin: "10px",
                 display: "flex",
                 flexDirection: "column",
                 gap: 2,
             }}
             onSubmit={handleSubmit}>
            <FormControl sx={{width: '25ch'}} variant="standard">
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <Input
                    required
                    value={password}
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
                                onClick={() => setShowPassword((show) => !show)}
                                onMouseDown={e => e.preventDefault()}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{width: '25ch'}} variant="standard">
                <InputLabel htmlFor="login-password">Password</InputLabel>
                <Input
                    required
                    value={repeatPassword}
                    autoComplete={"current-password"}
                    onChange={(event) => setRepeatPassword(event.target.value)}
                    id="login-password"
                    type={showRepeatPassword ? 'text' : 'password'}
                    startAdornment={
                        <InputAdornment position="start">
                            <PasswordIcon/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowRepeatPassword((show) => !show)}
                                onMouseDown={e => e.preventDefault()}
                            >
                                {showRepeatPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button type={"submit"} variant={"contained"} sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
            }}>
                Reset
            </Button>
        </Box>
    </Container>
}
