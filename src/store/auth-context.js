// React-Context-API-Login-Logout-Management
import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: token => {},
    logout: () => {},
});

export const AuthContextProvider = props => {
    // React-Persisting-Login-Status-Token-When-Page-Reloads
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);

    // Converts Object to boolean. If it was falsey 
    // (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const userIsLoggedIn = !!token;

    const loginHandler = token => {
        setToken(token);

        // React-Persisting-Login-Status-Token-When-Page-Reloads
        // local storage is only able to store strings and numbers as data.
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        // React-Persisting-Login-Status-Token-When-Page-Reloads
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