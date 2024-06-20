import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import EditToolbar from './EditToolbar';
import { CancelRowButton, DeleteRowButton, EditRowButton, SaveRowButton } from './ActionsRow';
import useRows from './DatableReducer';

export default function Datable({ columns, fetchRows }) {
    const [rows, stageRow, discardRow, commitRow] = useRows(fetchRows());
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        commitRow(newRow);
        return newRow;
    };

    const handleDeleteClick = (id) => () => {
        discardRow(id);
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        discardRow(id);
    };

    const updatedColumns = columns().map((column) => {
        if (column.type === 'actions') {
            return {
                ...column,
                getActions: ({ id }) => {
                    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                    if (isInEditMode) {
                        return [
                            <SaveRowButton onClick={handleSaveClick(id)} />,
                            <CancelRowButton onClick={handleCancelClick(id)} />,
                        ];
                    }
                    return [
                        <EditRowButton onClick={handleEditClick(id)} />,
                        <DeleteRowButton onClick={handleDeleteClick(id)} />,
                    ];
                },
            };
        } else {
            return column;
        }
    });

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    // TODO: El ID generado puede generar un conflicto con la base de datos
    // Nice to have! Experimentar con el concepto de UUID definido por el cliente
    const handleAddClick = () => {
        const row = { id: randomId() };
        stageRow(row);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: updatedColumns[0]?.field },
        }));
    };

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5, 10]}
                rows={rows}
                columns={updatedColumns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={handleProcessRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { actionName: "Agregar", onAddRow: handleAddClick },
                }}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
