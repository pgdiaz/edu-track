import { useEffect, useState } from "react";
import { get, load, save, remove } from "../api/apiCalificaciones";
import { getAllAlumnos } from "../api/apiAlumnos";
import { getAllMaterias } from "../api/apiMaterias";
import Datable from "../datagrid/Datable";
import { getColumns, actionsColumn } from "./ColumnsDataTable";
import { Box, CircularProgress } from "@mui/material";
import EditInputCell from "../datagrid/EditInputCell";
import { StyledDatable } from "../datagrid/StyledDatable";
import { useAuth } from "../security/AuthenticationProvider";
import { useSnackbar } from "notistack";

export default function CalificacionesTable() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const { isLoggedIn } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setTimeout(() => {
            load().then(() => {
                setDataLoaded(true);
            });
        }, 500);
    }, []);

    const handleFetchRows = async (page, pageSize) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await get(page, pageSize);
        return response;
    }

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

    const updatedColumns = getColumns().map((column) => {
        switch (column.field) {
            case 'firstMidtermNote':
            case 'secondMidtermNote':
                return {
                    ...column,
                    editable: isLoggedIn(),
                    renderEditCell: (params) => (
                        <EditInputCell
                            {...params}
                            inputProps={{ min: 0, max: 10 }}
                        />
                    ),
                    preProcessEditCellProps: (params) => {
                        let errorMsg = '';
                        if (params.props.value < 0) {
                            errorMsg = 'Debe ser mayor o igual a 0';
                        }
                        if (params.props.value > 10) {
                            errorMsg = 'Debe ser menor o igual a 10';
                        }
                        return { ...params.props, error: errorMsg };
                    }
                };
            case 'student':
                return {
                    ...column,
                    editable: isLoggedIn(),
                    valueOptions: getAllAlumnos().map((item) => { return { value: item.id, label: `${item.lastnames}, ${item.names}` }; }),
                };
            case 'signature':
                return {
                    ...column,
                    editable: isLoggedIn(),
                    valueOptions: getAllMaterias().map((item) => { return { value: item.id, label: item.name } }),
                };
            default:
                return column;
        }
    });

    return (
        <StyledDatable>
            {dataLoaded ? (
                <Datable
                    columns={isLoggedIn() ? [...updatedColumns, actionsColumn] : updatedColumns}
                    fetchRows={handleFetchRows}
                    onCreate={handleOnUpdate}
                    onUpdate={handleOnUpdate}
                    onRemove={handleOnRemove}
                    onError={handleOnError}
                />
            ) : (
                <Box style={{ position: 'relative' }}>
                    <CircularProgress
                        color="secondary"
                        determinate="true"
                        value={25}
                        size={40}
                        status={'loading'}
                        style={{ marginLeft: '48%', marginTop: '10%' }}
                    />
                </Box >
            )}
        </StyledDatable>
    );
}
