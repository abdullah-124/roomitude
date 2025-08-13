
const save_to_database = async (product_id, quantity = 1) => {
    try {
        const payload = {
            product_id: product_id,
            quantity: quantity
        }
        // Send POST request to backend
        const response = await fetch("http://127.0.0.1:8000/api/cart/add_item/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // If using JWT
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Failed to add item to cart");
        }

        const data = await response.json();
        console.log("Cart updated:", data);
        alert("Product added to cart!");
    } catch (error) {
        console.error(error);
        alert("Something went wrong while adding to cart.");
    }
}

export default async function addToCart(product, quantity = 1) {
    const accessToken = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    if (accessToken && user) {
        save_to_database(product.id, quantity)
    }
    else {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingIndex = cart.findIndex(p => p.id === product.id);

        if (existingIndex !== -1) {
            // If already in cart → increase quantity
            cart[existingIndex].quantity += 1;
        } else {
            product.quantity = quantity
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Saved to localStorage:", cart);
        alert("Added to cart (local)");
    }
}

