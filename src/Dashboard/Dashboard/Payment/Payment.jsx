import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK)
const Payment = () => {
    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                  <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;