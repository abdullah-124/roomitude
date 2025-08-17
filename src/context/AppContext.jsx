import React, { createContext, useState, useEffect } from "react";
import MessageProvider from "./MessageProvider";
import { CartProvider } from "./CartProvider";
import { tokenRefresh } from "../utils/tokenRefresh";

export const AppContext = createContext();

export function AppProvider({ children }) {
    //loading state 
    const [loading, setLoading] = useState(true)
    // User state
    const [user, setUser] = useState(null);
    // category loading 
    const [categories, setCategories] = useState([]);
    //cart state 
    const [carts, setCarts] = useState([])
    const [wishlist, setWishlist] = useState([])
    // Load from localStorage on mount
    useEffect(() => {
        tokenRefresh()
        fetch_data()

    }, []);
    const fetch_data = async () => {
        setLoading(true)
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            }
        }
        const res = await fetch('http://127.0.0.1:8000/data/',config)
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setCategories(data.categories)
            if (data?.user?.username) {
                setUser(data.user)
                setCarts(data.cart)
                setWishlist(data.wishlist)
            }
        } else {
            const er = await res.json()
            console.log(er)
        }
        setLoading(false)
    }
    // Functions to update and sync with localStorage
    const updateUser = (newUser) => {
        if (newUser) {
            setUser(newUser);
        } else {
            setUser(null);
        }
    };
    async function logout(updateMessage) {
        console.log('logout auth context  btn')
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await fetch("http://127.0.0.1:8000/api/account/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        updateUser()
        if (response.ok) {
            updateMessage({ 'text': 'Logout successfull', 'status': 'success' })
            setTimeout(() => {
                updateMessage()
            }, 3000);
        } else {
            const error = await response.json();
        }
    }

    return (
        <AppContext.Provider
            value={{ user, updateUser, loading, setLoading, categories, carts,setCarts, logout }}
        >
            <MessageProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </MessageProvider>
        </AppContext.Provider>
    );
}
