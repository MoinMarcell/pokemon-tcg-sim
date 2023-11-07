import {AppUserRequest} from "../models/AppUserRequest.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {CustomError} from "../models/CustomError.ts";

export default function Register() {
    const navigate = useNavigate();

    const [appUserRequest, setAppUserRequest] = useState<AppUserRequest>({
        username: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState<CustomError | undefined>(undefined);

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
                toast.success("Registration successful! You can now log in.");
                navigate("/success");
            })
            .catch((e) => {
                setError(e.response.data)
                if(error?.email) {
                    toast.error(error.email);
                }
                if(error?.username) {
                    toast.error(error.username);
                }
                if(error?.password) {
                    toast.error(error.password);
                }
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
                        autoComplete="new-username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
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
                        autoComplete="new-password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
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
                        autoComplete="new-email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
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