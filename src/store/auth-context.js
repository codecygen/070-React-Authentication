// React-Context-API-Login-Logout-Management
import React, { useState, useEffect } from 'react';

// React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: token => { },
    logout: () => { },
});

// React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExpirationTime - currentTime;

    return remainingDuration;
};

// React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
const retrievedStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 6000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
};

export const AuthContextProvider = props => {
    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    const tokenData = retrievedStoredToken();

    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    let initialToken;

    if (tokenData) {
        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    // Converts Object to boolean. If it was falsey 
    // (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const userIsLoggedIn = !!token;

    const logoutHandler = () => {
        setToken(null);
        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.removeItem('token');

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.removeItem('expirationTime');

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        // local storage is only able to store strings and numbers as data.
        localStorage.setItem('token', token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.setItem('expirationTime', expirationTime);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        const remainingTime = calculateRemainingTime(expirationTime);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

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