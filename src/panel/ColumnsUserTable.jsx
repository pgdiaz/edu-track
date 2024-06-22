const roles = ['admin', 'docente', 'guest'];

const defaultColumns = [
    {
        field: 'lastnames',
        headerName: 'Apellidos',
        width: 160,
        hideable: false,
        editable: true,
        sortable: false,
    },
    {
        field: 'names',
        headerName: 'Nombres',
        width: 160,
        hideable: false,
        editable: true,
        sortable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        hideable: true,
        editable: true,
        sortable: false,
    },
    {
        field: 'role',
        headerName: 'Rol',
        width: 160,
        type: 'singleSelect',
        hideable: false,
        editable: true,
        sortable: false,
        valueOptions: roles,
        valueGetter: (value, row) => {
            if (!row.role) {
                return 'guest';
            }
            return row.role;
        },
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        width: 150,
        cellClassName: 'actions',
    },
]

const getColumns = () => defaultColumns;

export { getColumns };
