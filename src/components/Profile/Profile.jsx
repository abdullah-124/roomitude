// pages/Profile.jsx
import { Outlet, useLocation } from "react-router";
import Sidebar from "./Sidebar";

import product_header from '/images/product_header.png'

export default function Profile() {
  const pathname = useLocation().pathname.slice(1)
  return (
    <main className="container padding pb-10 ">
      <section className="">
        <header className='col-span-4 relative mb-5 '>
          <img src={product_header} alt="" className='object-cover absolute w-full h-full -z-10' />
          <div className=' text-center z-10 py-10 bg-[#0000009c] text-white rounded-lg'>
            <h2 className='text-2xl font-bold'>Account</h2>
            <p className='py-1'>{pathname}</p>
          </div>
        </header>
        <main className="grid sm:grid-cols-4 grid-cols-1 gap-5">
          <aside className="sticky top-0 z-[50] w-full border border-[var(--bg)] rounded-lg sm:bg-white bg-[var(--bg)]"><Sidebar /></aside>
          <aside className="sm:col-span-3 w-full min-h-[50vh] "><Outlet /></aside>
        </main>
      </section>
    </main >
  );
}
