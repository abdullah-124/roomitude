import React, { useContext, useState } from 'react'
import PromoCode from '../Cart/PromoCode'
import { AppContext } from '../../../context/AppContext'

function BillingInformaion() {
  const [show, setShow] = useState(false)
  const { user } = useContext(AppContext)
  const [form_data, setForm_data] = useState({
    'full_name': `${user?.first_name} ${user?.last_name}`,
    'email': user?.email,
    'phone_number': user?.phone_number,
    'address': user?.address,
  })
  const handle_change = (e) => {
    setForm_data(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handle_sumbit = () => {
    console.log(form_data)
  }
  return (
    <main>
      <div className='p-3 border_bg rounded'>
        <h3 className='text-sm'>Are you missing your coupon code ?<span onClick={() => setShow(!show)} className='text_hl ps-2'>Click here to add</span></h3>
        {show && <PromoCode />}
      </div>
      <form className='py-3 flex flex-col gap-y-2' action={handle_sumbit}>
        <h3 className='text-xl font-semibold'>Billing Information</h3>
        <div>
          <label className='' htmlFor="full_name">Full Name</label>
          <input onChange={(e) => handle_change(e)} className='form_input' type="text" name='full_name' id='full_name' placeholder='Enter your full name' value={form_data?.full_name} />
        </div>
        <div>
          <label className='' htmlFor="email">Email</label>
          <input onChange={(e) => handle_change(e)} className='form_input' type="email" name='email' id='email' placeholder='Enter your Email' value={form_data?.email} />
        </div>
        <div>
          <label className='' htmlFor="phone_number">Phone Number</label>
          <input onChange={(e) => handle_change(e)} className='form_input' type="tel" name='phone_number' id='phone_number' placeholder='Enter your phone number' value={form_data?.phone_number} />
        </div>
        <div>
          <p>Address</p>
          <div className='grid grid-cols-3 gap-2'>
            <input onChange={(e) => handle_change(e)} className='form_input' type="text" name='district' id='district' placeholder='District' />
            <input onChange={(e) => handle_change(e)} className='form_input' type="text" name='city' id='city' placeholder='City' />
            <input onChange={(e) => handle_change(e)} className='form_input' type="number" name='zip_code' id='zip_code' placeholder='Zip code' />
            <input onChange={(e) => handle_change(e)} className='col-span-3 form_input' type="text" name='address' id='address' placeholder='Full address' value={form_data?.address} />
          </div>
        </div>
        <div>
          <label className='' htmlFor="notes">Notes</label>
          <input onChange={(e) => handle_change(e)} className='form_input' type="text" name='notes' id='notes' placeholder='Additional notes' />
        </div>
        <button className='btn text-lg'>Save </button>
      </form>
    </main>
  )
}

export default BillingInformaion