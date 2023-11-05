import {AppUser} from "../models/AppUser.ts";
import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    appUser: AppUser | undefined;
}
export default function ProtectedRoutes(props: ProtectedRoutesProps) {
    const isLoggedIn: boolean = props.appUser !== undefined;
    return (
        isLoggedIn ? <Outlet/> : <Navigate to={"/"}/>
    );
}