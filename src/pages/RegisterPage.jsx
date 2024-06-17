import { Box, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const { enqueueSnackbar } = useSnackbar();

    const emailValidation = (email) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(email);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError({
                error: true,
                message: "El email es obligatorio",
            });
            return;
        }
        if (!emailValidation(email.trim())) {
            setError({
                error: true,
                message: "El email no es valido",
            });
            return;
        }
        setError({
            error: false,
            message: "",
        });
        enqueueSnackbar("Registro realizado con exito", {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
    };

    return (
        <>
            <h1>Register</h1>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ display: { xs: "grid", sm: "block" }, gap: 2 }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Email"
                    variant="standard"
                    id="email"
                    type="email"
                    fullWidth
                    required
                    error={error.error}
                    helperText={error.message}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Registrarse
                </Button>
            </Box>
        </>);
}
