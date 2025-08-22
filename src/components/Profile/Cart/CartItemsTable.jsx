import React from 'react'
import { IoIosCheckbox, IoMdAdd, IoMdRemove, IoMdTrash } from "react-icons/io";

export default function CartItemsTable({ items, handle_quantity, removeFromCart }) {
    return (
        <section className="relative overflow-x-auto ">
            <h2 className='p-2 font-bold text_hl'>Total {items?.length || 0} items in cart </h2>
            <table className="w-full text-sm text-center rtl:text-right  dark:text-gray-400">
                <thead className="sticky top-0 text-xs uppercase bg-[var(--bg)]">
                    <tr>
                        <th scope="col" className="px-2 py-3">
                            Sl
                        </th>
                        <th scope="col" className="text-left px-2 py-3 min-w-[180px]">
                            Product info
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-2 py-3">
                            Total Price
                        </th>
                        <th scope="col" className="px-2 py-3 text-end">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, idx) => (
                            <tr key={idx} className="bg-white border-t border-[var(--bg)] hover:bg-[var(--bg)]/50">
                                <td className='px-2'>
                                    {idx + 1}
                                </td>
                                <td scope="row" className="p-2 text-left">
                                    <div className="flex items-center gap-2 max-w-[200px]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <p>${item.exact_price}</p>
                                    <div className='text-base flex items-center justify-center'>
                                        <button onClick={() => handle_quantity(item.id, item.quantity - 1)} className='p-1 bg-[var(--bg)]'><IoMdRemove /></button>
                                        <p className='px-2 border_bg'>{item.quantity}</p>
                                        <button onClick={() => handle_quantity(item.id, item.quantity + 1)} className='p-1 bg-[var(--bg)]'><IoMdAdd /></button>
                                    </div>
                                </td>
                                <td className="p-2 text-lg font-semibold">
                                    ${(item.exact_price * item.quantity).toFixed(2)}
                                </td>
                                <td className="p-2 text-end text-xl">
                                    <button onClick={() => removeFromCart(item.id)} className='text-red-500/80 hover:text-red-500'><IoMdTrash /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}
