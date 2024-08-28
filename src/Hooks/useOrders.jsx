import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Context/Context";
import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
    
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: order = [], refetch } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/email/${user.email}`)
            const recentOrders = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            console.log(res.data)
            return recentOrders
        }
    })

    return [order, refetch]
};

export default useOrders;