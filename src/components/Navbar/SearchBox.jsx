import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import ProductQuickViewModal from '../Modal/ProductQuickViewModal';
import SearchResultCard from '../Cards/SearchResultCard';

export default function SearchBox() {
    const apiURL = import.meta.env.VITE_API_URL
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.trim() !== "" && query.length > 2) {
                fetchData();
            }
            else {
                setResults([])
                setLoading(false)
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.length > 2) {
            fetchData();
        }
        else {
            setResults([]);
            setLoading(false)
        }
    };
    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(`${apiURL}/api/products/search?q=${query}`);
            const data = await response.json();
            console.log(data)
            setResults(data.result);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
        finally {
            setLoading(false);
        }
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
                query.trim() !== "" && <section className='absolute top-[100%]  z-[100] w-full'>
                    <div className=' bg-white rounded-b-lg' >
                        <div className='text-sm pb-3'>
                            {
                                loading ? <p className='p-2 text-gray-500'>Loading...</p> : results?.length > 0 ? results.map(item => (
                                    <SearchResultCard key={item.id} item={item} />
                                )) : <p className='p-2 text-gray-500'>No results found</p>
                            }
                        </div>
                    </div>
                </section>

            }

        </form>
    )
}
