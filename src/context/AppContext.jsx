import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    //loading state 
    const [loading, setLoading] = useState(true)
    // User state
    const [user, setUser] = useState(null);
    // Message state
    const [message, setMessage] = useState(null);

    // Load from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedMessage = localStorage.getItem("message");
        if (storedMessage) setMessage(JSON.parse(storedMessage));
        setLoading(false)
    }, []);

    // Functions to update and sync with localStorage
    const updateUser = (newUser) => {
        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
        } else {
            localStorage.removeItem("user");
            setUser(null);
        }
    };

    const updateMessage = (newMessage) => {
        if (newMessage) {
            localStorage.setItem("message", JSON.stringify(newMessage));
            setMessage(newMessage);
        } else {
            localStorage.removeItem("message");
            setMessage(null);
        }
    };

    return (
        <AppContext.Provider
            value={{ user, updateUser, message, updateMessage, loading,setLoading }}
        >
            {children}
        </AppContext.Provider>
    );
}
