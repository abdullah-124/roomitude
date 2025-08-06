import React from 'react'

function Message({user}) {
    console.log
    return (
        <div>
            {user && !user?.is_active && <h3 className='text-center bg-orange-500 text-white text-sm'>We have sent an email to {user?.email} , please verify the mail to activate your account</h3> }
        </div>
    )
}

export default Message