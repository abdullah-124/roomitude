import React from 'react'
import { useLocation } from 'react-router';
import Verify_messge from './Verify_messge';
import Token_verification from './Token_verification';

function Verify_email() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    return (
        <div className='min-h-[40vh] w-full sm:w-2/3 lg:w-1/3 mx-auto'>
            {
                token == null ? <Verify_messge /> : <Token_verification />
            }
        </div>

    )
}

export default Verify_email