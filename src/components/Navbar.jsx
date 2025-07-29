import React from 'react'
import logo from '/logo.png'
import { FaHeart, FaSearch, FaUser } from 'react-icons/fa'
import { CiUser,CiHeart,CiShoppingCart, CiSearch  } from "react-icons/ci";

function Navbar() {
    return (
        <nav className='bg-gray-200  py-2'>
            <div className='container grid grid-cols-5 items-center text-lg'>
                <div className="flex gap-2 items-center">
                    <img src={logo} alt="" />
                    <h1 className='text-lg font-medium'>COMFORTY</h1>
                </div>
                <div className='col-span-3'>
                    <form action="" className='flex bg-white rounded-lg px-2 p-1'>
                        <input placeholder='Search here...' className='w-full outline-none' type="text" />
                        <button><CiSearch /></button>
                    </form>
                </div>
                <div className='flex justify-end items-center gap-2'>
                    <div className='flex items-center gap-2 bg-white px-2 p-1 rounded'>
                        <CiShoppingCart />
                        <p className='text-sm'>29</p>
                    </div>
                    <div className='bg-white p-1 rounded'><CiHeart /></div>
                    <div className='bg-white p-1 rounded'><CiUser /></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar