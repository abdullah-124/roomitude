import React, { createContext, useState, useEffect } from "react";
import { get_cart_item } from "../utils/Cart/get_cart_item";

export const AppContext = createContext();

export function AppProvider({ children }) {
    //loading state 
    const [loading, setLoading] = useState(true)
    // User state
    const [user, setUser] = useState(null);
    // Message state
    const [message, setMessage] = useState(null);
    // category loading 
    const [categories, setCategories] = useState([]);
    // cart count
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories/")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);
    // Load from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        const storedMessage = localStorage.getItem("message");
        if (storedMessage) setMessage(JSON.parse(storedMessage));
        setLoading(false)
    }, []);
    useEffect(() => {
        get_cart_item().then(data =>{
            setCartItems(data)
        })

    }, [])
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
        console.log('message has updated')
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
            value={{ user, updateUser, message, updateMessage, loading, setLoading, categories, cartItems, setCartItems }}
        >
            {children}
        </AppContext.Provider>
    );
}
