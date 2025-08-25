import React from 'react'
import { GiSofa } from "react-icons/gi";

export default function LOGO() {
    const string = 'FURNITURE'
    return (
        <div className="flex gap-2 items-center ">
            <GiSofa className='text_hl text-6xl' />
            <div className='leading-none flex flex-col justify-between'>
                <h1 className='text-lg font-medium'>ROOMITUDE</h1>
                <div className='flex justify-between items-center'>
                    {
                        string.split('').map((char, idx) => (<span key={idx} className='text-xs'>{char}</span>))
                    }
                </div>
            </div>
        </div>
    )
}
