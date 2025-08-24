import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'   // ✅ missing
import PromoCode from '../Cart/PromoCode'
import { AppContext } from '../../../context/AppContext'
import useOrder from '../../../context/OrderContext'

function BillingInformaion({ setIs_valid }) {
  const { update_info } = useOrder()
  const { user } = useContext(AppContext)
  const [show, setShow] = useState(false)
  const initial_info = {
    full_name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    email: user?.email || '',
    address: user?.address || "",
    city: user?.city || "",
    phone: user?.phone_number || "",
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, } = useForm({
      defaultValues: initial_info
    });

  useEffect(() => {
    if (!isValid) {
      setIs_valid(false)
    }
  }, [isValid])

  const onSubmit = (data) => {
    setIs_valid(true)
    console.log("Billing Info:", data);
    update_info('billing_information', data)
    // call your place order API here
  };
  return (
    <main>
      <div className='p-3 border_bg rounded'>
        <h3 className='text-sm'>Are you missing your coupon code ?<span onClick={() => setShow(!show)} className='text_hl ps-2'>Click here to add</span></h3>
        {show && <PromoCode />}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="font-semibold text-lg pt-5">Billing Information</h2>
        {/* Billing Info */}
        <div className="py-2">
          <input
            {...register("full_name", { required: "Full Name is required" })}
            placeholder="Full Name"
            className="form_input"
          />
          {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
          <input
            {...register("email", { required: "Email address is required" })}
            placeholder="Email Address"
            className="form_input"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="form_input"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

          <div className='flex gap-2'>
            <input
              {...register("city", { required: "City is required" })}
              placeholder="City"
              className="form_input"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            <input
              {...register("postal_code", { required: "Postal code is required" })}
              placeholder="Postal Code"
              type='number'
              className="form_input"
            />
            {errors.postal_code && <p className="text-red-500 text-sm">{errors.postal_code.message}</p>}
          </div>

          <input
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Phone must be at least 10 digits" },
            })}
            placeholder="Phone"
            className="form_input"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <button disabled={!isValid} type='submit' className='btn text-lg'>Save</button>
      </form>
    </main>
  )
}

export default BillingInformaion