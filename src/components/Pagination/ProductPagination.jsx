import React from 'react'

const PAGE_SIZE = 12;


function ProductPagination({ count, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(count / PAGE_SIZE);
    return (
        <div className='flex justify-center items-center gap-1'>
            {[...Array(totalPages)].map((_, idx) => (
                <div 
                key={idx} 
                onClick={()=> setCurrentPage(idx+1)}
                className={`${idx+1==currentPage && 'bg-[var(--sbg)] text-white rounded'}`}>
                    <button  className='font-medium p-1 px-2 border border-[var(--bg)] hover:border-[var(--sbg)] rounded '>
                        {idx+1}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ProductPagination