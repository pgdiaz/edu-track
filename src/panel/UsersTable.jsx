import { useSnackbar } from "notistack";
import Datable from "../datagrid/Datable";
import { getColumns } from "./ColumnsUserTable";
import axios from "axios";
import { StyledDatable } from "../datagrid/StyledDatable";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function UsersTable() {
    const { enqueueSnackbar } = useSnackbar();

    const setSuccess = (message) => {
        enqueueSnackbar(message, {
            variant: "success",
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
            },
        });
    }

    const handleApiError = (error) => {
        handleOnError(error?.response?.data?.error
            ? { message: error.response.data.error }
            : error);
    }

    const handleFetchRows = async (page, pageSize) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await axios.get(`${apiBaseUrl}/usuarios`, { params: { page, pageSize } })
            .catch(error => {
                console.log(error);
                handleApiError(error);
            });
        return response?.data;
    }

    const handleOnCreate = async (row) => {
        await axios.post(`${apiBaseUrl}/usuarios`, {
            id: row.id, lastnames: row.lastnames, names: row.names, email: row.email, role: row.role
        })
            .then(response => {
                setSuccess("El usuario fue dado de alta");
            })
            .catch(error => {
                console.log(error);
                handleApiError(error);
            });
    }

    const handleOnUpdate = async (row) => {
        await axios.put(`${apiBaseUrl}/usuarios/${row.id}`, {
            lastnames: row.lastnames, names: row.names, email: row.email, role: row.role
        })
            .then(response => {
                setSuccess("Se actualizo la informacion del usuario");
            })
            .catch(error => {
                console.log(error);
                handleApiError(error);
            });
    }

    const handleOnRemove = async (id) => {
        await axios.delete(`${apiBaseUrl}/usuarios/${id}`)
            .then(response => {
                setSuccess("El usuario fue eliminado");
            })
            .catch(error => {
                console.log(error);
                handleApiError(error);
            });
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
        <StyledDatable>
            <Datable
                columns={columns}
                fetchRows={handleFetchRows}
                onCreate={handleOnCreate}
                onUpdate={handleOnUpdate}
                onRemove={handleOnRemove}
                onError={handleOnError}
            />
        </StyledDatable>
    );

}
