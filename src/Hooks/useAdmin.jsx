import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Context/Context";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    let axiosSecure = useAxiosSecure()
    let { user } = useContext(AuthContext)
    const { data: isAdmin = [], isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/admin/${user?.email}`)
                console.log(res.data)
                return res.data?.admin
            }
        }, 
        enabled: !!localStorage.getItem('access-token')

    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;