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
        <div className="uk-flex uk-flex-center uk-flex-middle uk-height-1-1">
            <div className="uk-card uk-card-secondary uk-card-body">
                <h3 className="uk-card-title uk-text-center">Thank you for you
                    registration, {props.appUser.username}!</h3>
                <p className="uk-text-center">The Beta will start soon!</p>
                <button onClick={logout} className="uk-button uk-button-primary uk-width-1-1">Logout</button>
            </div>
        </div>
    )
}