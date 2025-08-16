export async function get_cart_item() {
    const accessToken = await localStorage.getItem('accessToken')
    const user = await localStorage.getItem('user')
    if (accessToken && user) {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/cart/", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error fetching cart count:", err);
        }
    }
    const localCart = await JSON.parse(localStorage.getItem("cart")) || [];
    return localCart;
}