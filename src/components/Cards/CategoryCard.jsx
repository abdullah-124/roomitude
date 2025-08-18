import React from 'react'
import {Link} from 'react-router'

function CategoryCard({category}) {
    return (
        <Link to={`/products/${category.slug}`} className="block p-2">
            <div className="relative h-60 rounded-lg overflow-hidden shadow-md group">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/70 bg-opacity-50 text-white p-3">
                    <h3 className=" font-medium ">{category.name}</h3>
                    <p className="text-sm font-bold text_hl">{category.product_count} Items</p>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard