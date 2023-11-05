import "./LoginRegisterPage.css";
import Login from "./Login.tsx";
import Register from "./Register.tsx";

type LoginRegisterPageProps = {
    login: (username: string, password: string) => void;
}

export default function LoginRegisterPage(props: Readonly<LoginRegisterPageProps>){
    return (
        <main id="login-register-page">
            <div>
                <h1>Login</h1>
                <Login login={props.login} />
                <hr/>
                <h1>Register</h1>
                <Register />
            </div>
        </main>
    );
}