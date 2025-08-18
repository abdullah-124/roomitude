import React from 'react'
import { FaRegHandshake } from "react-icons/fa6";

export default function Sponsors() {
  return (
    <main className='container py-2 '>
      <div className='w-full sm:w-2/3 md:w-1/2 mx-auto text-center flex flex-col gap-2 items-center '>
        <FaRegHandshake className='text-8xl text_hl' />
        <h3 className='text-3xl font-bold'>Trusted Partner</h3>
        <p className='leading-5'>Count on our trusted partnerships to deliver excellence. Collaborating with industry leaders ensures top-quality products and services for your satisfaction.</p>
      </div>
      <div className='flex flex-wrap justify-evenly gap-5 '>
        <img src="/images/sponsor1.png" alt="" />
        <img src="/images/sponsor2.png" alt="" />
        <img src="/images/sponsor3.png" alt="" />
        <img src="/images/sponsor4.png" alt="" />
        <img src="/images/sponsor5.png" alt="" />
        <img src="/images/sponsor6.png" alt="" />
        <img src="/images/sponsor7.png" alt="" />
      </div>
    </main>
  )
}
