import React from 'react';
import { GridActionsCellItem } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CancelIcon from '@mui/icons-material/Close';

export function SaveRowButton({ onClick }) {
    return (
        <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
                color: 'primary.main',
            }}
            onClick={onClick}
        />
    );
}

export function CancelRowButton({ onClick }) {
    return (
        <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={onClick}
            color="inherit"
        />
    );
}

export function EditRowButton({ onClick }) {
    return (
        <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={onClick}
            color="inherit"
        />
    );
}

export function DeleteRowButton({ onClick }) {
    return (
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={onClick}
            color="inherit"
        />
    );
}
