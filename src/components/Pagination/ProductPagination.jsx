import React from 'react'
import { FaChevronRight,FaChevronLeft  } from "react-icons/fa";
const PAGE_SIZE = 12;


function ProductPagination({ count, currentPage, setCurrentPage }) {
    const totalPages = Math.ceil(count / PAGE_SIZE);
    const handle_next_prev = (id) =>{
        if((currentPage > 1 && id==-1) || (currentPage < totalPages && id==1)){
            setCurrentPage(currentPage + id)
        }
    }
    return (
        <div className='flex justify-center gap-1'>
            {/* previous page */}
            <button onClick={()=>handle_next_prev(-1)} className='font-medium p-1 px-2 border border-[var(--bg)] hover:border-[var(--sbg)] rounded '>
                <FaChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, idx) => (
                <div
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`${idx + 1 == currentPage && 'bg-[var(--sbg)] text-white rounded'}`}>
                    <button className='font-medium p-1 px-3 border border-[var(--bg)] hover:border-[var(--sbg)] rounded '>
                        {idx + 1}
                    </button>
                </div>
            ))}
            {/* next page */}
            <button onClick={()=>handle_next_prev(1)} className='font-medium p-1 px-2 border border-[var(--bg)] hover:border-[var(--sbg)] rounded '>
                <FaChevronRight />
            </button>
        </div>
    )
}

export default ProductPagination