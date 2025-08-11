import React, { useEffect, useState } from 'react'
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link, useLocation } from 'react-router';
import { getUser } from '../../utils/getUser';
import UserMenuBar from './UserMenuBar';


function UserInfo({ user }) {
    const [userMenu, setUserMenu] = useState(false)
    const location = useLocation()
    useEffect(() => {
        setUserMenu(false)
    }, [location])
    return (
        <div className='relative'>
            <div className='flex justify-end items-center gap-2'>

                {
                    user ? <>
                        <Link to="/cart/" className='flex items-center gap-1 bg-white px-2 p-1 rounded hover'>
                            <CiShoppingCart />
                            <p className='text-sm'>29</p>
                        </Link>
                        <Link to='/wishlist' className='flex items-center gap-1 bg-white px-2 p-1 rounded hover'>
                            <CiHeart />
                            <p className='text-sm'>2</p>
                        </Link>
                        <div onClick={() => setUserMenu(!userMenu)} className='bg-[var(--sbg)] border  border-[var(--sbg)] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer text-white'>
                            {
                                user.profile_image_url ? <img className='rounded-full' src={user.profile_image_url} />
                                    : <p className='font-medium text-2xl'>{user.username.slice(0, 2)}</p>
                            }
                        </div>
                        {userMenu && <UserMenuBar user={user} />}
                    </> :
                        <>
                            <Link to={'/account'} className='btn text-sm'>Sign up</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default UserInfo