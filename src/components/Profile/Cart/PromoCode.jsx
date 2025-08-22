import React, { useEffect, useState } from 'react'
import useOrder from '../../../context/OrderContext'

export default function PromoCode() {
  const { apply_promo_code } = useOrder()
  const [cupon, setCupon] = useState('')
  const [btn, setBtn] = useState(false)
  useEffect(()=>{
    if(!btn && cupon)setBtn(true)
  })
  const handle_submit = () => {
    apply_promo_code(cupon)
  }
  return (
    <section className=''>
      <p className='py-2 block font-semibold text_hl'>Promo Code</p>
      <div className='flex md:flex-col flex-row gap-2'>
        <input
          onChange={(e) => setCupon(e.target.value)}
          className='w-full rounded p-2 border_bg focus:bg-[var(--bg)] outline-0 uppercase text-base'
          type="text" placeholder='Cupon Code' />
        <button
          onClick={handle_submit}
          className={`${btn ? 'btn' : 'btn_disable'} w-full`}>
          Apply</button>
      </div>
    </section>
  )
}
