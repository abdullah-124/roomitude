import React from 'react'
import ProductCard from '../Cards/ProductCard'

function ProductsGridView({products}) {
    return (
        <main className='col-span-3'>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {
                    products.map((item, idx) => <ProductCard key={idx} item={item} />)
                }
            </div>
        </main>
    )
}

export default ProductsGridView