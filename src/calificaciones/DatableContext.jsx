import React, { createContext, useEffect, useState } from 'react';
import { get, update, remove } from '../api/api';

export const DatableContext = createContext();

export const DatableProvider = ({ children }) => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [rowCount, setRowCount] = useState(0);

    const handleRowSave = (newRow) => {
        update(newRow)
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowDelete = (selectedIds) => {
        remove(selectedIds);
    };

    const fetchData = async () => {
        // TODO: Remove log
        console.log('fetchData')
        const result = get(page, pageSize);
        setRows(result.rows)
        setRowCount(result.rowCount)
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <DatableContext.Provider value={
            {
                rows,
                page,
                setPage,
                pageSize,
                setPageSize,
                rowCount,
                handleRowSave,
                handleRowDelete
            }
        }
        >
            {children}
        </DatableContext.Provider>
    );
};
