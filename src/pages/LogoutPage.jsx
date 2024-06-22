import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../security/AuthenticationProvider';
import { Box, CircularProgress } from '@mui/material';

function LogoutPage() {
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            logout();
        }, 1000);
    }, []);

    return (
        <Box style={{ position: 'relative' }}>
            {isLoggedIn() ? (
                <CircularProgress
                    color="secondary"
                    determinate="true"
                    value={25}
                    size={40}
                    status={'loading'}
                    style={{ marginLeft: '48%', marginTop: '10%' }}
                />
            ) : (
                <Navigate to="/login" replace />
            )}
        </Box>
    );
}

export default LogoutPage;
