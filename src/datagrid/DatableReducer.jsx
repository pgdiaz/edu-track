import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'stage':
            state.stagedRows = state.stagedRows.some(row => row.id === action.payload.id)
                ? state.stagedRows.map(row => row.id === action.payload.id ? action.payload : row)
                : [action.payload, ...state.stagedRows]
            break
        case 'discard':
            state.stagedRows.some(row => row.id === action.id)
                ? state.stagedRows = state.stagedRows.filter(row => row.id !== action.id)
                : state.commitedRows = state.commitedRows.filter(row => row.id !== action.id)
            break
        default:
            state.commitedRows = state.commitedRows.some(row => row.id === action.payload.id)
                ? state.commitedRows.map(row => row.id === action.payload.id ? action.payload : row)
                : [action.payload, ...state.commitedRows]
            state.stagedRows = state.stagedRows.filter(row => row.id !== action.payload.id)
    }

    return {
        ...state,
        rows: [...state.stagedRows, ...state.commitedRows],
    }
}

export default function useRows(initialRows) {
    const [state, dispatch] = useReducer(reducer, {
        rows: initialRows,
        commitedRows: initialRows,
        stagedRows: [],
    });
    const commitRow = (row) => {
        dispatch({ type: 'commit', payload: row })
    }
    const stageRow = (row) => {
        dispatch({ type: 'stage', payload: row })
    }
    const discardRow = (id) => {
        dispatch({ type: 'discard', payload: { id: id } })
    }

    return [state.rows, stageRow, discardRow, commitRow];
}
