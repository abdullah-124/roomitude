import React from 'react'
import { createPortal } from 'react-dom';
import { RiCloseCircleFill } from 'react-icons/ri'
import ProductDetailsCard from '../Cards/ProductDetailsCard';

function ProductQuickViewModal({ setModal, product }) {
    
    return createPortal(
        <section onClick={() => setModal(false)} className='p-5 fixed inset-0 bg-black/50 z-[999] flex items-center justify-center overflow-hidden'>
            <div onClick={(e) => e.stopPropagation()} className='lg:w-1/2 md:w-2/3 w-full md: mx-auto bg-white overflow-y-scroll h-[70vh]'>
                <header onClick={() => setModal(false)} className='sticky top-0 flex justify-between items-center px-5 p-2 shadow-lg backdrop-blur-2xl'>
                    <h6 className='text-sm'>{product.name}</h6>
                    <RiCloseCircleFill onClick={()=>setModal(false)} className='text-red-500 hover:text-red-600 text-2xl' />
                </header>
                <main>
                    <ProductDetailsCard product={product} />
                </main>
            </div>
        </section>, document.body
    );
};

export default ProductQuickViewModal