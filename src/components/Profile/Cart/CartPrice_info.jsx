import React from 'react'
import PromoCode from './PromoCode'
import { Link, useNavigate } from 'react-router'
import useOrder from '../../../context/OrderContext'
import { useCart } from '../../../context/CartProvider';

export default function CartPrice_info() {
    const navigate = useNavigate();
    const { info, total, shippingMethods, update_shipping_method } = useOrder()
    const {cartTotal} = useCart()

    const goToCheckout = () => {
        navigate("/checkout", { state: { fromCart: true } });
    };
    return (
        <div>
            <PromoCode />
            <div className='text-sm border_bg font-semibold rounded-lg my-5 p-4 '>
                <div className='flex flex-col gap-1 border-b border-[var(--bg)] pb-2'>
                    <div className='flex justify-between items-center'>
                        <p>Sub Total:</p>
                        <p>${cartTotal}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Cupon Discount:</p>
                        <p>{info.discount}%</p>
                    </div>
                </div>
                {/* shipping type */}
                <div className="flex flex-col gap-1 py-3 border-b border-[var(--bg)]">
                    {
                        shippingMethods.map((i, idx) => (
                            <div key={idx} className='flex justify-between items-center'>
                                <div className='flex gap-2 text-xs'>
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
                <div className='text-xl font-bold pt-3 flex justify-between items-center'>
                    <p>Total:</p>
                    <p>${total}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button onClick={goToCheckout} className='btn'>Checkout</button>
                <Link to='/products/' className='btn'>Continue Shopping</Link>
            </div>
        </div>
    )
}
