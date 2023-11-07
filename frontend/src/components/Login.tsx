import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";

type LoginProps = {
    login: (username: string, password: string) => void;
}

export default function Login(props: Readonly<LoginProps>) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.login(username, password);
        setPassword("");
        setUsername("");
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
                        id="username-login"
                        name="username"
                        autoComplete="current-username"
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div className="uk-inline uk-width-1-1">
                    <label htmlFor="password"/>
                    <Link to="" className="uk-form-icon" uk-icon="icon: lock"></Link>
                    <input
                        className="uk-input uk-width-1-1 uk-margin"
                        type="password"
                        id="password-login"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div className="uk-inline uk-width-1-1">
                    <input type="submit" value="Login" className="uk-button uk-button-primary uk-width-1-1"/>
                </div>
            </div>
        </form>
    );
}