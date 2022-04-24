// React-Context-API-Login-Logout-Management
import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: token => {},
    logout: () => {},
});

// React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExpirationTime - currentTime;

    return remainingDuration;
};

export const AuthContextProvider = props => {
    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);

    // Converts Object to boolean. If it was falsey 
    // (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const userIsLoggedIn = !!token;

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        // local storage is only able to store strings and numbers as data.
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };
    
    return (
        <AuthContext.Provider
            value={contextValue}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;