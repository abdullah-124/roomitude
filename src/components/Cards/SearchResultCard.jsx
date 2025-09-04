import React from 'react'
import ProductQuickViewModal from '../Modal/ProductQuickViewModal'


export default function SearchResultCard({ item}) {
    const [modal, setModal] = React.useState(false);
    return (
        <section onClick={() => setModal(true)} className='px-2 cursor-default hover:bg-[var(--bg)] flex justify-between items-center py-2 border-b border-gray-200'>
            <div className='leading-3 flex items-center gap-2'>
                <img src={item.image} className='w-10 h-10 object-cover' alt="" />
                <div>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-xs'>{item.category.name}</p>
                </div>
            </div>
            <p className='font-semibold text_hl'>${item.exact_price}</p>

            {modal && <ProductQuickViewModal setModal={setModal} product={item} />}

        </section>
    )
}
