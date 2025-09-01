import React from 'react'
import LOGO from '../Navbar/LOGO'

export default function CustomLoading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='relative'>
        <LOGO />
        <div className=' flex justify-between items-center z-[10]'>
          {
            'LOADING'.split('').map((char, idx) => (
              <span key={idx} className='text-4xl animate-pulse'>{char}</span>
            ))
          }
        </div>
      </div>
    </div>
  )
}
