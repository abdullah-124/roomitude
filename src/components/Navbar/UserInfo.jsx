import React, { useEffect, useState } from 'react'
import { RiShoppingBag2Line, RiHeartLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router';
import UserMenuBar from './UserMenuBar';
import CartMenu from './CartMenu';
import { useCart } from '../../context/CartProvider';
import WishListMenu from './WishlistMenu';


function UserInfo({ user }) {
    const [userMenu, setUserMenu] = useState(false)
    const [cartMenu, setCartMenu] = useState(false)
    const [wishListMenu, setWishlistMemu] = useState(false)
    const location = useLocation()
    const {cartCount} = useCart()
    useEffect(() => {
        setUserMenu(false)
        setCartMenu(false)
    }, [location])
    return (
        <div className='relative'>
            {cartMenu && <CartMenu setCartMenu={setCartMenu}/>}
            <div className='flex justify-end items-center gap-2'>

                <div onClick={() => setCartMenu(!cartMenu)} className={`${cartMenu && 'text_hl'} flex items-center gap-1 bg-white  p-1 rounded hover`}>
                    <RiShoppingBag2Line />
                    {
                        cartCount>0 && <p className='text-sm'>{cartCount}</p>
                    }
                </div>
                {
                    user ? <>
                        <div onClick={()=> setWishlistMemu(!wishListMenu)} className={`flex items-center gap-1 bg-white px-2 p-1 rounded hover`}>
                            <RiHeartLine />
                            <p className='text-sm'>2</p>
                        </div>
                        <div onClick={() => setUserMenu(!userMenu)} className='bg-white p-[2px]  border  border-[var(--sbg)] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer text_hl'>
                            {
                                user.profile_image_url ? <img className='rounded-full' src={user.profile_image_url} />
                                    : <p className='font-medium pt-1 text-2xl'>{user.username.slice(0, 2)}</p>
                            }
                        </div>
                        <>
                            {userMenu && <UserMenuBar user={user} setUserMenu={setUserMenu} />}
                            {wishListMenu && <WishListMenu setWishListMenu={setWishlistMemu} />}
                        </>
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