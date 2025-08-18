import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';

function FilterByCategory({ selected, setSelected, url, setUrl }) {
    const { categories } = useContext(AppContext)
    // We'll keep selected categories in an array
    
    const handleCheckboxChange = (category) => {
        let updatedCategories;
        if (selected.includes(category)) {
            // Remove category
            updatedCategories = selected.filter((c) => c !== category);
        } else {
            // Add category
            updatedCategories = [...selected, category];
        }

        setSelected(updatedCategories);
        const newUrl = new URLSearchParams(url.toString());
        newUrl.set('categories', updatedCategories)
        setUrl(newUrl)

    };
    return (
        <div className='w-full text-sm border border-gray-200 rounded shadow p-2'>
            <h3 className='text-lg font-medium'>Categories</h3>
            {
                categories.map((c, idx) => (
                    <label key={idx} className="flex gap-1 items-center">
                        <input
                            type="checkbox"
                            checked={selected.includes(c.slug)}
                            onChange={() => handleCheckboxChange(c.slug)}
                        />
                        <span className="ml-2">{c.name}</span>
                        <span>({c.product_count})</span>
                    </label>
                ))
            }
        </div>
    )
}

export default FilterByCategory