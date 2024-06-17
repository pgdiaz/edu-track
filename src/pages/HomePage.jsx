import { Button, Typography } from "@mui/material";

export default function HomePage() {
    return (
        <>
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
        </>);
}
