import React from 'react'
import { CiDeliveryTruck, CiTimer } from 'react-icons/ci'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { SlSocialDropbox } from 'react-icons/sl'

function Features() {
    return (
        <div className='max-w-[1200px] mx-auto'>
            {/* feature */}
            <section className=' padding -translate-y-[30px]'>
                <div className='bg-white shadow p-5 rounded-lg grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center'>
                    <div className='flex gap-3 items-center'>
                        <SlSocialDropbox className='text-7xl' />
                        <div>
                            <h5 className='text-2xl font-medium'>Discount</h5>
                            <p className='text-sm'>Every Week New Sales</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <CiDeliveryTruck className='text-7xl' />
                        <div>
                            <h5 className='text-2xl font-medium'>Free Delivery</h5>
                            <p className='text-sm'>100% Free for all orders</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <CiTimer className='text-7xl' />
                        <div>
                            <h5 className='text-2xl font-medium'>Great Support 24/7</h5>
                            <p className='text-sm'>We care your experiences</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <RiSecurePaymentLine className='text-7xl' />
                        <div>
                            <h5 className='text-2xl font-medium'>Secure Payment
                            </h5>
                            <p className='text-sm'>100% Secure Payment Method</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features

