import { Box, Typography } from "@mui/material";
import CalificacionesTable from "../calificaciones/CalificacionesTable";

export default function CalificacionesPage() {
    return (
        <>
            <Box sx={{ display: "grid", gap: 2 }} pb={2}>
                <Typography
                    variant="h2"
                    component="h1"
                    m={2}
                    color="secondary"
                    align="center"
                    pb={2}>
                    Calificaciones
                </Typography>
            </Box>
            <CalificacionesTable />
        </>
    );
}
