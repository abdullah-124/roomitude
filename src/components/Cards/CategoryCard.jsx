import React from 'react'

function CategoryCard({category}) {
    return (
        <div className="p-2">
            <div className="relative h-60 rounded-lg overflow-hidden shadow-md group">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/70 bg-opacity-50 text-white p-3">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                    <p className="text-xs">{category.count}</p>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard