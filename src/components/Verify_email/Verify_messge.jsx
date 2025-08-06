import React from 'react'
import { GiRockingChair } from "react-icons/gi";
import { getUser } from '../../utils/getUser';


export default function Verify_messge() {
    const user = getUser()
    return (
        <div className='text-center p-10'>
            <div>
                {/* logo */}
                <div className="order-1 flex gap-2 justify-center items-center ">
                    <GiRockingChair className='text-orange-500 font-bold text-2xl' />
                    <h1 className='text-lg font-medium'>ROOMITUDE</h1>
                </div>
                <h3 className='text_hl font-medium py-2'>Thank you for creating account</h3>
                <h4 className='text-sm'>We have sent an email to <span className="font-medium">{user?.email}</span> plese verify this email to active your account</h4>
                <a target='_blank' href="https://mail.google.com/mail/" className="btn inline-block mt-5 ">Verify Email</a>
            </div>
        </div>
    )
}
