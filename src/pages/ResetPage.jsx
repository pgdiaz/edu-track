import { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState({
        id: "",
        message: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!emailValidation()) {
            return;
        }
        setError({ id: "", message: "" });
        setMessage('Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.');
    };

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

    return (
        <Container component="main" maxWidth="xs">
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
                    Restablecer Contraseña
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Solicitar Restablecimiento
                    </Button>
                    {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;
