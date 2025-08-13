import React from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
function CartMenu({ cartItems }) {
  let total_price = cartItems.reduce((sum, item)=>{
    return sum + item.exact_price * item.quantity
  }, 0)
  return (
    <div className='fixed right-0 top-14  bg-white w-[300px] h-auto z-100'>
      {
        cartItems.length ? <div className='p-5 text-sm'>
        <h3 className='text-lg font-medium py-3'>Cart List (<span>{cartItems.length}</span>)</h3>
        <div className='flex flex-col max-h-[300px] overflow-y-scroll'>
          {
            cartItems.map((item,idx) =>(
              <div key={idx} className='py-2 grid grid-cols-3 border-b border-gray-200 gap-x-2'>
                <img src={item.image} alt="" />
                <div className='col-span-2 '>
                  <h3 className='font-bold text-base text_hl'>{item.exact_price}$</h3>
                  <h3 className='py-1'>{item.name}</h3>
                  <div className='flex items-center'>
                    <button className='p-1 bg-[var(--bg)]'><FaMinus/></button>
                    <p className='px-2 '>{item.quantity}</p>
                    <button className='p-1 bg-[var(--bg)]'><FaPlus/></button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='border-t py-1'>
          <div className='text-sm flex justify-between items-center'>
            <h2 className=''>Items Count</h2>
            <h2>{cartItems.length}</h2>
          </div>
          <div className='text-lg flex justify-between items-center'>
            <h2 className=''>Total amount</h2>
            <h2>{total_price}$</h2>
          </div>
          <button className='btn w-full mt-3'>Procced To Checkout</button>
        </div>
      </div> :<h3 className='p-3 text-gray-500'>Cart is empty</h3>
      }
    </div>
  )
}

export default CartMenu