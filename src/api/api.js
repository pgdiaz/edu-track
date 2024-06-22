import { randomId } from "@mui/x-data-grid-generator";

const defaultRows = [
    { id: randomId(), lastnames: 'Snow', names: 'Jon', signature: 'PRAMOV3', firstMidtermNote: 6, secondMidtermNote: 7 },
    { id: randomId(), lastnames: 'Lannister', names: 'Cersei', signature: 'PRAWEB3', firstMidtermNote: 1, secondMidtermNote: 5 },
    { id: randomId(), lastnames: 'Lannister', names: 'Jaime', signature: 'PRAWEB3', firstMidtermNote: 7, secondMidtermNote: 3 },
    { id: randomId(), lastnames: 'Stark', names: 'Arya', signature: 'PRAMOV3', firstMidtermNote: 5, secondMidtermNote: 9 },
    { id: randomId(), lastnames: 'Targaryen', names: 'Daenerys', signature: 'CEYM', firstMidtermNote: 8, secondMidtermNote: 3 },
    { id: randomId(), lastnames: 'Melisandre', names: 'Nataly', signature: 'CEYM', firstMidtermNote: 7, secondMidtermNote: 4 },
    { id: randomId(), lastnames: 'Clifford', names: 'Ferrara', signature: 'PRAMOV3', firstMidtermNote: 0, secondMidtermNote: 10 },
    { id: randomId(), lastnames: 'Frances', names: 'Rossini', signature: 'PRAWEB3', firstMidtermNote: 5, secondMidtermNote: 5 },
    { id: randomId(), lastnames: 'Roxie', names: 'Harvey', signature: 'PRAMOV3', firstMidtermNote: 3, secondMidtermNote: 1 },
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
