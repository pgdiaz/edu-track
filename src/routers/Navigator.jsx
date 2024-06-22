import NavBar from "../navbar/NavBar";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CalificacionesPage from "../pages/CalificacionesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useAuth } from "../security/AuthenticationProvider";
import LogoutPage from "../pages/LogoutPage";
import PrivateRoute from "./PrivateRoute";
import AdminPanelPage from "../pages/AdminPanelPage";

const outNavLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "login" },
    { title: "Register", path: "register" },
];

const inNavLinks = [
    { title: "Home", path: "/" },
    { title: "Logout", path: "logout" },
];

const adminNavLinks = [
    { title: "Admin Panel", path: "/panel" },
]

const wrapPrivateRoute = (element, isAuthorized) => {
    return (
        <PrivateRoute isAuthorized={isAuthorized}>
            {element}
        </PrivateRoute>
    );
};

const Navigator = () => {
    const { role, isLoggedIn } = useAuth();
    const isAuthorized = role === 'admin';
    const navLinks = isLoggedIn()
        ? isAuthorized ? [...adminNavLinks, ...inNavLinks] : inNavLinks
        : outNavLinks;

    return (
        <>
            <NavBar title="EduTrack" navLinks={navLinks} />
            <Container sx={{ mt: 5 }}>
                <Routes>
                    <Route path="/" element={<CalificacionesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/panel" element={wrapPrivateRoute(<AdminPanelPage />, isAuthorized)} />
                </Routes>
            </Container>
        </>
    );
}

export default Navigator;
