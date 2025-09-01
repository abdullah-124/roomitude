import React from 'react'
import { useParams } from 'react-router';
import ProductDetailsCard from '../Cards/ProductDetailsCard';
import useWishlist from '../../context/WishlistContext';
import { useCart } from '../../context/CartProvider';
import ProductCard from '../Cards/ProductCard';

function ProductDetails() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { add_item_in_wishlist } = useWishlist()
    const { addToCart } = useCart()
    const [details, setDetails] = React.useState(null);
    const { product_id } = useParams();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 100,
            behavior: "smooth"
        })
    })
    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products/${product_id}`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [product_id]);

    return loading ? <h2>Loading...</h2> : (
        <main className='container padding pb-10'>
            <section className='grid grid-cols-1 lg:grid-cols-5 lg:gap-5 gap-y-5'>
                <div className='col-span-3 border_bg rounded'>
                    <ProductDetailsCard product={details.product} />
                </div>
                <div className='lg:col-span-2 '>
                    <div className='flex w-full flex-col gap-y-2 border_bg rounded p-4'>
                        <button onClick={() => addToCart(details.product)} className='btn_outline'>ADD TO CART</button>
                        <button onClick={() => add_item_in_wishlist(details.product.id)} className='btn'>ADD TO WISHLIST</button>
                    </div>
                    {
                        details?.related_products?.length > 0 && <div className='border_bg rounded p-4 mt-5'>
                            <h3 className='py-4 font-bold text-lg'>Product You Might Like</h3>
                            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                                {
                                    details?.related_products.map(item => (
                                        <ProductCard key={item.id} item={item} />
                                    ))
                                }
                            </div>
                        </div>
                    }
            </div>
        </section >
        </main >
    )
}

export default ProductDetails