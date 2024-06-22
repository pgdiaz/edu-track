import { GridToolbarContainer } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

export default function EditToolbar(props) {
    const { enable, actionName, onAddRow } = props;

    const handleAddRow = () => onAddRow();

    return (
        <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
            {enable ? (
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAddRow}>
                    {actionName}
                </Button>
            ) : (
                <></>
            )}
        </GridToolbarContainer>
    );
}
