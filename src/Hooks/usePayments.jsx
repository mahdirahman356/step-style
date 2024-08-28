import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Context/Context";

const usePayments = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ["PaymentHistory"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            console.log(res.data)
            return res.data
        }
    })
    return [paymentHistory]
};

export default usePayments;