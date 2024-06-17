import { Box, Button, Typography } from "@mui/material";
import DataTable from "../datagrid/DataTable";
import { DatableProvider } from "../datagrid/DatableContext";

export default function HomePage() {
    return (
        <DatableProvider>
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
                <Box
                    component="span"
                    sx={
                        {
                            display: { xs: "grid", sm: "flex" },
                            justifyContent: { sm: "flex-end" }
                        }
                    }
                >
                    <Button key="add" variant="outlined">Getting Started</Button>
                </Box>
            </Box>
            <DataTable />
        </DatableProvider>
    );
}
