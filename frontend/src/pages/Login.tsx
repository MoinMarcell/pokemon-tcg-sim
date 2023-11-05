import {FormEvent, useState} from "react";

type LoginProps = {
    login: (username: string, password: string) => void;
}

export default function Login(props: Readonly<LoginProps>) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.login(username, password);
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password"/>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}