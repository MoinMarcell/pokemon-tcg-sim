import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";

type MobileMenuProps = {
    handleCloseNavMenu: (link?: string) => void,
    handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void,
    openMobileMenu: HTMLElement | null,
}

export default function MobileMenu(props: Readonly<MobileMenuProps>) {
    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={props.openMobileMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(props.openMobileMenu)}
                onClose={() => props.handleCloseNavMenu()}
                sx={{
                    display: {xs: 'block', md: 'none'},
                }}
            >
                <MenuItem onClick={() => props.handleCloseNavMenu("/")}>
                    <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={() => props.handleCloseNavMenu("/cards")}>
                    <Typography textAlign="center">Cards</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}