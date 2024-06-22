import React, { createContext, useState, useContext } from 'react';

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('loggedOut');

    const onLogin = (newUser) => {
        setUser(newUser);
        setStatus('loggedIn');
    };

    const logout = () => {
        setUser(null);
        setStatus('loggedOut');
    };

    const isLoggedIn = () => {
        return status === 'loggedIn';
    }

    return (
        <AuthenticationContext.Provider value={{ user, isLoggedIn, onLogin, logout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

const useAuth = () => useContext(AuthenticationContext);

export { AuthenticationProvider, useAuth };
