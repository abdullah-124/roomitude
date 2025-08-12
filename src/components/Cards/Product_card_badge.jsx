import React from 'react'

function Product_card_badge({ is_featured, discount }) {
    return (
        <div className='absolute z-10 p-2 text-xs text-white'>
            {
                is_featured ? <div className='p-1 bg-green-500 rounded'>featured </div> : 
                discount ? <div className='p-1 bg-red-500 rounded'>{discount}% off </div> : null
            }
        </div>
    )
}

export default Product_card_badge