// React-Context-API-Login-Logout-Management
import React, { useCallback, useState, useEffect } from 'react';

// React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: token => { },
    logout: () => { },
});

export const AuthContextProvider = props => {
    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    const initialToken = localStorage.getItem('token');

    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    const [token, setToken] = useState(initialToken);

    // Converts Object to boolean. If it was falsey 
    // (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.removeItem('token');

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.removeItem('expirationTime');

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        clearTimeout(logoutTimer);
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        // local storage is only able to store strings and numbers as data.
        localStorage.setItem('token', token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        localStorage.setItem('expirationTime', expirationTime);

        // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
        // This section automatically logs out the user when the token expires.
        logoutTimer = setTimeout(logoutHandler, expirationTime - Date.now());
    };

    // React-Persisting-Login-Status-Token-When-Page-Reloads-And-Setting-Expiration
    // This section gets the info back from localStorage in every refresh.
    useEffect(() => {
        if (token) {
            let timeLeft = localStorage.getItem('expirationTime') - Date.now();
            if (timeLeft < 6000) logoutHandler();
        }
    }, [token, logoutHandler]);

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