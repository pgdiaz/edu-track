import { randomId } from "@mui/x-data-grid-generator";

const defaultRows = [
    { id: randomId(), lastnames: 'Snow', names: 'Jon', signature: null, avg: 14, condition: null },
    { id: randomId(), lastnames: 'Lannister', names: 'Cersei', signature: null, avg: 31, condition: null },
    { id: randomId(), lastnames: 'Lannister', names: 'Jaime', signature: null, avg: 31, condition: null },
    { id: randomId(), lastnames: 'Stark', names: 'Arya', signature: null, avg: 11, condition: null },
    { id: randomId(), lastnames: 'Targaryen', names: 'Daenerys', signature: null, avg: null, condition: null },
    { id: randomId(), lastnames: 'Melisandre', names: null, signature: null, avg: 150, condition: null },
    { id: randomId(), lastnames: 'Clifford', names: 'Ferrara', signature: null, avg: 44, condition: null },
    { id: randomId(), lastnames: 'Frances', names: 'Rossini', signature: null, avg: 36, condition: null },
    { id: randomId(), lastnames: 'Roxie', names: 'Harvey', signature: null, avg: 65, condition: null },
];

const localStorageKey = 'dataGridRows';

const load = async () => {
    if (fetchRows().length === 0) {
        saveRows(defaultRows);
    }
}

const fetchRows = () => {
    const storedRows = localStorage.getItem(localStorageKey);
    return JSON.parse(storedRows) || [];
};

const saveRows = (rows) => {
    localStorage.setItem(localStorageKey, JSON.stringify(rows));
}

const get = (page, pageSize) => {
    page = page ?? 0;
    pageSize = pageSize ?? 5;
    const rows = fetchRows();
    const paginatedRows = rows.slice(page * pageSize, page * pageSize + pageSize);
    return {
        result: paginatedRows,
        total: rows.length,
        page: page,
        size: pageSize,
    };
}

const save = (newRow) => {
    const rows = fetchRows();
    const updatedRows = rows.some(row => row.id === newRow.id)
        ? rows.map(row => row.id === newRow.id ? newRow : row)
        : [newRow, ...rows];
    saveRows(updatedRows);
}

const remove = (selectedIds) => {
    const rows = fetchRows();
    const updatedRows = rows.filter((row) => !selectedIds.includes(row.id));
    saveRows(updatedRows);
};

export { load, get, save, remove };
