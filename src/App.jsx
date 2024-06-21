import { Container } from "@mui/material"
import NavBar from "./navbar/NavBar"
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from "react-router-dom";
import CalificacionesPage from "./pages/CalificacionesPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Temp from "./tmp/Temp";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Admin", path: "admin" },
  { title: "Login", path: "login" },
  { title: "Register", path: "register" },
];

function App() {
  // TODO: Remove demo
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}>
      <NavBar title="EduTrack" navLinks={navLinks} />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<CalificacionesPage />} />
          <Route path="/admin" element={<Temp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </SnackbarProvider>
  )
}

export default App
