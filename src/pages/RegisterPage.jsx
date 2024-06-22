import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { register } from "../api/apiUsuarios";

export default function RegisterPage() {
    const [lastnames, setLastnames] = useState("");
    const [names, setNames] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [error, setError] = useState({
        id: "",
        message: "",
    });
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

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
        if (!cpassword.trim()) {
            return !!setError({ id: "cpassword", message: "El campo es obligatorio" });
        }
        if (password !== cpassword) {
            return !!setError({ id: "password", message: "Las contraseñas no coinciden" });
        }
        if (password.length < 8) {
            return !!setError({ id: "password", message: "La contraseña debe tener al menos 8 caracteres" });
        }
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(password)) {
            return !!setError({ id: "password", message: "La contraseña no cumple con los requisitos" });
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!lastnames.trim()) {
            return !!setError({ id: "lastnames", message: "El campo es obligatorio" });
        }
        if (!names.trim()) {
            return !!setError({ id: "names", message: "El campo es obligatorio" });
        }
        if (!emailValidation()) {
            return;
        }
        if (!passwordValidation()) {
            return;
        }
        try {
            await register({ lastnames, names, email, password });
            enqueueSnackbar("Su solicitud fue enviada", {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });
            navigate('/login');
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
        <Container component="main" maxWidth="md">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Solicitar registro de usuario
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: { xs: "grid", sm: "block" }, gap: 2 }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Apellidos"
                        variant="standard"
                        id="lastnames"
                        fullWidth
                        required
                        error={error.id === "lastnames"}
                        helperText={error.id === "lastnames" ? error.message : ""}
                        onChange={(e) => setLastnames(e.target.value)}
                        value={lastnames}
                        margin="normal"
                        autoComplete="new-lastnames"
                    />
                    <TextField
                        label="Nombres"
                        variant="standard"
                        id="names"
                        fullWidth
                        required
                        error={error.id === "names"}
                        helperText={error.id === "names" ? error.message : ""}
                        onChange={(e) => setNames(e.target.value)}
                        value={names}
                        margin="normal"
                        autoComplete="new-names"
                    />
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
                    <TextField
                        label="Confirmar Contraseña"
                        variant="standard"
                        id="cpassword"
                        type="password"
                        fullWidth
                        required
                        error={error.id === "cpassword"}
                        helperText={error.id === "cpassword" ? error.message : ""}
                        onChange={(e) => setCPassword(e.target.value)}
                        value={cpassword}
                        margin="normal"
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </Container>);
}
