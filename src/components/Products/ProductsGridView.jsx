import React from 'react'
import ProductCard from '../Cards/ProductCard'

function ProductsGridView({ products }) {
    return (
        <main className='w-full'>
            {
                products ? <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3">
                    {
                        products.map((item, idx) => <ProductCard key={idx} item={item} />)
                    }
                </div> : <h3>No Products found</h3>
            }
        </main>
    )
}

export default ProductsGridView