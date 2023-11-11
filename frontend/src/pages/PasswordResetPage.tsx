
import {useState} from "react";
import RequestPasswordReset from "../components/RequestPasswordReset.tsx";
import ResetPasswordForm from "../components/ResetPasswordForm.tsx";
import {useSearchParams} from "react-router-dom";

export default function PasswordResetPage() {
    const [urlSearchParams, _] = useSearchParams()
    const token = urlSearchParams.get("token")

    const [state, setState] = useState(token ? "reset" : "send")

    const onSend = () => {
        setState("done")
    }


    if (state === "send") {
        return <RequestPasswordReset onSend={onSend}/>
    }

    if (state === "done") {
        return <div>
            <h1>Check your mails</h1>
        </div>
    }

    if (state === "reset") {
        return <ResetPasswordForm/>
    }
}
