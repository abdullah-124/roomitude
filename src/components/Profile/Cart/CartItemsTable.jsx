import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function CartItemsTable({ cartItems }) {
    return (
        <div className="overflow-x-auto h-full">
            <table className="min-w-full">
                <thead className='sticky top-0'>
                    <tr className="bg-gray-100 text-left font-semibold text-gray-600  ">
                        <th className="px-2 pb-4">Product Info</th>
                        <th className="px-2 pb-4">Price</th>
                        <th className="px-2 pb-4">Quantity</th>
                        <th className="px-2 pb-4">Total</th>
                        <th className="px-2 pb-4">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t overflow-hidden border-[var(--bg)]  hover:bg-[var(--bg)] transition-all duration-500 "
                        >
                            {/* Product Info */}
                            <td className="p-4 flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover"
                                />
                                <div>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                    <p className="font-medium">{item.name}</p>
                                </div>
                            </td>

                            {/* Price */}
                            <td className="p-4 font-semibold">${item.exact_price}</td>

                            {/* Quantity */}
                            <td className="p-4">
                                <div className='flex items-center'>
                                    <button className='p-1 bg-[var(--bg)]'><FaMinus /></button>
                                    <p className='px-2 '>{item.quantity}</p>
                                    <button className='p-1 bg-[var(--bg)]'><FaPlus /></button>
                                </div>
                            </td>

                            {/* Total */}
                            <td className="p-4 font-semibold">
                                ${item.total_price}
                            </td>

                            {/* Remove */}
                            <td className="p-4">
                                <button className="text-red-500 hover:text-red-700 text-xl">
                                    <AiOutlineClose />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
