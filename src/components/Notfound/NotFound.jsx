import React from 'react'
import notfound from '/images/notfound.png'
import { Link } from 'react-router'
function NotFound() {
  return (
    <div className='container flex justify-center items-center'>
      <div className='text-center p-10 relative'>
        <img src={notfound} alt="" />
        <div className='p-5 bg-[var(--bg)]/30 w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10'>
          <h2 className='text-7xl font-bold'>404</h2>
          <h4>Page you looking for is Not Fount</h4>
        <Link to='/' className='btn mt-5 inline-block '>Back to home</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound