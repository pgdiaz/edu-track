import { randomId } from "@mui/x-data-grid-generator";

const defaultRows = [
    { id: randomId(), student: 1, signature: 1, firstMidtermNote: 6, secondMidtermNote: 7 },
    { id: randomId(), student: 2, signature: 2, firstMidtermNote: 1, secondMidtermNote: 5 },
    { id: randomId(), student: 3, signature: 2, firstMidtermNote: 7, secondMidtermNote: 3 },
    { id: randomId(), student: 4, signature: 1, firstMidtermNote: 5, secondMidtermNote: 9 },
    { id: randomId(), student: 5, signature: 3, firstMidtermNote: 8, secondMidtermNote: 3 },
    { id: randomId(), student: 6, signature: 3, firstMidtermNote: 7, secondMidtermNote: 4 },
    { id: randomId(), student: 7, signature: 1, firstMidtermNote: 0, secondMidtermNote: 10 },
    { id: randomId(), student: 8, signature: 2, firstMidtermNote: 5, secondMidtermNote: 5 },
    { id: randomId(), student: 9, signature: 1, firstMidtermNote: 3, secondMidtermNote: 1 },
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

const get = async (page, pageSize) => {
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
