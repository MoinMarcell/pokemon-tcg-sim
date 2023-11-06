import "./LoginRegisterPage.css";
import Login from "../components/Login.tsx";
import Register from "../components/Register.tsx";

type LoginRegisterPageProps = {
    login: (username: string, password: string) => void;
}

export default function LoginRegisterPage(props: LoginRegisterPageProps) {
    return (
        <main className="uk-container-expand uk-flex uk-flex-middle uk-flex-center uk-height-1-1">
            <div
                className="uk-background-secondary uk-card uk-card-default uk-card-body uk-width-1-2 uk-box-shadow-xlarge uk-border-rounded">
                <h3 className="uk-card-title uk-text-primary">Login</h3>
                <Login login={props.login}/>
                <h3 className="uk-heading-line uk-text-center uk-text-primary"><span>or</span></h3>
                <h3 className="uk-card-title uk-text-primary uk-margin-remove">Register</h3>
                <Register/>
            </div>
        </main>
    );
}