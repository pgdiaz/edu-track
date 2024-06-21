import { useReducer } from 'react';

const ActionType = {
    Create: "create",
    Update: "update",
    Cancel: "cancel",
    Delete: "delete",
}

export { ActionType };

function reducer(state, action) {
    switch (action.type) {
        case ActionType.Create:
            state.stagedRows = state.stagedRows.some(row => row.id === action.payload.id)
                ? state.stagedRows.map(row => row.id === action.payload.id ? action.payload : row)
                : [action.payload, ...state.stagedRows]
            break
        case ActionType.Delete:
            state.stagedRows = state.stagedRows.filter(row => row.id !== action.payload)
            state.commitedRows = state.commitedRows.filter(row => row.id !== action.payload)
            break
        case ActionType.Update:
            state.commitedRows = state.commitedRows.some(row => row.id === action.payload.id)
                ? state.commitedRows.map(row => row.id === action.payload.id ? action.payload : row)
                : [action.payload, ...state.commitedRows]
            state.stagedRows = state.stagedRows.filter(row => row.id !== action.payload.id)
            break
        case ActionType.Cancel:
            state.stagedRows = state.stagedRows.filter(row => row.id !== action.payload)
            break
        default:
            state.stagedRows = []
            state.commitedRows = action.payload
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
    const setRows = (newRows) => {
        dispatch({ type: 'reset', payload: newRows })
    }
    const actuate = (actionType, payload) => {
        dispatch({ type: actionType, payload: payload })
    }

    return [state.rows, setRows, actuate];
}
