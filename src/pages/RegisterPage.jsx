import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

export default function RegisterPage() {

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar("Registro realizado con exito", {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
    };

    return (
        <>
            <h1>Register</h1>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Submit
            </Button>
        </>);
}
