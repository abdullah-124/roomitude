import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useParams } from "react-router";

const stripePromise = loadStripe("YOUR_PUBLIC_KEY");

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const {order_id} = useParams()
  useEffect(() => {
    // Call backend to create PaymentIntent
    fetch("http://127.0.0.1:8000/api/payment/stripe/create-payment-intent/", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }, 
      body: JSON.stringify({ order_id: order_id }), // amount in cents
    })
    .then(res => res.json())
    .then(data => {
      setClientSecret(data.clientSecret);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("✅ Payment successful:", paymentIntent);
      // You can call your backend to create an Order now
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2" />
      <button type="submit" disabled={!stripe || !clientSecret} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Pay Now
      </button>
    </form>
  );
};

export default function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm />
    </Elements>
  );
}
