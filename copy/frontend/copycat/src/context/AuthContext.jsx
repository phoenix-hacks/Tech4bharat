import { createContext, useState, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    // Throw an error if the context is used outside of the provider
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return context;
}

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    // State to manage the auth user, initialized from localStorage or null
    const [authUser, setAuthUser] = useState(
        JSON.parse(localStorage.getItem("prc-user")) || null
    );

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}
