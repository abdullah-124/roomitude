// pages/Profile.jsx
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

import product_header from '/images/product_header.png'

export default function Profile() {
  return (
    <main className="container padding pb-10">
      <section className="grid md:grid-cols-4 grid-cols-1 gap-5">
        <header className='md:col-span-4 relative '>
          <img src={product_header} alt="" className='object-cover absolute w-full h-full -z-10' />
          <div className=' text-center z-10 py-10 bg-[#0000009c] text-white rounded-lg'>
            <h2 className='text-2xl font-bold'>Account</h2>
            <p className='py-1'>account/name</p>
          </div>
        </header>
        <aside className="md:col-span-1 h-full sticky top-0 z-[50] border border-gray-200 rounded-lg"><Sidebar /></aside>
        <aside className="md:col-span-3 border border-gray-200 rounded-lg p-4 min-h-[50vh]"><Outlet /></aside>
      </section>
    </main >
  );
}
