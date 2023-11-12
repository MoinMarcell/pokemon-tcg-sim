import {AppUser} from "../models/AppUser.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Box, Button, Container, Typography} from "@mui/material";

type PreRegistrationSuccessProps = {
    appUser: AppUser;
}

export default function PreRegistrationSuccess(props: Readonly<PreRegistrationSuccessProps>) {
    const navigate = useNavigate();

    function logout() {
        axios.post("/api/v1/auth/logout").then(() => {
            toast.success("Logout successful!");
            navigate("/")
        }).catch(() => {
            toast.error("Logout failed!");
            navigate("/")
        });
    }

    return (
        <Container
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
            <Typography variant={"h3"}>
                Thank you for registration, {props.appUser.username}!
            </Typography>
            <Typography paragraph>The Beta will start soon!</Typography>
            <Button onClick={logout} variant={"contained"} sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                width: "100%",
            }}>
                Logout
            </Button>
            <Box component={"div"} sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 2,
                m: 1,
            }}>
                <Button onClick={() => navigate("/cards")} variant={"contained"} sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    color: "black",
                    width: "100%",
                }}>
                    Available cards
                </Button>
                <Button onClick={() => navigate(`/users/${props.appUser.username}/favorites`)} variant={"contained"}
                        sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            color: "black",
                            width: "100%",
                        }}>
                    My favorite cards
                </Button>
            </Box>
        </Container>
    )
}