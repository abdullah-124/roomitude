import React from 'react'

function SortBy({ url, setUrl }) {
    const options = [
        { 'value': 'price_asc', 'label': 'Highest Price' },
        { 'value': 'price_desc', 'label': 'Lowest Price' },
        { 'value': 'newest', 'label': 'Newest' },
        { 'value': 'oldest', 'label': 'Oldest' },
        { 'value': 'best_sellers', 'label': 'Seles' },
        { 'value': 'rating', 'label': 'Rating' },
    ]
    const add_sort_by_to_params = (e) => {
        const newUrl = new URLSearchParams(url.toString())
        newUrl.set('sortBy', e.target.value)
        setUrl(newUrl);
    }
    return (
        <div className='p-2 w-full shadow rounded border border-[var(--bg)]'>
            <h3 className='text-lg font-medium'>Sort By :</h3>
            {
                options.map((option, idx) => (
                    <div key={idx} className='flex gap-2 items-center'>
                        <input
                            onClick={(e) => add_sort_by_to_params(e)}
                            type="radio" name="sortBy" id="sortBy" value={option.value} />
                        <label htmlFor="sortBy">{option.label}</label>
                    </div>
                ))
            }
        </div>
    )
}

export default SortBy