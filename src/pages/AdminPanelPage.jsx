import { Box, Typography } from "@mui/material";
import UsersTable from "../panel/UsersTable";

export default function AdminPanelPage() {
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
                    Panel de Administracion
                </Typography>
            </Box>
            <UsersTable />
        </>
    );
}
