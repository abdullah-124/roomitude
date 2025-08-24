import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { useMessage } from "./MessageProvider";


const OrderContext = createContext()

export function OrderProvider({ children }) {
    const { setToast } = useMessage()
    const shippingMethods = [
        { id: "standard", label: "Standard (3–5 days)", price: 10 },
        { id: "express", label: "Express (1–2 days)", price: 20 },
        { id: "pickup", label: "In-Store Pickup", price: 0 },
    ];
    const { cartTotal } = useCart()
    const [info, setInfo] = useState({
        discount: 0, shipping: 'standard', 'shipping_cost': 10, payment_method: 'card'
    })
    // PROMO CODE FUNCTION
    async function apply_promo_code(cupon) {
        console.log('cupon got 10% discount')
        setInfo(prev => ({
            ...prev,
            discount: 10,
            promo_code: cupon
        }))
    }
    function update_shipping_method(shipping_id) {
        const shipping = get_shipping(shipping_id)
        setInfo(prev => ({
            ...prev,
            shipping: shipping_id,
            shipping_cost: shipping?.price
        }))
        console.log(info)
    }
    function update_info(option, value) {
        setInfo(prev => ({
            ...prev,
            [option]: value,
        }))
        console.log(info)
    }
    // get shippping cost by id
    function get_shipping(id) {
        return shippingMethods.find(i => i.id == id)
    }
    // calculate total
    function calculate_total(sub_total = cartTotal) {
        // If subTotal is passed from backend → prefer that, else fallback to cartTotal
        const discounted = (sub_total * (info?.discount || 0)) / 100
        const result = sub_total + info.shipping_cost - discounted
        return Number(result.toFixed(2));
    }
    const total = useMemo(() => calculate_total(), [cartTotal, info])

    const [order, setOrder] = useState({ items: [], summery: {} })
    // load products
    useEffect(() => {
        // console.log(JSON.stringify(info))
        async function load_order_info() {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/order/checkout/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(info)  // ✅ no "data:" wrapper
                });

                if (!res.ok) {
                    // Try to read error from server
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Request failed");
                }
                const data = await res.json();
                console.log("Response:", data);
                setOrder(data);
            } catch (err) {
                console.error("Checkout error:", err.message);
            }
        }
        load_order_info()
    }, [info, cartTotal])

    //  PLACE ORDER AFTER CHECKOUT
    const place_order = async () => {
        if(!info.billing_information){
            setToast('Add billing information to place order', 'error', 3000)
            return
        }
        const payload = {
            ...order,
            billing_information : info.billing_information
        }
        console.log(payload);
        // return
        try {
            const res = await fetch('http://127.0.0.1:8000/api/order/place_order/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({'order': payload})
            })
            const data = await res.json()
            console.log(data)
            return data
        } catch (err) {
            setToast(err.message || 'SOMETHINGS WENT WRONG', 'error')
        }
    }
    //  RETURNING ALL VALUE 
    return <OrderContext.Provider value={{ info, apply_promo_code, total, shippingMethods, update_shipping_method, update_info, order, place_order }}>
        {children}
    </OrderContext.Provider>
}

export default function useOrder() {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context
}