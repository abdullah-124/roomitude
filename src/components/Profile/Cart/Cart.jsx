import { FaPlus, FaMinus, FaAws } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useCart } from '../../../context/CartProvider';
import { useEffect, useState } from "react";
import CartItemsTable from "./CartItemsTable";
import CartPrice_info from "./CartPrice_info";


// cart componants
function Cart({ max_height = 'auto' }) {
  const [cartItems, setCartItems] = useState([])
  const { items, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart()
  const handle_quantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity)
  }

  
  return (
    <main>
      <section className="w-full grid lg:grid-cols-4 grid-cols-1 gap-4">
        <div className="lg:col-span-3 border border-[var(--bg)] p-4 rounded-lg">
          <CartItemsTable cartItems={items} />
        </div>
        <div className="lg:col-span-1">
          <CartPrice_info />
        </div>
      </section>
    </main>
  )
}

export default Cart