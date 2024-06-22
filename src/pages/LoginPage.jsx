import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { login } from "../api/apiUsuarios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({
        id: "",
        message: "",
    });
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const emailValidation = () => {
        if (!email.trim()) {
            return !!setError({ id: "email", message: "El campo es obligatorio" });
        }
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!regex.test(email)) {
            return !!setError({ id: "email", message: "El correo electrónico no es valido" });
        }
        return true;
    };

    const passwordValidation = () => {
        if (!password.trim()) {
            return !!setError({ id: "password", message: "El campo es obligatorio" });
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailValidation()) {
            return;
        }
        if (!passwordValidation()) {
            return;
        }
        try {
            await login({ email, password });
            enqueueSnackbar("Login exitoso", {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
            navigate('/');
        } catch (error) {
            enqueueSnackbar(error.message ?? "Ocurrio un error al procesar su solicitud", {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
        }
    };

    return (
        <Container component="main" maxWidth="l">
            <Box
                sx={{
                    ml: 0,
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: { xs: '60%', sm: '60%', md: '80%', lg: '100%', xl: '100%' }
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate autoComplete="off">
                    <TextField
                        label="Correo Electrónico"
                        variant="standard"
                        id="email"
                        type="email"
                        fullWidth
                        required
                        error={error.id === "email"}
                        helperText={error.id === "email" ? error.message : ""}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        margin="normal"
                        autoComplete="new-email"
                    />
                    <TextField
                        label="Contraseña"
                        variant="standard"
                        id="password"
                        type="password"
                        fullWidth
                        required
                        error={error.id === "password"}
                        helperText={error.id === "password" ? error.message : ""}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        margin="normal"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
