import React from 'react'
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiShoppingCart, CiUser,CiHeart   } from "react-icons/ci";
import { PiKeyThin } from "react-icons/pi";
import { NavLink } from 'react-router'

function Sidebar() {
    return (
        <aside className="md:w-64 w-full bg-gray-200">
            <nav className="flex md:flex-col flex-row justify-between">
                <NavLink
                    to="account"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                    <CiUser />
                    <span>Account</span>
                </NavLink>
                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    }
                ><PiShoppingCartSimpleThin />
                    <span>My Orders</span>
                </NavLink>
                <NavLink
                    to="cart"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    }
                ><CiShoppingCart />
                    <span>Cart</span>
                </NavLink>
                <NavLink
                    to="wishlist"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                        <CiHeart />
                    <span>Wishlist</span>
                </NavLink>
                <NavLink
                    to="update_password"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                    <PiKeyThin />
                    <span>Update Password</span>
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar