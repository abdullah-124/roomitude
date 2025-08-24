import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useOrder from '../../../context/OrderContext'
import { useMessage } from '../../../context/MessageProvider'
import { useCart } from '../../../context/CartProvider'

export default function PaymentMethod({is_valid}) {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(true)
    const { info, update_info, place_order } = useOrder()
    const {setToast} = useMessage()
    const {reset_cart_state} = useCart()
    function update_payment_method(value) {
        update_info('payment_method', value)
    }
    async function handle_place_order() {
        const order = await place_order()
        if(order) {
            setToast('Order placed successfully', 'success')
            reset_cart_state()
        }
        if(info.payment_method=='card'){
            navigate(`/payment/stripe/${order.id}`, { replace: true });
        }
    }
    return (
        <section className='sticky top-2 border_bg p-5 rounded-lg'>
            <h3 className='p-2 text-xl font-semibold'>Payment Method</h3>
            <div className='flex items-center gap-2 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <input
                        onChange={(e) => update_payment_method(e.target.value)}
                        value='card' type="radio" name="payment_method" checked={info.payment_method == 'card'}
                    />
                    <label htmlFor="payment_method">Card</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input
                        onChange={(e) => update_payment_method(e.target.value)}
                        value='cash_on_delivery' type="radio" name="payment_method" checked={info.payment_method == 'cash_on_delivery'}
                    />
                    <label htmlFor="payment_method">Cash on delivery</label>
                </div>

            </div>
            <div className='flex items-center gap-2 pt-5'>
                <input onChange={() => setAgree(!agree)} checked={agree} className='w-5 h-5' type="checkbox" name="agree" id='agree' />
                <p className='text-xl'>I agree all terms & conditions</p>
            </div>
            <div className='flex gap-2 mt-5'>
                <Link to='/profile/cart' className='btn_outline text-lg'>Back to cart</Link>
                <button disabled={!agree || !is_valid} onClick={handle_place_order} className='btn text-lg'>Place order</button>
            </div>
        </section>
    )
}
