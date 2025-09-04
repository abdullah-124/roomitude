import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate, useParams } from "react-router";
import OrderInfo from "./OrderInfo";
import { useMessage } from "../../context/MessageProvider";
import useOrder from "../../context/OrderContext";
import { set } from "react-hook-form";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePaymentForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation()
  const stripe = useStripe();
  const { setToast } = useMessage()
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { order_id } = useParams()
  const { confirm_payment } = useOrder()
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(location.state?.fromOrderPage!==true){
      navigate('/profile/orders')
    }
    async function load_client_secret() {
      try {
        setLoading(true);
        // Create PaymentIntent as soon as the page loads
        const response = await fetch(
          `${apiUrl}/api/payment/stripe/create-payment-intent/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ order_id }),
          }
        );

        if (!response.ok) {
          // Catch HTTP errors (400, 403, 500, etc.)
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create payment intent");
        }
        const data = await response.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
        if (data.order) {
          setOrder(data.order);
        }
      } catch (error) {
        setToast(error.message || "Failed to create payment intent", "error", 3000);
      } finally {
        setLoading(false);
      }
    }
    load_client_secret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      setToast(`Payment failed: ${error.message}`, 'error', 3000);
    } else if (paymentIntent.status === "succeeded") {
      // confirm_payment will change order status
      const data = await confirm_payment(order.id, paymentIntent.id);
      if (data?.status === "success") {
        setToast("Payment successful!", "success", 3000);
        navigate(`/profile/orders/${order.id}`);
      } else {
        setToast(data?.message || "Payment confirmation failed.", "error", 3000);
      }
    }
    setLoading(false);
  };

  return (
    <section className="container padding grid md:grid-cols-2 grid-cols-1 items-start gap-5">
      <aside className="md:order-1 order-2">
        {
          loading ? <p className="text-center mt-10">Loading...</p> : <OrderInfo order={order} />
        }
      </aside>
      <form onSubmit={handleSubmit} className="md:sticky top-0 md:order-2 order-1 w-full max-w-[300px] border_bg  mx-auto p-5 py-10 bg rounded-lg shadow-2xl">
        <CardElement className="form_input border p-2 rounded w-full" />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading}
          className='btn mt-5 '
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </section>
  );
};

export default function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm />
    </Elements>
  );
}
