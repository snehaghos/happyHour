import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: () => {},
    setToken: () => {},
    setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        console.log("Token in local storage:", token);
    }, [token]);

    const setToken = (token) => {
        console.log("Setting token:", token);
        _setToken(token);
        setIsAuthenticated(!!token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, setUser, setToken, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
