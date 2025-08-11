import React, { useContext } from 'react'
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck, BsPencilSquare } from "react-icons/bs";
import logout from '../../utils/logout';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router';

function UserMenuBar({ user }) {
    const { updateUser, updateMessage } = useContext(AppContext)
    const style = 'p-1 hover:text-[var(--sbg)] transition-all duration-400 rounded cursor-pointer flex gap-2 justify-end items-center'
    const handleLogout = async () => {
        await logout(updateUser, updateMessage);  // pass updateUser to logout
    };
    return (
        <section className='absolute top-[100%] mt-1 right-0 bg-white p-4 text-end z-50 shadow rounded'>
            <ul className='text-sm flex font-medium flex-col gap-1'>
                {/* basic info about user */}
                <div className='font-normal text-center bg-gray-200 p-2 rounded-lg '>
                    <div className='border border-[var(--sbg)] rounded-full flex justify-center items-center w-15 h-15 mx-auto'>
                        {
                            user.profile_image_url ? <img className='rounded-full' src={user.profile_image_url} alt="user image" /> :
                                <p className='bg-[var(--sbg)] w-full h-full rounded-full text-5xl uppercase text-white'>{user.username.slice(0, 1)}</p>
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
    )
}

export default UserMenuBar