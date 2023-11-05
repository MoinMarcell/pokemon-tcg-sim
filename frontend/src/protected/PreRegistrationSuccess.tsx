import {AppUser} from "../models/AppUser.ts";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

type PreRegistrationSuccessProps = {
    appUser: AppUser | undefined;
}

export default function PreRegistrationSuccess(props: Readonly<PreRegistrationSuccessProps>) {
    const navigate = useNavigate();
    if (!props.appUser) return <Navigate to={"/"}/>

    function logout() {
        axios.post("/api/v1/auth/logout").then(() => {
            navigate("/")
        }).catch(() => {
            navigate("/")
        });
    }

    return (
        <>
            <h3>Thank you for you registration, {props.appUser.username}!</h3>
            <p>The Beta will start soon!</p>
            <button onClick={logout}>Logout</button>
        </>
    )
}