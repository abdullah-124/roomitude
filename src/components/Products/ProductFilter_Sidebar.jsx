import React, { useContext, useRef, useState } from 'react'
import { useSearchParams } from 'react-router';
import { AppContext } from '../../context/AppContext'
import PriceRangeSlider from './PriceRange'
import SortBy from './SortBy';
import FilterByCategory from './FilterByCategory';

function ProductFilter_Sidebar({ setQuery }) {
    const formRef = useRef(null)
    const [active, setActive] = useState(false)
    // reset form and url parameters
    const resetForm = (e) => {
        formRef.current.reset(); // native reset clears input values
        setQuery(null)
        setActive(false)
    };
    // Update URL parameter
    const [searchParams, setSearchParams] = useSearchParams();
    const handle_filter = (e) =>{
        e.preventDefault()
        setQuery(searchParams)
        setActive(false)
    }
    const updateUrl = (updates) => {
        const newParams = new URLSearchParams(searchParams);
        let shouldResetPage = false;
        Object.entries(updates).forEach(([key, value]) => {
            if (value === '' || value === null || value === undefined ||
                (Array.isArray(value) && value.length === 0)) {
                newParams.delete(key);
            } else {
                if (Array.isArray(value)) {
                    newParams.set(key, value.join(','));
                } else {
                    newParams.set(key, value.toString());
                }
            }
            if (key !== 'page') {
                shouldResetPage = true;
            }
        });

        if (shouldResetPage) {
            newParams.delete('page');
            setActive(false)
        }
        setActive(true)
        setSearchParams(newParams);
    };
    return (
        <main>
            <form ref={formRef} className='md:sticky top-1 col-span-1 md:flex md:flex-col grid grid-cols-2 gap-1 md:gap-4'>
                <FilterByCategory updateUrl={updateUrl} />
                <div className='flex flex-col md:gap-4 gap-1'>
                    {/* price range */}
                    <PriceRangeSlider updateUrl={updateUrl} />
                    <SortBy updateUrl={updateUrl} />
                </div>
                <div className='flex gap-2 col-span-2'>
                <button onClick={(e) => handle_filter(e)} className={`w-full ${active ? 'btn':'btn_disable'}`}>Filter</button>
                    <button onClick={(e) => resetForm(e)} className={`w-full ${active ? 'btn':'btn_disable'}`}>Reset</button>
                </div>
            </form>
        </main>
    )
}

export default ProductFilter_Sidebar