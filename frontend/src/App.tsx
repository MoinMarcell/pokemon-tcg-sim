import {useEffect, useState} from "react";
import {AppUser} from "./models/AppUser.ts";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoutes from "./util/ProtectedRoutes.tsx";
import PreRegistrationSuccess from "./protected/PreRegistrationSuccess.tsx";
import LoginRegisterPage from "./pages/LoginRegisterPage.tsx";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import AvailableCards from "./protected/AvailableCards.tsx";
import FavoriteCards from "./protected/FavoriteCards.tsx";

export default function App() {
    const [appUser, setAppUser] = useState<AppUser | undefined>(undefined);

    const navigate = useNavigate();

    function login(username: string, password: string) {
        axios.post("/api/v1/auth/login", {}, {
            auth: {
                username: username,
                password: password
            }
        }).then((response) => {
            setAppUser(response.data);
            navigate("/success");
            toast.success("Welcome back, " + username + "!");
        }).catch((e) => {
            if (e.response.status == 401) {
                toast.error("Invalid username or password.")
            } else {
                toast.error("Something went wrong. Try again later.")
            }
            navigate("/");
        })
    }

    useEffect(() => {
        axios.get("/api/v1/auth/me")
            .then((response) => {
                setAppUser(response.data);
            })
            .catch(() => {
                navigate("/");
            });
    }, [navigate]);

    if (!appUser) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Routes>
                <Route path={"/"} element={<LoginRegisterPage appUser={appUser} login={login}/>}/>
                <Route element={<ProtectedRoutes appUser={appUser}/>}>
                    <Route path={"/success"} element={<PreRegistrationSuccess appUser={appUser}/>}/>
                    <Route path={"/cards"} element={<AvailableCards/>}/>
                    <Route path={"/users/:username/favorites"} element={<FavoriteCards appUser={appUser}/>}/>
                </Route>
            </Routes>
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
