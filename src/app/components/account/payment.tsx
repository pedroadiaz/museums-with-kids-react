import React, { useEffect, useState } from 'react';
import {
    CardElement,
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
import { User } from '@auth0/auth0-react';

export const Payment = (props: {
    user: User
}) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async(e: any) => {
        e.preventDefault();

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const paymentMethod = await stripe.createPaymentMethod({
            card: elements.getElement("card")!,
            type: "card",
          });
        
        const response = await fetch(`${process.env.NX_API_URL}/checkout`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: props.user.name,
                email: props.user.email,
                paymentMethod: paymentMethod.paymentMethod?.id
            })
        });

        if (!response.ok) {
            console.log("There was an error processing the payment");
            return;
        }
        const data = await response.json();
        const confirm = await stripe.confirmCardPayment(data.clientSecret);
        if (confirm.error) return alert("Payment unsuccessful!");
        alert("Payment Successful! Subscription active.");
        
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
            </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
      </form>
    );
}