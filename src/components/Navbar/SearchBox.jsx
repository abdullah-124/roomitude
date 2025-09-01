import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
    const apiURL = import.meta.env.VITE_API_URL
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState([]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim() !== "" && query.length > 2) {
                fetchData();
            }
            else{
                setResults([])
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.length > 2) {
            fetchData();
        }
        else setResults([]);
    };
    async function fetchData() {
        const response = await fetch(`${apiURL}/api/products/search?q=${query}`);
        const data = await response.json();
        console.log(data)
        setResults(data.result);
    }
    return (
        <form className='relative ' onSubmit={(e) => handleSearch(e)}>
            <div className='flex bg-white rounded-lg overflow-hidden'>
                <input placeholder='Search here...' className='input ' type="text" value={query}
                    onChange={(e) => setQuery(e.target.value)} />
                <button type='submit' className='px-2 hover:bg-[var(--sbg)] hover:text-white transition-all duration-300'><CiSearch /></button>
            </div>
            {
                /* result */
                query.trim() !== "" && <section className='absolute top-[100%]  z-[100] w-full bg-white rounded-b-lg' >
                    <div className='text-sm pb-3'>
                        {
                            results?.length > 0 ? results.map(item => (
                                <div key={item.id} className='px-2 cursor-default hover:bg-[var(--bg)] flex justify-between items-center py-2 border-b border-gray-200'>
                                    <div className='leading-3 flex items-center gap-2'>
                                        <img src={item.image} className='w-10 h-10 object-cover' alt="" />
                                        <div>
                                            <h3 className='font-semibold'>{item.name}</h3>
                                            <p className='text-xs'>{item.category.name}</p>
                                        </div>
                                    </div>
                                    <p className='font-semibold text_hl'>${item.exact_price}</p>
                                </div>
                            )) : <p className='p-2 text-gray-500'>No results found</p>
                        }
                    </div>
                </section>

            }

        </form>
    )
}
