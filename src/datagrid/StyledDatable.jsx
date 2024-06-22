import { styled } from "@mui/material";

/*
    TODO: Los estilos customizados por logica de negocio: libre, regular, promocionado;
    deberian definirse en otro componente de estilos en el paquete de calificaciones y
    proporcionarlos a este componente por propiedades, ya que este componente de estilo
    se abstrae de las definiciones de negocio
*/
const StyledDatable = styled('div')(({ theme }) => ({
    height: '80%',
    width: '100%',
    '& .actions': {
        color: 'text.secondary',
    },
    '& .textPrimary': {
        color: 'text.primary',
    },
    '& .Mui-error': {
        backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
        color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
    },
    '& .app-theme-cell.libre': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
        color: '#1a3e72',
        fontWeight: '600',
    },
    '& .app-theme-cell.regular': {
        backgroundColor: '#d47483',
        color: '#1a3e72',
        fontWeight: '600',
    },
    '& .app-theme-cell.promocionado': {
        backgroundColor: 'rgb(184, 231, 251)',
        color: '#1a3e72',
        fontWeight: '600',
    },
}));

export { StyledDatable };
