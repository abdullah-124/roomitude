import { FaPlus, FaMinus, FaAws } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useCart } from '../../../context/CartProvider';
import { useEffect, useState } from "react";
import CartItemsTable from "./CartItemsTable";
import CartPrice_info from "./CartPrice_info";


// cart componants
function Cart({ max_height = 'auto' }) {
  const { items, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart()
  const handle_quantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity)
  }
  
  return (
    <main>
      {
        items?.length ? <section className="w-full grid md:grid-cols-4 grid-cols-1 gap-4">
          <div className="md:col-span-3 border border_bg rounded-lg ">
            <CartItemsTable handle_quantity={handle_quantity} removeFromCart={removeFromCart} items={items} />
          </div>
          <div className="md:col-span-1 ">
            <CartPrice_info />
          </div>
        </section>
        : <h3 className="p-4 text-lg ">Your Cart is empty</h3>
      }
    </main>
  )
}

export default Cart