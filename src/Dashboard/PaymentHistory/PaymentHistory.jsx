import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { Link } from "react-router-dom";
import { AiOutlineHistory } from "react-icons/ai";

const PaymentHistory = () => {

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

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">Payment History</h2>
            {paymentHistory.length === 0 ?
                <div className="flex flex-col items-center justify-center mt-16">
                <AiOutlineHistory className="text-6xl text-gray-400" />
                <p className="text-lg font-semibold text-gray-500 mt-5">You have no pending payments</p>
                <Link to="/dashboard/order">
                    <button className="mt-6 px-4 py-2 bg-[#677D6A] text-white rounded">
                        View Your Orders
                    </button>
                </Link>
            </div>
                : <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-sm">
                                <th></th>
                                <th>Product Name</th>
                                <th>Amount</th>
                                <th>Customer Name</th>
                                <th>Transection Id</th>
                                <th>Payment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {paymentHistory.map((paymentHistory, index) => <tr key={index} className="hover font-semibold text-xs whitespace-nowrap">
                                <td>{index + 1}</td>
                                <td>{paymentHistory.productName}</td>
                                <td>{paymentHistory.productPrice}$</td>
                                <td>{paymentHistory.name}</td>
                                <td>{paymentHistory.transectionId}</td>
                                <td>{paymentHistory.payment}</td>
                                <td>{paymentHistory.date.split("T")[0]}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
};

export default PaymentHistory;