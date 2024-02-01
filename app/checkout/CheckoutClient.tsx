'use client'
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/products/Button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();

  console.log("paymentIntent", paymentIntent);

  useEffect(() => {
    if (cartProducts && paymentIntent) {  // Asegurarse de que paymentIntent no sea undefined
      setLoading(true);
      setError(false);

      fetch("/api/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent
        })
      }).then((res) => {
        setLoading(false);
        if (res.status === 401) {
          return router.push('/login');
        }
        return res.json();
      }).then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      }).catch((error) => {
        console.log("Error", error);
        toast.error('Algo anduvo mal');
      });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating'
    }
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
 return <div className="w-full"> 
 {clientSecret && cartProducts &&(
  <Elements options={options} stripe={stripePromise}>
    <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess}/>
  </Elements>
 )}
 {loading && <div className="text-center">Por favor espere... </div>}
  {error && (<div className="text-center text-rose-500">Algo no salio bien... </div>
  )}
  {paymentSuccess && ( 
    <div className="flex items-center flex-col gap-4">
    <div className="text-teal-500 text-center">Pago Exitoso</div>
    <div className="max-w-[220px] w-full">
    <Button label="ver tus ordenes" 
    onClick={()=>router.push("/order")} 
    /> 
   
  </div> 
  </div>
  )}
   </div>
 
}
 
export default CheckoutClient;
