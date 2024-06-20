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

// Función para obtener los datos del localStorage o usar los valores por defecto
const fetchRows = () => {
    const storedRows = localStorage.getItem(localStorageKey);
    return storedRows ? JSON.parse(storedRows) : defaultRows;
};

// Función para guardar los datos en el localStorage
const saveRows = (rows) => {
    localStorage.setItem(localStorageKey, JSON.stringify(rows));
};

// Simular la carga de datos con paginación
const get = (page, pageSize) => {
    const rows = fetchRows();
    const paginatedRows = rows.slice(page * pageSize, page * pageSize + pageSize);
    return {
        rows: paginatedRows,
        rowCount: rows.length,
    };
};

// Simular la edición de una fila
const update = (newRow) => {
    const rows = fetchRows();
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    saveRows(updatedRows);
};

// Simular la eliminación de una o más filas
const remove = (selectedIds) => {
    const rows = fetchRows();
    const updatedRows = rows.filter((row) => !selectedIds.includes(row.id));
    saveRows(updatedRows);
};

const getAll = () => defaultRows;

export { getAll, get, update, remove };
