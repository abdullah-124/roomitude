import React from 'react'
import PromoCode from './PromoCode'

export default function CartPrice_info() {
    return (
        <div>
            <PromoCode />
            <div className='text-sm border_bg font-semibold rounded-lg my-5 p-4 '>
                <div className='flex flex-col gap-1 border-b border-[var(--bg)] pb-2'>
                    <div className='flex justify-between items-center'>
                        <p>Sub Total:</p>
                        <p>$870</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>Cupon Discount:</p>
                        <p>$22</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>VAT:</p>
                        <p>$2</p>
                    </div>
                </div>
                {/* shipping type */}
                <from className="flex flex-col gap-1 py-3 border-b border-[var(--bg)]">
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <input type="radio" name="shipping_type" id="shipping_type" />
                            Home Delevery
                        </div>
                        <p>$10</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <input type="radio" name="shipping_type" id="shipping_type" />
                            Fast Shipping
                        </div>
                        <p>$10</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <input type="radio" name="shipping_type" id="shipping_type" />
                            Cash On Delevery
                        </div>
                        <p>$10</p>
                    </div>
                </from>
                <div className='text-xl font-bold pt-3 flex justify-between items-center'>
                    <p>Total:</p>
                    <p>$233</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button className='btn'>Checkout</button>
                <button className='btn'>Continue Shopping</button>
            </div>
        </div>
    )
}
