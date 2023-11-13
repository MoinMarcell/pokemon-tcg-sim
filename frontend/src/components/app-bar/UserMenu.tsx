import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React from "react";
import {AppUser} from "../../App.tsx";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

type UserMenuProps = {
    handleCloseUserMenu: (link?: string) => void,
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void,
    openUserMenu: HTMLElement | null,
    appUser: AppUser | null | undefined,
    handleGetMe: () => void,
}

export default function UserMenu(props: Readonly<UserMenuProps>) {
    const navigate = useNavigate();

    function logout() {
        axios.get("/api/v1/auth/logout")
            .then(() => {
                toast.success("Successfully logged out!")
                props.handleGetMe();
                navigate("/")
            })
            .catch((error) => {
                toast.error("Something went wrong!")
                console.log(error)
            })
            .finally(() => props.handleCloseUserMenu());
    }

    return (
        <Box sx={{flexGrow: 0}}>
            {
                props.appUser ?
                    <Tooltip title="Open settings">
                        <IconButton onClick={props.handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar
                                alt={props.appUser?.username + " avatar"}>{props.appUser?.username.charAt(0)}</Avatar>
                        </IconButton>
                    </Tooltip> :
                    <>
                        <Button
                            onClick={() => navigate("/login")}
                            sx={{my: 2, color: 'white'}}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate("/register")}
                            sx={{my: 2, color: 'white'}}
                        >
                            Register
                        </Button>
                    </>
            }
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={props.openUserMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(props.openUserMenu)}
                onClose={() => props.handleCloseUserMenu}
            >
                <MenuItem onClick={() => props.handleCloseUserMenu("/")}>
                    <Typography textAlign="center">My favorite cards</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}