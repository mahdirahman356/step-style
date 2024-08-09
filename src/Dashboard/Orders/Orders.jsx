import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
const Orders = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: order = [], refetch } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/email/${user.email}`)
            const recentOrders = res.data.sort((a,b) => new Date(b.date) - new Date(a.date))
            console.log(res.data)
            return recentOrders
        }
    })
    
    const handleDeleteOrder = (id, productName) => {
          console.log(id)

          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axiosSecure.delete(`/order-delete/${id}`)
            .then(res => {
               console.log(res.data)
               if(res.data.deletedCount > 0){
                Swal.fire({
                    title: "Deleted!",
                    text: `${productName} has been deleted.`,
                    icon: "success"
                  });
               }
               refetch()
            })
            }
          });
    }

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-sm">
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Details</th>
                            <th>Pay</th>
                            <th>Confirmation</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {order.map((order, index) => <tr key={index} className="hover font-semibold text-xs whitespace-nowrap">
                            <td>{index + 1}</td>
                            <td>{order.productName}</td>
                            <td>{order.productPrice}$</td>
                            <td>{order.date.split("T")[0]}</td>
                            <td><span className="text-blue-500 btn btn-sm">
                               <Link to={`/dashboard/all-Product/shoes-details/${order.productId}`}>View Details</Link>
                            </span>
                            </td>
                            <td><span className="text-blue-500 btn btn-sm">Pay</span></td>
                            <td>{order.confirmation}</td>
                            <td><span onClick={() => handleDeleteOrder(order._id, order.productName)} className="btn btn-ghost"><RiDeleteBinLine className="text-xl text-red-500" /></span></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;