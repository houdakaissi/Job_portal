import React, { createContext, useState, useContext } from 'react';

// Create context object
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application and provide authentication state
export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    const login = (username) => {
        setUsername(username);
    };

    const logout = () => {
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
