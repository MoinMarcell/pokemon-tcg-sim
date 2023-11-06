import {AppUserRequest} from "../models/AppUserRequest.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [appUserRequest, setAppUserRequest] = useState<AppUserRequest>({
        username: "",
        password: "",
        email: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setAppUserRequest({
            ...appUserRequest,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post("/api/v1/users/register", appUserRequest)
            .then(() => {
                navigate("/success");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="uk-inline uk-width-1-1">
                    <label htmlFor="username"/>
                    <Link to="" className="uk-form-icon" uk-icon="icon: user"></Link>
                    <input
                        className="uk-input uk-margin"
                        type="text"
                        id="username-register"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={appUserRequest.username}
                    />
                </div>
            </div>

            <div>
                <div className="uk-inline uk-width-1-1">
                    <label htmlFor="password"/>
                    <Link to="" className="uk-form-icon" uk-icon="icon: lock"></Link>
                    <input
                        className="uk-input uk-margin"
                        type="password"
                        id="password-register"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={appUserRequest.password}
                    />
                </div>
            </div>

            <div>
                <div className="uk-inline uk-width-1-1">
                    <label htmlFor="email"/>
                    <Link to="" className="uk-form-icon" uk-icon="icon: mail"></Link>
                    <input
                        className="uk-input uk-margin"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={appUserRequest.email}
                    />
                </div>
            </div>

            <div>
                <div className="uk-inline uk-width-1-1">
                    <input type="submit" value="Register" className="uk-button uk-button-primary uk-width-1-1"/>
                </div>
            </div>
        </form>
    );
}