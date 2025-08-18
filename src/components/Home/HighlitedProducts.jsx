import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import ProductCard from '../Cards/ProductCard'
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { Link } from 'react-router';

function HighlitedProducts() {
    const { products } = useContext(AppContext)
    return (
        <main className='container padding'>
            <div className='pb-10 w-full sm:w-2/3 md:w-1/2 mx-auto text-center flex flex-col gap-2 items-center '>
                <MdOutlineWorkspacePremium className='text-8xl text_hl' />
                <h3 className='text-3xl font-bold'>Exclusive Products</h3>
                <p className='leading-5'> Discover our handpicked exclusive products, crafted with quality and style to make your space truly unique.</p>
            </div>
            <section className='grid grid-cols-4 gap-5'>
                {
                    products.map((item, idx) => (
                        <ProductCard key={idx} item={item} />
                    ))
                }
            </section>
            <div className='text-center my-5 mb-10'>
                <Link to='/products/' className='btn text-lg'>View more</Link>
            </div>
        </main>
    )
}

export default HighlitedProducts