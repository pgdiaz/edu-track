const defaultColumns = [
    {
        field: 'lastnames',
        headerName: 'Apellidos',
        width: 150,
        hideable: false,
        editable: true,
        sortable: true,
    },
    {
        field: 'names',
        headerName: 'Nombres',
        width: 150,
        hideable: true,
        editable: true,
        sortable: false,
    },
    {
        field: 'signature',
        headerName: 'Materia',
        width: 150,
        hideable: false,
        editable: true,
        sortable: true,
    },
    {
        field: 'avg',
        headerName: 'Promedio',
        width: 110,
        type: 'number',
        sortable: false,
        editable: true,
        sortable: false,
    },
    {
        field: 'condition',
        headerName: 'Condicion',
        description: 'Condicion del alumno en base al promedio',
        width: 160,
        sortable: false,
        editable: false,
        sortable: true,
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        width: 100,
        cellClassName: 'actions',
    },
];

const getColumns = () => defaultColumns;

export { getColumns };
