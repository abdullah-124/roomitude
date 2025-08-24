import React from 'react'
import { NavLink } from 'react-router'
import { CiUser, CiHeart,CiMedicalClipboard , CiUnlock , CiShoppingCart } from "react-icons/ci"; 

function Sidebar() {
    return (
        <aside className="w-full p-2 lg:p-4 sticky top-0 z-[50]">
            <nav className="flex sm:flex-col flex-row justify-between">
                <NavLink
                    to="account"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                    < CiUser/>
                    <span>Account</span>
                </NavLink>
                <NavLink
                    to="orders"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    }
                ><CiMedicalClipboard  />
                    <span>My Orders</span>
                </NavLink>
                <NavLink
                    to="cart"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    }
                ><CiShoppingCart />
                    <span>My Cart</span>
                </NavLink>
                <NavLink
                    to="wishlist"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                    <CiHeart />
                    <span>My Wishlist</span>
                </NavLink>
                <NavLink
                    to="update_password"
                    className={({ isActive }) =>
                        `profile_navlink ${isActive ? "active_bg" : "hover:bg-[var(--sbg)]/10"}`
                    } >
                    <CiUnlock />
                    <span>Update Password</span>
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar