import React, { useContext, useState } from 'react'
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { NavLink } from 'react-router';
import { MdClose } from 'react-icons/md';
import UserInfo from './UserInfo';
import { AppContext } from '../../context/AppContext';
import LOGO from './LOGO';

function Navbar() {
    const [show, setShow] = useState(false)
    const { user } = useContext(AppContext)
    return (
        <>
            <nav className='bg-[var(--bg)]  py-2'>
                <div className='container  grid md:grid-cols-4 grid-cols-2 items-center text-lg md:gap-y-0 gap-y-3'>
                    {/* logo */}
                    <div className="order-1 ">
                        <LOGO />
                    </div>
                    {/* search */}
                    <div className='col-span-2 md:order-2 order-3'>
                        <form action="" className='flex bg-white rounded-lg overflow-hidden'>
                            <input placeholder='Search here...' className='input' type="text" />
                            <button className='px-2 hover:bg-[var(--sbg)] hover:text-white transition-all duration-300'><CiSearch /></button>
                        </form>

                    </div>
                    {/* user info */}
                    <div className='md:order-3 order-2'>
                        <UserInfo user={user} />
                    </div>
                </div>
            </nav>
            {/* navlink */}
            <section className=''>
                <div className='py-3 top-0 container flex justify-between items-center relative'>
                    <div onClick={() => setShow(!show)} className='md:hidden block text-2xl'>
                        {
                            show ? <MdClose /> : <CiMenuBurger />
                        }
                    </div>
                    {/* large device  */}
                    <ul className='md:flex items-center hidden gap-x-5'>
                        <li><NavLink to='' className='navLink'>Home</NavLink></li>
                        <li><NavLink to='/products/' className={({ isActive }) => isActive ? "active" : "navLink"
                        }>Products</NavLink></li>
                        <li><NavLink to='/about/' className={({ isActive }) => isActive ? "active" : "navLink"
                        }>About</NavLink></li>
                    </ul>
                    {
                        // mobile nav 
                        show && <ul className='expand bg-white absolute z-[50] top-[100%] left-0 p-2 py-5 w-full  flex flex-col md:hidden'>
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
            </section>
        </>
    )
}

export default Navbar