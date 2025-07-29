import React from 'react'
import chair from '/images/banner_chair.png'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { SlSocialDropbox } from 'react-icons/sl'
import { CiDeliveryTruck, CiTimer } from 'react-icons/ci'
import { RiSecurePaymentLine } from 'react-icons/ri'
function Header() {
    return (
        <div className='container'>
            <div className="padding bg-gray-200 pb-10">
                <section className='grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-5 items-center'>
                    <div className='md:order-1 order-2 md:text-start text-center'>
                        <p className='uppercase'>Wellcome to roomitude</p>
                        <h1 className='lg:text-6xl text-4xl font-bold'>
                            Best Furniture
                            Collection for your
                            interior.
                        </h1>
                        <button className='btn mt-3 inline-flex items-center gap-2'>Shop now
                            <IoIosArrowRoundForward className='text-4xl' />
                        </button>
                    </div>
                    <div className='md:order-2 order-1'>
                        <img src={chair} alt="" />
                    </div>
                </section>
            </div>
            {/* feature */}
            <section className='padding -translate-y-[20px]'>
                <div className='bg-white shadow p-5 rounded-2xl grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center'>
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

export default Header