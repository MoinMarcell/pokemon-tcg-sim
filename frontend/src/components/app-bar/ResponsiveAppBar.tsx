import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import UserMenu from "./UserMenu.tsx";
import MobileMenu from "./MobileMenu.tsx";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../../App.tsx";

type ResponsiveAppBarProps = {
    appUser: AppUser | null | undefined,
    handleGetMe: () => void,
}

export default function ResponsiveAppBar(props: Readonly<ResponsiveAppBarProps>) {
    const navigate = useNavigate();
    const [openMobileMenu, setOpenMobileMenu] = useState<null | HTMLElement>(null);
    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMobileMenu(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenUserMenu(event.currentTarget);
    };

    const handleCloseNavMenu = (link?: string) => {
        setOpenMobileMenu(null);
        navigate(link ?? "/");
    };

    const handleCloseUserMenu = (link?: string) => {
        setOpenUserMenu(null);
        navigate(link ?? "/");
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CatchingPokemonIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TCG Sim
                    </Typography>

                    <MobileMenu
                        handleCloseNavMenu={handleCloseNavMenu}
                        handleOpenNavMenu={handleOpenNavMenu}
                        openMobileMenu={openMobileMenu}
                    />
                    <CatchingPokemonIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TCG Sim
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={() => handleCloseNavMenu("/")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => handleCloseNavMenu("/cards")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Cards
                        </Button>
                    </Box>
                    <UserMenu
                        handleCloseUserMenu={handleCloseUserMenu}
                        handleOpenUserMenu={handleOpenUserMenu}
                        openUserMenu={openUserMenu}
                        appUser={props.appUser}
                        handleGetMe={props.handleGetMe}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}