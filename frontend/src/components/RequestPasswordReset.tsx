import {Box, Button, Container, InputAdornment, TextField} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {FormEvent, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

type Props = {
    onSend: () => void
}
export default function RequestPasswordReset(props: Props) {

    const [email, setEmail] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        axios.post("/api/v1/users/password/send/reset", {email})
            .then(() => {
                toast.success("Password Reset Email Send")
                props.onSend()
            })
            .catch(() => {
                toast.error("Unkown Error")
            })
    }

    return  <Container
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
            <TextField
                required
                autoComplete={"email"}
                label="Email"
                id="password-reset-email"
                sx={{
                    width: '25ch',
                }}
                onChange={(event) => setEmail(event.target.value)}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <PersonIcon/>
                        </InputAdornment>,
                }}
                variant="standard"
            />
            <Button type={"submit"} variant={"contained"} sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
            }}>
                Reset
            </Button>
        </Box>
    </Container>
}
