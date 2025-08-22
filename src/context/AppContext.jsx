import React, { createContext, useState, useEffect } from "react";
import MessageProvider from "./MessageProvider";
import { CartProvider } from "./CartProvider";
import { tokenRefresh } from "../utils/tokenRefresh";
import { WishlistProvider } from "./WishlistContext";
import { OrderProvider } from "./OrderContext";

export const AppContext = createContext();

export function AppProvider({ children }) {
    //loading state 
    const [loading, setLoading] = useState(true)
    // User state
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    // category loading 
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    //cart state 
    const [carts, setCarts] = useState([])
    const [wishlist, setWishlist] = useState([])
    // Load from database on mount
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
        const res = await fetch('http://127.0.0.1:8000/data/', config)
        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            //  SET ITEM FOR HOME PAGE AND INTIALIZE USER
            setCategories(data.categories)
            setProducts(data.products.products)
            setFeaturedProducts(data.products.featured_products)
            if (data?.user?.username) {
                updateUser(data?.user)
                setCarts(data.cart)
                setWishlist(data.wishlist)
                console.log('wiwi', data.wishlist)
            }
        } else {
            const er = await res.json()
            console.error(er)
        }
        setLoading(false)
    }
    // Functions to update and sync with localStorage
    const updateUser = (newUser) => {
        if (newUser) {
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser))
        } else {
            localStorage.removeItem('user')
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
        updateUser(null)
        setCarts([])
        setWishlist([])
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
            value={{ user, updateUser, products, featuredProducts, categories, carts, setCarts, wishlist, setWishlist, logout, }}
        >
            {
                !loading && <MessageProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <OrderProvider>
                                {children}
                            </OrderProvider>
                        </WishlistProvider>
                    </CartProvider>
                </MessageProvider>
            }
        </AppContext.Provider>
    );
}
