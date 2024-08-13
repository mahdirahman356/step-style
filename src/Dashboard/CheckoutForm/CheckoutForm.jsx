import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({product}) => {

    const {_id, productName, productPrice} = product

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    
    const stripe = useStripe()
    const elements = useElements()
    const [error,  setError] = useState("")
    const [clientSecret, setClienSecret] = useState("")
    useEffect(() => {
          axiosSecure.post("/create-payment-intent", {price: product.productPrice})
          .then(res => {
            console.log(res.data.clientSecret)
            setClienSecret(res.data.clientSecret)
          })
    }, [])

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

        // confirm payment

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret , {
          payment_method:{
            card: card,
            billing_details: {
              email: user.email || "anonymous",
              name: user.displayName || "anonymous",
            },
          }
        })

        if(confirmError){
          console.log("confirm error")
        }
        else{
          console.log( "payment intent", paymentIntent)
          if(paymentIntent.status === "succeeded"){
          axiosSecure.patch(`/order-isPaid/${_id}`, {isPaid: true})
          .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
              const paymentInfo = {
                  email: user.email,
                  name: user.displayName,
                  productName: productName,
                  productPrice: productPrice,
                  transectionId: paymentIntent.id,
                  payment: "Paid",
                  date: new Date(),
              }
              axiosSecure.post("/payments", paymentInfo)
              .then(res => {
                console.log(res.data)
                if(res.data.acknowledged){
                  Swal.fire({
                    title: 'Success',
                    text: 'You have successfully paid',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                }
              })
            }
          })
          navigate("/dashboard/order")
          }
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
      <button className="btn btn-wide" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500 mt-2 text-sm">{error}</p>
      </div>
    </form>
        </div>
    );
};

export default CheckoutForm;