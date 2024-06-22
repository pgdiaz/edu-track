import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthorized, children }) => {
    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/home" replace />
    );
};

export default PrivateRoute;
