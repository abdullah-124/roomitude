import React, { useContext, useState } from 'react'
import Signin_Form from './Signin_Form'
import RegisterForm from './RegisterForm'
import { AppContext } from '../../context/AppContext'
import NotFound from '../Notfound/NotFound'

function Signup() {
    const { user } = useContext(AppContext)
    const [mode, setMode] = useState('signup')
    if (user) {
        return <NotFound />
    }
    return (
        <section className='container'>
            <div className='pt-10  sm:w-2/3 md:w/1/2 lg:w-1/3 mx-auto p-5 shadow-2xl rounded-lg'>
                {
                    mode == 'signin' ? <Signin_Form setMode={setMode} />
                        : <RegisterForm setMode={setMode} />
                }
            </div>
        </section >
    )
}

export default Signup