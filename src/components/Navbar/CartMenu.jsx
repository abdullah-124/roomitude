import React from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useCart } from '../../context/CartProvider';
import { Link } from 'react-router';


function CartMenu({ setCartMenu }) {
  const {items, cartCount, cartTotal,removeFromCart, updateQuantity  } = useCart()
  const handle_quantity = (itemId, quantity) =>{
    updateQuantity(itemId, quantity)
  }
  return (
    <main onClick={()=>setCartMenu(false)} className='fixed w-full right-0 top-0 h-full pt-14 z-100'>
      <div onClick={(e)=>e.stopPropagation()} className='w-[300px]  bg-white float-right mr-3 border border-[var(--sbg)]/40'>
        {
          items.length ? <div className='text-sm'>
            <h3 className='text-lg font-medium px-5 py-2 shadow'>Cart List (<span>{cartCount}</span>)</h3>
            <div className='px-5 flex flex-col max-h-[300px] overflow-y-scroll shadow'>
              {
                items.map((item, idx) => (
                  // card
                  <div key={idx} className='py-2 grid grid-cols-3 border-b border-[var(--bg)] cursor-pointer gap-x-2'>
                    <img src={item.image} alt="" />
                    <div className='col-span-2 '>
                      <div className='flex justify-between items-center'>
                        <h3 className='font-bold text-base text_hl'>{item.exact_price}$</h3>
                        {/* delete cart item */}
                        <button onClick={()=>removeFromCart(item.id)} className='bg-[var(--bg)] text-white hover:bg-[var(--sbg)]'><MdClose /></button>
                      </div>
                      <h3 className='py-1'>{item.name}</h3>
                      <div className='flex items-center'>
                        <button onClick={()=>handle_quantity(item.id, item.quantity - 1)} className='p-1 bg-[var(--bg)]'><FaMinus /></button>
                        <p className='px-2 '>{item.quantity}</p>
                        <button onClick={()=>handle_quantity(item.id, item.quantity + 1)} className='p-1 bg-[var(--bg)]'><FaPlus /></button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='px-5 py-1'>
              <div className='text-sm flex justify-between items-center'>
                <h2 className=''>Items Count</h2>
                <h2>{cartCount}</h2>
              </div>
              <div className='text-lg flex justify-between items-center'>
                <h2 className=''>Total amount</h2>
                <h2>{cartTotal}$</h2>
              </div>
              <Link to='/profile/cart/' className='block btn w-full my-3'>Procced To Checkout</Link>
            </div>
          </div> : <h3 className='p-3 text-gray-500'>Cart is empty</h3>
        }
      </div>
    </main>
  )
}

export default CartMenu