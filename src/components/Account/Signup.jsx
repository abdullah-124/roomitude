import React, { useContext, useState } from 'react'
import RegisterForm from './RegisterForm'
import { AppContext } from '../../context/AppContext'
import NotFound from '../Notfound/NotFound'
import { IoMdClose } from "react-icons/io";
import LoginForm from './LoginForm';

function Signup({form='signup'}) {
    const { user } = useContext(AppContext)
    const [mode, setMode] = useState(form)
    const [error, setError] = useState('')
    if (user) {
        return <NotFound />
    }
    return (
        <section className='container'>
            <div className='pt-10  sm:w-2/3 md:w/1/2 lg:w-1/3 mx-auto p-5 shadow-2xl rounded-lg mb-10'>
            {
                // error message 
                error && <div className='mb-2 px-2 rounded flex items-center justify-between p-1 bg-red-300 text-red-600'>
                    <p>{error}</p>
                    <IoMdClose onClick={()=>setError('')} className='text-2xl hover:border hover:border-red-400 rounded'/>
                </div>
            }
                {
                    mode == 'signin' ? <LoginForm setError={setError} setMode={setMode} />
                        : <RegisterForm setError={setError} setMode={setMode} />
                }
            </div>
        </section >
    )
}

export default Signup