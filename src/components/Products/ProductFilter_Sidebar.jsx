import React, { useEffect, useState } from 'react'
import PriceRangeSlider from './PriceRange'
import SortBy from './SortBy';
import FilterByCategory from './FilterByCategory';
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useNavigate } from 'react-router';

function ProductFilter_Sidebar({ setPage, setQuery, setTitle }) {
    const navigate = useNavigate()
    const [filterBtn, setFilterBtn] = useState(false)
    const [resetBtn, setResetBtn]= useState(false)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [url, setUrl] = useState(new URLSearchParams(location.search))
    useEffect(() => {
        if(url.toString()){
            setFilterBtn(true)
            // console.log('btnurl', url.toString())
        }
        else{
            setFilterBtn(false)
        }
    }, [url])
    function handle_filter() {
        navigate('/products/')
        setTitle('Filter Result ')
        // set query to update the ui
        setPage(1)
        setQuery(url)
        // console.log(url.toString())
        setFilterBtn(false)
        setResetBtn(true)
    }
    function handle_reset(){
        setQuery(new URLSearchParams())
        setUrl(new URLSearchParams())
        setSelectedCategories([])
        setFilterBtn(false)
        setResetBtn(false)
        setTitle(null)
    }
    return (
        <main>
            <div className='md:sticky top-1 col-span-1 md:flex md:flex-col grid grid-cols-2 gap-1 md:gap-4'>
                <FilterByCategory selected={selectedCategories} setSelected={setSelectedCategories} url={url} setUrl={setUrl} />
                <div className='flex flex-col md:gap-4 gap-1'>
                    {/* price range */}
                    <PriceRangeSlider url={url} setUrl={setUrl} />
                    <SortBy url={url} setUrl={setUrl} />
                </div>
                <div className='flex gap-2 col-span-2'>
                    <button onClick={handle_filter} className={`btn_icon w-full ${filterBtn ? 'btn' : 'btn_disable'}`}><LuFilter />Filter</button>
                    <button onClick={handle_reset} className={`btn_icon w-full ${resetBtn ? 'btn' : 'btn_disable'}`}><LuFilterX />Reset</button>
                </div>
            </div>
        </main>
    )
}

export default ProductFilter_Sidebar