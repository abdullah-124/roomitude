import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router";
import { AppContext } from '../../context/AppContext'
import { IoIosArrowForward } from "react-icons/io";
function AllCategories() {
    const [show, setShow] = useState(false)
    const { categories } = useContext(AppContext)
    const navigate = useNavigate()
    const goToCategory = (categorySlug) => {
        navigate(`/products?categories=${categorySlug}`);
    };
    return (
        <div className='relative pe-4 md:ps-0 ps-3 categories_ul'>
            <li onClick={() => setShow(!show)} className={`hover:text-[var(--sbg)] cursor-pointer `}>
                All Categories
            </li>
            {
                <ul className={`hidden z-50 bg-white border-gray-200 md:absolute shadow rounded min-w-[200px] w-full left-0 top-[100%] p-2`}>
                    {categories.map((category) => (
                        <li onClick={()=>goToCategory(category.slug)} key={category.id} className="text-sm border border-transparent hover:border-[var(--sbg)] cursor-default px-2 p-1 rounded">
                            {category.name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default AllCategories