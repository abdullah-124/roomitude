import React from 'react'
import paymentImg from '/images/payment.png'
import { GiRockingChair } from "react-icons/gi";
function Footer() {
  return (
    <footer className='container mt-30'>
      <section className='py-5 grid md:grid-cols-3 grid-cols-1 gap-2'>
        <article>
          <div className='flex items-center gap-2 text-3xl font-bold'>
            <GiRockingChair className='text_hl' />
            <h2>Roomitude</h2>
          </div>
          <p className='my-3'>Roomitude brings comfort and style to your space with expertly crafted chairs. Designed for every room, made for everyday living.</p>
        </article>

        <div className='flex justify-evenly items-start'>
          <ul>
            <li className='text_s'>Category</li>
            <li className='hover'>Sofa</li>
            <li className='hover'>Armchair</li>
            <li className='hover'>Wing Chair</li>
            <li className='hover'>Wooden Chair</li>
            <li className='hover'>Park Bench</li>
          </ul>
          <ul className='text-end'>
            <li className='text_s'>Support</li>
            <li className="hover">Help & Support</li>
            <li className="hover">Tearms & Conditions</li>
            <li className="hover">Privacy Policy</li>
            <li className="hover">Help</li>
          </ul>
        </div>
        <div className='text_s'>
          <p className="text_s">Newslatter</p>
          <form className='flex items-center gap-2' action="">
            <input className='border border-[var(--sbg)] rounded input' type="email" placeholder='your email' />
            <button className='btn'>Subscribe</button>
          </form>
          <div>
            <h4 className='text-lg text-black font-medium'>Stay seated in style.</h4>
            <p>Subscribe to Roomitude for exclusive chair designs, styling tips, and special offers—straight to your inbox.</p>
          </div>
        </div>
      </section>
      <section className='py-5 text_s border-t'>
        <div className='flex justify-between'>
          <p>&copy; 2021 - Blogy - Designed & Develop by Zakirsoft</p>
          <img className='opacity-50' src={paymentImg} alt="" />
        </div>
      </section>
    </footer>
  )
}

export default Footer