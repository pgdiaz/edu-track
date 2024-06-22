import clsx from 'clsx';

const average = (row) => {
    const average = ((row.firstMidtermNote || 0) + (row.secondMidtermNote || 0)) / 2;
    return average.toFixed(0);
};

const CondicionType = {
    Libre: "LIBRE",
    Regular: "REGULAR",
    Promocionado: "PROMOCIONADO",
}

const actionsColumn = {
    field: 'actions',
    type: 'actions',
    headerName: 'Acciones',
    width: 100,
    cellClassName: 'actions',
}

const defaultColumns = [
    {
        field: 'student',
        headerName: 'Alumno',
        width: 200,
        type: 'singleSelect',
        hideable: false,
        editable: false,
        sortable: false,
    },
    {
        field: 'signature',
        headerName: 'Materia',
        width: 120,
        type: 'singleSelect',
        hideable: false,
        editable: false,
        sortable: true,
    },
    {
        field: 'firstMidtermNote',
        headerName: 'Primer Parcial',
        width: 120,
        type: 'number',
        hideable: true,
        editable: false,
        sortable: false,
        valueGetter: (value, row) => {
            return row.firstMidtermNote || 0;
        },
    },
    {
        field: 'secondMidtermNote',
        headerName: 'Segundo Parcial',
        width: 120,
        type: 'number',
        hideable: true,
        editable: false,
        sortable: false,
        valueGetter: (value, row) => {
            return row.secondMidtermNote || 0;
        },
    },
    {
        field: 'avg',
        headerName: 'Promedio',
        width: 80,
        type: 'number',
        hideable: false,
        editable: false,
        sortable: false,
        valueGetter: (value, row) => {
            return average(row);
        },
    },
    {
        field: 'condition',
        headerName: 'Condicion',
        description: 'Condicion del alumno en base al promedio',
        width: 160,
        hideable: true,
        editable: false,
        sortable: true,
        valueGetter: (value, row) => {
            const avg = average(row);
            return avg < 4 ? CondicionType.Libre : avg >= 7 ? CondicionType.Promocionado : CondicionType.Regular;
        },
        cellClassName: (params) => {
            if (params.value == null) {
                return '';
            }
            return clsx('app-theme-cell', {
                libre: params.value === CondicionType.Libre,
                regular: params.value === CondicionType.Regular,
                promocionado: params.value === CondicionType.Promocionado,
            });
        },
    },
];

const getColumns = () => defaultColumns;

export { getColumns, CondicionType, actionsColumn };
