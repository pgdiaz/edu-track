import { useSnackbar } from "notistack";
import { get, remove, save } from "../api/apiUsuarios";
import Datable from "../datagrid/Datable";
import { getColumns } from "./ColumnsUserTable";

export default function UsersTable() {
    const { enqueueSnackbar } = useSnackbar();

    const handleOnUpdate = (row) => {
        save(row);
    }

    const handleOnRemove = (id) => {
        remove(id);
    }

    const handleOnError = (error) => {
        enqueueSnackbar(error.message ?? "Ocurrio un error al procesar su solicitud", {
            variant: "error",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
    }

    const columns = getColumns();

    return (
        <Datable
            columns={columns}
            fetchRows={get}
            onUpdate={handleOnUpdate}
            onRemove={handleOnRemove}
            onError={handleOnError}
        />
    );

}
