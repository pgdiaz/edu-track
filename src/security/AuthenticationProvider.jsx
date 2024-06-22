import React, { createContext, useState, useContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState('loggedOut');

    const onLogin = (currentRole) => {
        setRole(currentRole);
        setStatus('loggedIn');
    };

    const logout = () => {
        setRole(null);
        setStatus('loggedOut');
    };

    const isLoggedIn = () => {
        return status === 'loggedIn';
    }

    return (
        <AuthenticationContext.Provider value={{ role, isLoggedIn, onLogin, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

const useAuth = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuth };
