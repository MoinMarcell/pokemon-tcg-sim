import {AppUserRequest} from "../models/AppUserRequest.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"/>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={appUserRequest.username}
                />
                <label htmlFor="password"/>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={appUserRequest.password}
                />
                <label htmlFor="email"/>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={appUserRequest.email}
                />
                <input type="submit" value="Register"/>
            </form>
        </div>
    );
}