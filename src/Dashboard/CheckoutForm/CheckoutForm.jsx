import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
     
    const stripe = useStripe()
    const elements = useElements()

    const [error,  setError] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card,
        })

        if(error){
            console.log("payment error", error)
            setError(error.message)
        }

        if(paymentMethod){
            console.log( "paymentMethod",paymentMethod)
            setError("")
        }
    }

    return (
        <div>
             <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="flex flex-col items-center justify-center mt-7">
      <button className="btn btn-wide" type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className="text-red-500 mt-2 text-sm">{error}</p>
      </div>
    </form>
        </div>
    );
};

export default CheckoutForm;