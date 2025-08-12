import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'

function AllCategories() {
    const [show, setShow] = useState(false)
    const { categories } = useContext(AppContext)
    return (
        <div tabIndex={0} className='relative pe-4 md:ps-0 categories_ul'>
            <li onClick={() => setShow(!show)} className='cursor-pointer'>All Categories</li>
            {
                show && <ul className={`hidden z-50 bg-white border-gray-200 md:absolute shadow rounded w-full left-0 top-[100%]`}>
                    {categories.map((category) => (
                        <li key={category.id} className="text-sm border border-transparent hover:border-[var(--sbg)] cursor-default px-2 p-1 rounded">
                            {category.name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default AllCategories