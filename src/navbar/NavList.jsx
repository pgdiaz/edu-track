import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NavList({ onClick, navLinks }) {
    return (
        <Box
            sx={{ width: 250 }}
            onClick={onClick}
        >
            <nav aria-label="main mailbox folders">
                <List>
                    {navLinks.map((item) => (
                        <ListItem
                            disablePadding
                            key={item.title}
                        >
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                            >
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
            <Divider />
        </Box>
    );
}
