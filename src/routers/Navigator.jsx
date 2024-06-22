import NavBar from "../navbar/NavBar";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CalificacionesPage from "../pages/CalificacionesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../security/AuthenticationProvider";
import LogoutPage from "../pages/LogoutPage";

const navLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "login" },
    { title: "Register", path: "register" },
];

const loggedNavLinks = [
    { title: "Home", path: "/" },
    { title: "Logout", path: "logout" },
];

const Navigator = () => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            <NavBar title="EduTrack" navLinks={isLoggedIn() ? loggedNavLinks : navLinks} />
            <Container sx={{ mt: 5 }}>
                <Routes>
                    <Route path="/" element={<CalificacionesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                </Routes>
            </Container>
        </>
    );
}

export default Navigator;
