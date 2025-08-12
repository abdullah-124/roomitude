import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import PriceRangeSlider from './PriceRange'

function ProductFilter_Sidebar() {
    const { categories } = useContext(AppContext)
    // We'll keep selected categories in an array
    const [selected, setSelected] = useState([]);
    const handleCheckboxChange = (category) => {
        if (selected.includes(category)) {
            // Remove category if already selected
            setSelected(selected.filter((c) => c !== category));
        } else {
            // Add category if not selected
            setSelected([...selected, category]);
        }
    };
    return (
        <div className='col-span-1 flex md:flex-col gap-1 md:gap-4'>
            {/* category */}
            <div className='w-full text-sm border border-gray-200 rounded shadow p-2'>
                <h3 className='text-lg font-medium'>Categories</h3>
                {
                    categories.map((c, idx) => (
                        <label key={idx} className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                checked={selected.includes(c.name)}
                                onChange={() => handleCheckboxChange(c.name)}
                            />
                            <span className="ml-2">{c.name}</span>
                            <span>({c.product_count})</span>
                        </label>
                    ))
                }
            </div>
            {/* price range */}
            <div className='w-full shadow rounded border border-gray-200'>
                <PriceRangeSlider />
            </div>
        </div>
    )
}

export default ProductFilter_Sidebar