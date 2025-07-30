import React from 'react'
import logo from '/logo.png'
import { GiRockingChair } from "react-icons/gi";
import { CiUser, CiHeart, CiShoppingCart, CiSearch } from "react-icons/ci";

function Navbar() {
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
                            <div className='bg-white p-1 rounded hover'><CiHeart /></div>
                            <div className='bg-white p-1 rounded hover'><CiUser /></div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* navlink */}
            <div className='py-3 container flex justify-between items-center'>
                <div className='md:hidden block'>
                    menu
                </div>
                <ul className='md:flex hidden'>
                    <li><a href='' className='navLink'>All Categories</a></li>
                    <li><a href='' className='navLink'>Home</a></li>
                    <li><a href='' className='navLink'>Shop</a></li>
                    <li><a href='' className='navLink'>Products</a></li>
                    <li><a href='' className='navLink'>About</a></li>
                </ul>
                <div>
                    <p>Contact: (808) 555-0111</p>
                </div>
            </div>
        </>
    )
}

export default Navbar