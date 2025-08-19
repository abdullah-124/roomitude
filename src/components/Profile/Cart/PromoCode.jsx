import React from 'react'

export default function PromoCode() {
  return (
    <form action="" className=''>
        <label className='py-2 block font-semibold text-gray-600 ' htmlFor="">Promo Code</label>
        <input className='w-full rounded p-2 border_bg focus:bg-[var(--bg)] outline-0' type="text" placeholder='Cupon Code' />
        <button className='mt-2 btn w-full block '>Apply</button>
    </form>
  )
}
