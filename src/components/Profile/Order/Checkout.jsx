import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import BillingInformaion from './BillingInformaion';
import ProductInformation from './ProductInformation';
import { useCart } from '../../../context/CartProvider';
import PaymentMethod from './PaymentMethod';

function Checkout() {
    const { items } = useCart()
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (!location.state?.fromCart) {
            // User came here directly, redirect to cart
            navigate("/profile/cart", { replace: true });
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [location, navigate]);


    return (
        <main className='container padding pb-10'>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[50vh]'>
                <aside className='border_bg rounded-lg p-5'>
                    <BillingInformaion />
                </aside>
                <aside className='border_bg rounded-lg p-5'>
                    <ProductInformation />
                </aside>
                <aside className='lg:col-span-1 md:col-span-2 '>
                    <PaymentMethod />
                </aside>
            </section>
        </main>
    )
}

export default Checkout