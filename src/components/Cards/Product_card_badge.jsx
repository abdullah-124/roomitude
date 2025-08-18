import React from 'react'
import { RiShoppingBag2Line, RiHeartLine, RiEyeLine, RiHeart3Fill } from "react-icons/ri";
import { useCart } from '../../context/CartProvider';
import useWishlist from '../../context/WishlistContext';


// Product card badge 
function Product_card_badge({ setModal, product, listed = false }) {
    const { addToCart } = useCart()
    const { add_item_in_wishlist, remove_item_from_wishlist } = useWishlist()
    const { is_featured, discount } = product
    return (
        <div className='absolute border w-full h-full z-10 p-3 text-sm text-white'>
            {
                is_featured ? <button className='p-1 px-3 bg-green-500 rounded-full'>featured </button> :
                    discount ? <button className='p-1 px-3 bg-red-500 rounded-full'>{discount}% off </button> : null
            }
            <div className='badge'>
                {
                    listed ? <div onClick={() => remove_item_from_wishlist(product.id)} className='icon'>
                        <RiHeart3Fill className='text-2xl text-red-500' />
                        <div className="text">Remove From Wishlist</div>
                    </div> : <div onClick={() => add_item_in_wishlist(product.id)} className='icon'>
                        <RiHeartLine className='text-xl' />
                        <div className="text">Add To Wishlist</div>
                    </div>
                }
                <div onClick={() => addToCart(product)} className='icon'>
                    <RiShoppingBag2Line className='text-xl' />
                    <div className="text">Add To Cart</div>
                </div>
                <div className='icon' onClick={() => setModal(true)}>
                    <RiEyeLine className='text-xl' />
                    <div className="text">Quick View</div>
                </div>
            </div>
        </div>
    )
}

export default Product_card_badge