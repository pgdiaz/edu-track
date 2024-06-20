import { Box, Button, Typography } from "@mui/material";
import { getAll } from '../api/api';
import { getColumns } from '../calificaciones/ColumnsDataTable'
import Datable from "../datagrid/Datable";

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
            <Datable columns={getColumns} fetchRows={getAll} />
        </>
    );
}
