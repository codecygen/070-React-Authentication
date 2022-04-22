// React-Context-API-Login-Logout-Management
import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: token => {},
    logout: () => {},
});

export const AuthContextProvider = props => {
    const [token, setToken] = useState(null);

    // Converts Object to boolean. If it was falsey 
    // (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
    const userIsLoggedIn = !!token;

    const loginHandler = token => {
        setToken(token);
    };

    const logoutHandler = () => {
        setToken(null);
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