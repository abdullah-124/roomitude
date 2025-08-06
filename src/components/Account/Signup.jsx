import React, { useState } from 'react'
import Signin_Form from './Signin_Form'
import RegisterForm from './RegisterForm'

function Signup() {
    const [mode, setMode] = useState('signin')
    return (
        <section className='container'>
            <div className='mt-20  sm:w-2/3 md:w/1/2 lg:w-1/3 mx-auto p-5 shadow-2xl rounded-lg'>
                {
                    mode == 'signin' ? <Signin_Form setMode={setMode} />
                        : <RegisterForm setMode={setMode} />
                }
            </div>
        </section >
    )
}

export default Signup