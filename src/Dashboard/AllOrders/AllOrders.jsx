import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllOrders = () => {
    const axiosSecure = useAxiosSecure()
    const {data: AllOrders = [], refetch} = useQuery({
        queryKey:["AllOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/order")
            console.log(res.data)
            return res.data
        }
    }) 

    const handleDeleteOrder = (id, name) => {
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
                  text: `${name} order has been deleted.`,
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
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">All Orders</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Order Details</th>
                            <th>Payment</th>
                            <th>Confirmation</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                       {AllOrders.map((orders, index) =><tr key={index} className="hover font-semibold text-xs whitespace-nowrap">
                            <td>{orders.name}</td>
                            <td>{orders.email}</td>
                            <td>{orders.location}</td>
                            <td><span className="text-blue-500 btn btn-sm">
                               <Link to={`/dashboard/all-orders/order-details/${orders._id}`}>View Details</Link>
                            </span></td>
                            <td>{orders.isPaid === true ? "Paid" : "Not Paid"}</td>
                            <td>{orders.confirmation}</td>
                            <td><span onClick={() => handleDeleteOrder(orders._id, orders.name)} className="btn btn-ghost"><RiDeleteBinLine className="text-xl text-red-500" /></span></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
