import { Alert, AlertTitle, Box, Button, Collapse } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState } from "react";

export default function LoginPage() {
    const [open, setOpen] = useState(true);

    return (
        <>
            <h1>Login</h1>
            <Box sx={{ display: "grid", gap: 2 }}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Esta es una alerta
                </Alert>
                <Alert
                    severity="warning"
                    icon={<AutorenewIcon fontSize="inherit" />}
                >
                    This is a warning alert — check it out!
                </Alert>
                <Collapse in={open}>
                    <Alert
                        severity="info"
                        onClose={() => {
                            setOpen(false);
                        }}
                    >
                        This is an info alert — check it out!
                    </Alert>
                </Collapse>
                <Alert severity="success" variant="outlined">This is a success alert — check it out!</Alert>
            </Box>

        </>);
}
