import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NavList from "./NavList";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ navLinks }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        edge="start"
                        aria-label="menu"
                        onClick={() => setOpen(true)}
                        sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                    >
                        EduTrack
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        {navLinks.map((link) => (
                            <Button
                                key={link.title}
                                sx={{ color: "#fff" }}
                                component={NavLink}
                                to={link.path}
                            >
                                {link.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: { xs: "flex", sm: "none" } }}
            >
                <NavList
                    onClick={() => setOpen(false)}
                    navLinks={navLinks}
                />
            </Drawer>
        </>
    );
}
