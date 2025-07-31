import React, { useState } from 'react'

function Signup() {
    const [mode, setMode] = useState('signin')
    return (
        <section className='container'>
            <div className='mt-20  sm:w-2/3 md:w/1/2 lg:w-1/3 mx-auto p-5 shadow-2xl rounded-lg'>
            {
                mode == 'signin' ? <form action="">
                    <h2 className='text-xl pb-5 font-medium text-center'>Sign In</h2>
                    <input className='input border border-[var(--sbg)] my-2 rounded' type="email" name="email" placeholder='Email' />
                    <input className='input border border-[var(--sbg)] my-2 rounded' type="password" name="password" placeholder='password' />
                    <button className='btn w-full mt-3'>Sign In</button>
                    <p className='my-4 text-center'>Don’t have account? <span onClick={() => setMode('signup')} className='text_hl'>Sign Up</span></p>
                </form>
                    :
                    //  user registraiton 
                    <form action="">
                        <h2 className='text-xl pb-5 font-medium text-center'>Sign up</h2>
                        <div className='flex gap-1'>
                            <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="firstname" name="name" placeholder='First name' />
                            <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="lastname" name="name" placeholder='Last name' />
                        </div>
                        <div className='flex gap-1'>
                            <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="email" name="email" placeholder='Email' />
                            <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="tel" name="phone" placeholder='Phone Number' />
                        </div>
                       
                        <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="text" name="address" placeholder='Address' />
                        <input className='input border border-[var(--sbg)]/70 my-2 rounded' type="password" name="password" placeholder='password' />
                        <button className='btn w-full mt-3'>Sign In</button>
                        <p className='my-4 text-center'>Already have an account? <span onClick={() => setMode('signin')} className='text_hl'>Sign In</span></p>
                    </form>
            }
            </div>
        </section >
    )
}

export default Signup