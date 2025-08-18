import React from 'react'
import { GiRockingChair } from 'react-icons/gi'

export default function LOGO() {
    return (
        <div className="flex gap-2 items-center ">
            <GiRockingChair className='text_hl font-bold text-2xl' />
            <h1 className='text-lg font-medium'>ROOMITUDE</h1>
        </div>
    )
}
