import { useEffect, useState } from "react";
import { get, load, save, remove } from "../api/api";
import Datable from "../datagrid/Datable";
import { getColumns } from "./ColumnsDataTable";
import { Box, CircularProgress } from "@mui/material";

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

    return (
        <>
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
                    columns={getColumns}
                    fetchRows={get}
                    onUpdate={handleOnUpdate}
                    onRemove={handleOnRemove}
                />
            )
            }
        </>
    );
}
