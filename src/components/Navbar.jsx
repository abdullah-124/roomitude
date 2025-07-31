import React, { useState } from 'react'
import logo from '/logo.png'
import { GiRockingChair } from "react-icons/gi";
import { CiUser, CiHeart, CiShoppingCart, CiSearch, CiMenuBurger } from "react-icons/ci";
import { Link, NavLink } from 'react-router';
import { MdClose } from 'react-icons/md';

function Navbar() {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null)
    return (
        <>
            <nav className='bg-gray-200  py-2'>
                <div className='container grid md:grid-cols-4 grid-cols-2 items-center text-lg md:gap-y-0 gap-y-3'>
                    {/* logo */}
                    <div className="order-1 flex gap-2 items-center ">
                        <GiRockingChair className='text-orange-500 font-bold text-2xl' />
                        <h1 className='text-lg font-medium'>ROOMITUDE</h1>
                    </div>
                    {/* search */}
                    <div className='col-span-2 md:order-2 order-3'>
                        <form action="" className='flex bg-white rounded-lg'>
                            <input placeholder='Search here...' className='input' type="text" />
                            <button className='pe-2'><CiSearch /></button>
                        </form>

                    </div>
                    {/* user info */}
                    <div className='md:order-3 order-2'>
                        <div className='flex justify-end items-center gap-2'>
                            <div className='flex items-center gap-2 bg-white px-2 p-1 rounded hover'>
                                <CiShoppingCart />
                                <p className='text-sm'>29</p>
                            </div>
                            {
                                user ? <>
                                    <div className='bg-white p-1 rounded hover'><CiHeart /></div>
                                    <div className='bg-white p-1 rounded hover'><CiUser /></div>
                                </>:
                                <>
                                <Link to={'/account'} className='btn'>Login</Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            {/* navlink */}
            <div className='py-3 container flex justify-between items-center relative'>
                <div onClick={() => setShow(!show)} className='md:hidden block text-2xl'>
                    {
                        show ? <MdClose /> : <CiMenuBurger />
                    }
                </div>
                {/* large device  */}
                <ul className='md:flex hidden'>
                    <li><NavLink to='' className='navLink'>All Categories</NavLink></li>
                    <li><NavLink to='' className='navLink'>Home</NavLink></li>
                    <li><NavLink to='/products/' className={({ isActive }) => isActive ? "active" : "navLink"
                    }>Products</NavLink></li>
                    <li><NavLink to='/about/' className={({ isActive }) => isActive ? "active" : "navLink"
                    }>About</NavLink></li>
                </ul>
                {
                    // mobile nav 
                    show && <ul className='expand backdrop-blur-2xl absolute z-100 top-[100%] left-0 p-2 py-5 w-full  flex flex-col md:hidden'>
                        <li className='navLink'>All Categories</li>
                        <li><NavLink to='' className='navLink'>Home</NavLink></li>
                        <li><NavLink to='/products/' className={({ isActive }) => isActive ? "active" : "navLink"
                        }>Products</NavLink></li>
                        <li><NavLink to='/about/' className={({ isActive }) => isActive ? "active" : "navLink"
                        }>About</NavLink></li>
                    </ul>
                }
                <div>
                    <p className='text-xs md:text-sm'>Contact: (808) 555-0111</p>
                </div>
            </div>
        </>
    )
}

export default Navbar