import React, { useEffect, useState } from 'react'

function AllCategories() {
    const [show, setShow] = useState(false)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('http://127.0.0.1:8000/api/categories/')
            const data = await res.json()
            setCategories(data)
        };

        fetchCategories();
    }, []);
    return (
        <div tabIndex={0} className='relative pe-4 md:ps-0 ps-3 categories_ul'>
            <li className='cursor-pointer'>All Categories</li>
            <ul  className={`hidden z-50 backdrop-blur-2xl md:absolute shadow rounded w-full left-0 top-[100%]`}>
                {categories.map((category) => (
                    <li key={category.id} className="text-sm border border-transparent hover:border-[var(--sbg)] cursor-default px-2 p-1 rounded">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllCategories