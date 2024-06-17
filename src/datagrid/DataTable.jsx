import { useContext } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { DatableContext } from './DatableContext';

export default function DataTable() {
    const { rows, columns, page, setPage, pageSize, setPageSize, rowCount } = useContext(DatableContext);

    return (
        <Box sx={{ height: '80%', width: '100%' }}>
            <DataGrid
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                }}
                rows={rows}
                columns={columns}
                page={page}
                pageSize={pageSize}
                onPaginationModelChange={(model) => {
                    setPage(model.page)
                    setPageSize(model.pageSize)
                }}
                rowCount={rowCount}
                paginationMode="server"
                pageSizeOptions={[5, 10, 25, 50, 100]}
                checkboxSelection
                disableRowSelectionOnClick
                onSortModelChange={(model, detail) => {
                    // TODO: Remove log
                    console.log('onSortModelChange')
                }}
                onRowCountChange={(nRows) => {
                    // TODO: Remove log
                    console.log('onRowCountChange: ' + nRows)
                }}
            />
        </Box>
    );
}
