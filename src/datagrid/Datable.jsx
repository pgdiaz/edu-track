import { useState } from 'react'
import { DataGrid, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import EditToolbar from './EditToolbar';
import { CancelRowButton, DeleteRowButton, EditRowButton, SaveRowButton } from './ActionsRow';
import useRows, { ActionType } from './DatableReducer';

export default function Datable({ columns, fetchRows, onUpdate, onRemove, onError }) {
    let paginatedResult = fetchRows();
    const [rows, setRows, actuate] = useRows(paginatedResult.result);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        actuate(ActionType.Update, newRow);
        onUpdate(newRow);

        return newRow;
    };

    const handleDeleteClick = (id) => () => {
        actuate(ActionType.Delete, id);
        onRemove(id);
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
        actuate(ActionType.Cancel, id);
    };

    const updatedColumns = columns.map((column) => {
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

    const handleAddClick = () => {
        const row = { id: randomId() };
        actuate(ActionType.Create, row);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: updatedColumns[0]?.field },
        }));
    };

    const handlePaginationModelChange = (model) => {
        paginatedResult = fetchRows(model.page, model.pageSize);
        setRows(paginatedResult.result);
    }

    const handleProcessRowUpdateError = (error) => {
        onError(error);
    }

    return (
        <DataGrid
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: paginatedResult.size,
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
                toolbar: {
                    enable: updatedColumns.some(column => column.type === 'actions'),
                    actionName: "Agregar",
                    onAddRow: handleAddClick
                },
            }}
            disableRowSelectionOnClick
            paginationMode="server"
            page={paginatedResult.page}
            pageSize={paginatedResult.size}
            rowCount={paginatedResult.total}
            onPaginationModelChange={handlePaginationModelChange}
            onProcessRowUpdateError={handleProcessRowUpdateError}
        />
    );
}
