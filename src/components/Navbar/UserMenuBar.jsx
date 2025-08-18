import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck, BsPencilSquare } from "react-icons/bs";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router';
import { useMessage } from '../../context/MessageProvider';
import { useCart } from '../../context/CartProvider';

function UserMenuBar({ user, setUserMenu }) {
    const { logout } = useContext(AppContext)
    const { updateMessage } = useMessage()
    const { reset_cart_state } = useCart()
    const style = 'p-1 hover:text-[var(--sbg)] transition-all duration-400 rounded cursor-pointer flex gap-2 justify-end items-center'
    const handleLogout = async () => {
        reset_cart_state()
        await logout(updateMessage);  // pass updateUser to logout
    };
    return (
        <main onClick={()=> setUserMenu(false)} className="fixed w-full right-0 top-0 h-full pt-14 z-100 text-end">
            <section onClick={(e)=>e.stopPropagation()} className='inline-block bg-white p-4 text-end z-50 shadow rounded border border-[var(--sbg)]/50 me-2'>
                <ul className='text-sm flex font-medium flex-col gap-1'>
                    {/* basic info about user */}
                    <div className='font-normal text-center bg-gray-200 p-2 rounded-lg '>
                        <div className='border border-[var(--sbg)] rounded-full flex justify-center items-center w-15 h-15 mx-auto'>
                            {
                                user.profile_image ? <img className='rounded-full' src={user.profile_image} alt="user image" /> :
                                    <p className='bg-[var(--sbg)] pt-2 w-full h-full rounded-full text-5xl uppercase text-white'>{user.username.slice(0, 1)}</p>
                            }
                        </div>
                        <div className='font-medium'>
                            <p>{user.username}</p>
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <Link to='/profile/account' className={style}>Profile<FaRegUser /></Link>
                    <Link to="profile/my_order/" className={style}>My Orders <BsCartCheck /></Link>
                    <Link to="profile/update_password" className={style}>Update Password <BsPencilSquare /></Link>
                    <button onClick={() => handleLogout()} className='btn my-2'>Logout</button>
                </ul>
            </section>
        </main>
    )
}

export default UserMenuBar