import { styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { GridEditInputCell } from '@mui/x-data-grid';

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
    },
}));

export default function EditInputCell(props) {
    const { error } = props;
    const isTooltipOpen = !!error && error.trim();

    return (
        <StyledTooltip open={isTooltipOpen} title={error}>
            <span>
                <GridEditInputCell {...props} />
            </span>
        </StyledTooltip>
    );
}
