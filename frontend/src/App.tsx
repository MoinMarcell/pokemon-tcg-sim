import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import ResponsiveAppBar from "./components/app-bar/ResponsiveAppBar.tsx";
import Box from "@mui/material/Box";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Home from "./pages/Home.tsx";
import Login from "./components/login/Login.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Register from "./components/login/Register.tsx";
import PokemonCards from "./pages/PokemonCards.tsx";
import PokeballLoadSpinner from "./components/PokeballLoadSpinner.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    function getMe() {
        setIsLoading(true)
        axios.get("/api/v1/auth/me")
            .then((response) => {
                setAppUser(response.data);
            })
            .catch(() => {
                setAppUser(null)
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        getMe();
    }, []);

    if (isLoading) return <PokeballLoadSpinner/>;

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    width: '100vw',
                    padding: 0,
                    margin: 0,
                    gap: 2,
                }}>
                    <ResponsiveAppBar handleGetMe={getMe} appUser={appUser}/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login handleGetMe={getMe} appUser={appUser}/>}/>
                        <Route path="/register" element={<Register appUser={appUser}/>}/>
                        <Route path="/cards" element={<PokemonCards appUser={appUser} isLoading={isLoading}/>}/>
                    </Routes>
                </Box>
            </ThemeProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export type AppUser = {
    id: string,
    username: string,
    email: string,
    role: string,
    registrationDate: string,
    favoritePokemonCardIds: string[],
}
