import { Button, Container, Typography } from "@mui/material"
import NavBar from "./navbar/NavBar"

function App() {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h2"
          component="h1"
          m={2}
          color="secondary"
          align="center"
          pb={2}>
          EduTrack with Material UI
        </Typography>
        <Button variant="outlined">Getting Started</Button>
      </Container>
    </>
  )
}

export default App
