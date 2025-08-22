import React, { useMemo } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useCart } from '../../../context/CartProvider'
import useOrder from '../../../context/OrderContext'
import PaymentMethod from './PaymentMethod';

function ProductInformation() {
    const { removeFromCart } = useCart()
    const { info, shippingMethods, update_shipping_method, order } = useOrder()
    const { items, summery } = order
    return (
        <main>
            <h3 className='text-lg font-semibold'>Product Information</h3>
            <section>
                <div className='py-2 border-b border-[var(--bg)]'>
                    {
                        items?.map(item => (
                            <div key={item.id} className='p-3 hover:bg-[var(--bg)] transition-all duration-500 grid grid-cols-4 rounded'>
                                <div className='col-span-3 flex gap-3 items-center'>
                                    <img className='border_bg w-12 h-12 object-cover' src={item.image} alt={item.name} />
                                    <div>
                                        <h6>{item.name}</h6>
                                        <p className='font-medium'>{item.quantity} X <span>${item.exact_price}</span></p>
                                        {item?.message && <p className='text-xs text-red-500'>{item.message}</p>}
                                    </div>
                                </div>
                                <div className='flex flex-col items-end justify-between '>
                                    <button><IoCloseSharp /></button>
                                    <h5 className='text-base font-semibold'>${item.total_price}</h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='p-2 flex flex-col border-b border-[var(--bg)] pb-2 font-medium'>
                    <div className='flex justify-between items-center'>
                        <p>Sub Total:</p>
                        <p className='font-semibold text-lg'>${summery?.sub_total}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Cupon Discount:</p>
                        <p className='font-semibold text-lg'>{info.discount}%</p>
                    </div>
                </div>
                {/* shipping type */}
                <div className="p-2 border-b border-[var(--bg)]">
                    {
                        shippingMethods.map((i, idx) => (
                            <div key={idx} className='flex justify-between items-center font-semibold'>
                                <div className='flex gap-2 text-base '>
                                    <input
                                        onChange={() => update_shipping_method(i.id)}
                                        checked={i.id == info.shipping}
                                        type="radio" name="shipping_type" id="shipping_type" />
                                    {i.label}
                                </div>
                                <p>${i.price}</p>
                            </div>
                        ))
                    }

                </div>
                <div className='p-2 flex justify-between text-2xl font-bold'>
                    <h4>Total</h4>
                    <h3>${summery?.total}</h3>
                </div>
            </section>
        </main>
    )
}

export default ProductInformation