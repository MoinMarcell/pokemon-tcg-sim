import {Box, Chip, Container, Divider} from "@mui/material";
import Login from "../components/Login.tsx";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Register from "../components/Register.tsx";

type LoginRegisterPageProps = {
    login: (username: string, password: string) => void;
}

export default function LoginRegisterPage(props: Readonly<LoginRegisterPageProps>) {
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
            <Box>
                <Box>
                    <Login login={props.login}/>
                </Box>
                <Divider variant="fullWidth" sx={{
                    color: "black",
                }}>
                    <Chip icon={<ArrowDownwardIcon/>} label={<ArrowUpwardIcon/>}/>
                </Divider>
                <Box>
                    <Register/>
                </Box>
            </Box>
        </Container>
    );
}