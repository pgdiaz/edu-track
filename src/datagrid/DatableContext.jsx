import React, { createContext, useEffect, useState } from 'react';

const defaultColumns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        sortable: false,
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const defaultRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const DatableContext = createContext();

export const DatableProvider = ({ children }) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(defaultRows.length);

    const fetchData = async () => {
        // TODO: Remove log
        console.log('fetchData')
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedRows = defaultRows.slice(startIndex, endIndex);
        setRows(paginatedRows);
        setRowCount(defaultRows.length);
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <DatableContext.Provider value={
            {
                columns: defaultColumns,
                rows,
                page,
                setPage,
                pageSize,
                setPageSize,
                rowCount
            }
        }
        >
            {children}
        </DatableContext.Provider>
    );
};
