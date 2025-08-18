import React from 'react'
import useWishlist from '../../context/WishlistContext'
import ProductCard from '../Cards/ProductCard'

function Wishlist() {
  const {wishlist} = useWishlist()
  return (
    <div>
      <h1>MY WISHLIST {wishlist.length || 0}</h1>
      <div className='grid grid-cols-3'>
        {
          wishlist.map((item,idx)=>(
            <ProductCard key={idx} item={item.product} />
          ))
        }
      </div>
    </div>
  )
}

export default Wishlist