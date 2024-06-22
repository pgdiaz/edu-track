import { useState } from 'react'
import { DataGrid, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import EditToolbar from './EditToolbar';
import { CancelRowButton, DeleteRowButton, EditRowButton, SaveRowButton } from './ActionsRow';
import useRows, { ActionType } from './DatableReducer';

export default function Datable({ columns, fetchRows, onUpdate, onRemove }) {
    let paginatedResult = fetchRows();
    const [rows, setRows, actuate] = useRows(paginatedResult.result);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleProcessRowUpdate = (newRow) => {
        // TODO: remove logs
        console.log('### Row Has Changes!!!')
        console.log(newRow)
        actuate(ActionType.Update, newRow);
        onUpdate(newRow);

        return newRow;
    };

    const handleDeleteClick = (id) => () => {
        actuate(ActionType.Delete, id);
        onRemove(id);
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        // TODO: remove logs
        console.log('### Models Has Changes!!!')
        console.log(newRowModesModel)
        setRowModesModel(newRowModesModel);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        // TODO: remove logs
        console.log('handleSaveClick for row with id: ' + id)
        // TODO: Maybe we need validate the row before exit edit mode
        console.log(rows.find((element) => element.id === id))
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
        // TODO: remove logs
        console.log('### Row Edit Stopped!!!')
        console.log(params)
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

    /*
    const handleProcessRowUpdateError = useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);
    */
    const handleProcessRowUpdateError = (error) => {
        console.log(error.message)
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
                toolbar: { actionName: "Agregar", onAddRow: handleAddClick },
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
