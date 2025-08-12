import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import PriceRangeSlider from './PriceRange'
import SortBy from './SortBy';
import FilterByCategory from './FilterByCategory';

function ProductFilter_Sidebar({ params, setFilter, setParams }) {
    const formRef = useRef(null)
    const resetForm = () => {
        setParams({})
        formRef.current.reset(); // native reset clears input values
    };
    return (
        <main>
            <form ref={formRef} className='md:sticky top-1 col-span-1 md:flex md:flex-col grid grid-cols-2 gap-1 md:gap-4'>
                <FilterByCategory setParams={setParams} />
                <div className='flex flex-col md:gap-4 gap-1'>
                    {/* price range */}
                    <PriceRangeSlider setParams={setParams} />
                    <SortBy setParams={setParams} />
                </div>
                <div className='flex gap-2 col-span-2'>
                    <button onClick={(e) => {
                        setFilter(true)
                        e.preventDefault()
                    }} className={`${Object.keys(params).length ? 'btn' : 'btn_disable'} w-full`}>Filter</button>
                    <button onClick={resetForm} className={`${Object.keys(params).length ? 'btn' : 'btn_disable'} w-full`}>Reset</button>
                </div>
            </form>
        </main>
    )
}

export default ProductFilter_Sidebar