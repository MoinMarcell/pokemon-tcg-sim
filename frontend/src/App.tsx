import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import ResponsiveAppBar from "./components/app-bar/ResponsiveAppBar.tsx";
import Box from "@mui/material/Box";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Home from "./pages/Home.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {

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
                    <ResponsiveAppBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
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
