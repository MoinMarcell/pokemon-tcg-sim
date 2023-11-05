import {useEffect, useState} from "react";
import {AppUser} from "./models/AppUser.ts";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoutes from "./util/ProtectedRoutes.tsx";
import Login from "./pages/Login.tsx";
import PreRegistrationSuccess from "./protected/PreRegistrationSuccess.tsx";
import Register from "./pages/Register.tsx";

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
        }).catch((error) => {
            console.log(error);
            navigate("/");
        })
    }

    useEffect(() => {
        axios.get("/api/v1/auth/me").then((response) => {
            setAppUser(response.data);
            navigate("/success");
        }).catch((error) => {
            console.log(error);
            navigate("/");
        });
    }, [navigate]);

    return (
        <>
            <h3>Welcome to the Pokémon TCG Sim</h3>
            <Routes>
                <Route path={"/"} element={<><Login login={login}/><Register/></>}/>
                <Route element={<ProtectedRoutes appUser={appUser}/>}>
                    <Route path={"/success"} element={<PreRegistrationSuccess appUser={appUser}/>}/>
                </Route>
            </Routes>
        </>
    )
}
