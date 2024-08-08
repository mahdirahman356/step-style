import { MdOutlineSend } from "react-icons/md";
import { useLoaderData } from "react-router-dom";

const OrderDetails = () => {
    const order = useLoaderData()
    console.log(order)
    return (
        <div className="flex flex-col gap-6 md:flex-row justify-around m-7 mt-24">
            <div className="flex flex-col justify-center items-center">
                <img className="w-28 h-28 rounded-full mb-4" src={order.image} alt="" />
                <p className="font-semibold text-blue-500 bg-gray-200 px-3 py-1 rounded-md">{order.name}</p>
            </div>
            <div>
                <h3 className="font-semibold text-2xl mb-4 ">Details</h3>
               <div className="grid md:grid-cols-2 gap-y-2 gap-x-12">
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Email: {order.email}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Location: {order.location}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Contact Number: {order.contactNumber}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Date: {order.date.split("T")[0]}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Product Name: {order.productName}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Product Brand: {order.productBrand}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Product Price: ${order.productPrice}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Shoe Color: {order.shoeColor}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Shoe Size: {order.shoeSize}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Payment: {order.isPaid === true ? "Paid" : "Not Paid"}</p>
               <p className="flex items-center gap-2"><MdOutlineSend className="text-blue-500"/>Order Confirmation: {order.confirmation}</p>
               </div>
            </div>
        </div>
    );
};

export default OrderDetails;