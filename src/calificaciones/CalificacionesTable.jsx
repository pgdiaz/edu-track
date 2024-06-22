import { useEffect, useState } from "react";
import { get, load, save, remove } from "../api/apiCalificaciones";
import { getAllAlumnos } from "../api/apiAlumnos";
import { getAllMaterias } from "../api/apiMaterias";
import Datable from "../datagrid/Datable";
import { getColumns } from "./ColumnsDataTable";
import { Box, CircularProgress } from "@mui/material";
import EditInputCell from "../datagrid/EditInputCell";
import { StyledDatable } from "../datagrid/StyledDatable";

export default function CalificacionesTable() {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            load().then(() => {
                setDataLoaded(true);
            });
        }, 3000);
    }, []);

    const handleOnUpdate = (row) => {
        save(row);
    }

    const handleOnRemove = (id) => {
        remove(id);
    }

    const updatedColumns = getColumns().map((column) => {
        switch (column.field) {
            case 'firstMidtermNote':
            case 'secondMidtermNote':
                return {
                    ...column,
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
                    valueOptions: getAllAlumnos().map((item) => { return { value: item.id, label: `${item.lastnames}, ${item.names}` }; }),
                };
            case 'signature':
                return {
                    ...column,
                    valueOptions: getAllMaterias().map((item) => { return { value: item.id, label: item.name } }),
                };
            default:
                return column;
        }
    });

    return (
        <StyledDatable>
            {!dataLoaded ? (
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
            ) : (
                <Datable
                    columns={updatedColumns}
                    fetchRows={get}
                    onUpdate={handleOnUpdate}
                    onRemove={handleOnRemove}
                />
            )
            }
        </StyledDatable>
    );
}
