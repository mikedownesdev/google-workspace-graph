import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null)

    const handleLoginSuccess = response => {
        console.log("Google login successful")
        setToken(response.access_token)
    };
    const handleLoginFailure = errorResponse => console.log(errorResponse);
    const handleLogout = () => setToken(null);

    const value = {
        token,
        onLoginSuccess: handleLoginSuccess,
        onLoginFailure: handleLoginFailure,
        onLogout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};