import React from 'react'
import { RiShoppingBag2Line, RiHeartLine, RiEyeLine   } from "react-icons/ri";
import { useCart } from '../../context/CartProvider';


// Product card badge 
function Product_card_badge({ setModal, product }) {
    const {addToCart } = useCart()
    const {is_featured, discount} = product
    return (
        <div className='absolute border w-full h-full z-10 p-3 text-sm text-white'>
            {
                is_featured ? <button className='p-1 px-3 bg-green-500 rounded-full'>featured </button> : 
                discount ? <button className='p-1 px-3 bg-red-500 rounded-full'>{discount}% off </button> : null
            }
            <div className='badge'>
            <div className='icon'>
                <RiHeartLine  className='text-xl' />
                <div className="text">Add To Wishlist</div>
            </div>
            <div onClick={()=>addToCart(product)} className='icon'>
                <RiShoppingBag2Line className='text-xl' />
                <div className="text">Add To Cart</div>
            </div>
            <div className='icon' onClick={()=>setModal(true)}>
                <RiEyeLine  className='text-xl' />
                <div className="text">Quick View</div>
            </div>
            </div>
        </div>
    )
}

export default Product_card_badge