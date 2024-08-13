import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK)
const Payment = () => {
    const product = useLoaderData()
    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm product={product}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;