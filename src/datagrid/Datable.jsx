import { useEffect, useState } from 'react'
import { DataGrid, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { LinearProgress } from '@mui/material';
import { CancelRowButton, DeleteRowButton, EditRowButton, SaveRowButton } from './ActionsRow';
import useRows, { ActionType } from './DatableReducer';
import EditToolbar from './EditToolbar';
import OverlayRows from './OverlayRows';

export default function Datable({ columns, fetchRows, onCreate, onUpdate, onRemove, onError }) {
    const [rows, setRows, actuate] = useRows([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setDataLoaded(false);
        const fetchData = async () => {
            try {
                const data = await fetchRows(page, pageSize);
                if (data) {
                    setRows(data.result);
                    setRowCount(data.total);
                }
                setDataLoaded(true);
            } catch (error) {
                onError(error);
            }
        }
        fetchData();
    }, [page, pageSize]);

    const handleProcessRowUpdate = (newRow) => {
        actuate(ActionType.Update, newRow);
        newRow.isNew ? onCreate(newRow) : onUpdate(newRow);
        newRow.isNew = false;

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
        const row = { id: randomId(), isNew: true };
        actuate(ActionType.Create, row);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [row.id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0]?.field },
        }));
    };

    const handlePaginationModelChange = (model) => {
        setPage(model.page);
        setPageSize(model.pageSize);
    }

    const handleProcessRowUpdateError = (error) => {
        onError(error);
    }

    return (
        <DataGrid
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: pageSize,
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
            loading={!dataLoaded}
            slots={{
                toolbar: EditToolbar,
                loadingOverlay: LinearProgress,
                noRowsOverlay: OverlayRows,
            }}
            slotProps={{
                toolbar: {
                    enable: updatedColumns.some(column => column.type === 'actions'),
                    actionName: "Agregar",
                    onAddRow: handleAddClick
                },
                loadingOverlay: { color: "secondary" },
            }}
            disableRowSelectionOnClick
            paginationMode="server"
            page={page}
            pageSize={pageSize}
            rowCount={rowCount}
            onPaginationModelChange={handlePaginationModelChange}
            onProcessRowUpdateError={handleProcessRowUpdateError}
        />
    );
}
