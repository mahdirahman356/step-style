import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import profile from "../../assets/image/user.avif"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "../../style.css"
import { FiEdit3 } from "react-icons/fi";
import { LuListOrdered } from "react-icons/lu";
import { PiPaypalLogoBold, PiTruck, PiUsersThreeBold } from "react-icons/pi";
import { TbStars } from "react-icons/tb";
import useOrders from "../../Hooks/useOrders";
import usePayments from "../../Hooks/usePayments";
import useAdmin from "../../Hooks/useAdmin"
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
const Profile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [order] = useOrders()
    const [isAdmin] = useAdmin()
    const [paymentHistory] = usePayments()
    const { data: TheUser = [], refetch, isLoading } = useQuery({
        queryKey: ["TheUser"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/email/${user.email}`)
            return data
        }
    })

    const { data: adminStats = [] } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/admin-stats`)
            console.log(data)
            return data
        }
    })
    



    return (
        <div className="w-[95%] mx-auto py-12 lg:py-0 lg:my-28 nunito">
            {isLoading ? 
            <div className=" min-h-screen flex justify-center items-center">
                <progress className="progress w-56"></progress>
            </div>
           : 
          <div>
             < div className="flex">
                {
                    TheUser.map((TheUser, index) => <div key={index} className="p-8 sm:flex sm:space-x-6">
                        <div className="w-36 h-36 mb-3">
                            <img src={TheUser.image || user.photoURL ? TheUser.image || user.photoURL : profile} alt="" className="object-cover object-center w-full h-full rounded-full dark:bg-gray-500" />
                        </div>
                        <div className=" sm:flex sm:space-x-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold">{TheUser.name}</h2>
                                <span className="text-sm dark:text-gray-600">General manager</span>
                                <button className="btn rounded-full bg-gray-700 text-white mt-3 flex" onClick={() => document.getElementById('my_modal_3').showModal()}><FiEdit3 className="text-[17px]" /></button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                        </form>
                                        <UpdateProfile id={TheUser._id} location={TheUser.location} contactNumber={TheUser.contactNumber} image={TheUser.image} refetch={refetch}></UpdateProfile>
                                    </div>
                                </dialog>
                            </div>
                            <div className="">
                                <p className="mb-2 text-sm flex items-center gap-2"><IoMailOutline className="text-xl" />{TheUser?.email}</p>
                                <p className="mb-2 text-sm flex items-center gap-2"><IoLocationOutline className="text-xl" />{TheUser.location ? TheUser.location : "Add your location"}</p>
                                <p className="mb-2 text-sm flex items-center gap-2"><IoCallOutline className="text-xl" />{TheUser.contactNumber ? TheUser.contactNumber : "Add your contact number"}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>



            {isAdmin ?
            <div className="stats shadow flex justify-between">
            <div className="flex justify-center items-center text-gray-700">
            <FaRegMoneyBillAlt className="text-8xl ml-3"/>
             <div className="stat place-items-center">
                 <div className="stat-title">Revenue</div>
                 <div className="stat-value">{adminStats.revenue}$</div>
             </div>
            </div>

            <div className="flex justify-center items-center text-gray-700">
            <PiUsersThreeBold className="text-8xl ml-3"/>
             <div className="stat place-items-center">
                 <div className="stat-title">Customers</div>
                 <div className="stat-value">{adminStats.users}</div>
             </div>
            </div>

            <div className="flex justify-center items-center text-gray-700">
            <AiOutlineProduct className="text-8xl ml-3"/>
             <div className="stat place-items-center">
                 <div className="stat-title">Products</div>
                 <div className="stat-value">{adminStats.products}</div>
             </div>
            </div>

            <div className="flex justify-center items-center text-gray-700">
            <PiTruck className="text-8xl ml-3"/>
             <div className="stat place-items-center">
                 <div className="stat-title">Orders</div>
                 <div className="stat-value">{adminStats.orders}</div>
             </div>
            </div>
         </div> : 
         <div className="stats shadow flex justify-between">
         <div className="flex justify-center items-center text-gray-700">
         <LuListOrdered className="text-8xl ml-3"/>
          <div className="stat place-items-center">
              <div className="stat-title">Orders</div>
              <div className="stat-value">{order.length}</div>
          </div>
         </div>

         <div className="flex justify-center items-center text-gray-700">
         <PiPaypalLogoBold className="text-8xl ml-3"/>
          <div className="stat place-items-center">
              <div className="stat-title">Payments</div>
              <div className="stat-value">{paymentHistory.length}</div>
          </div>
         </div>

         <div className="flex justify-center items-center text-gray-700">
         <TbStars className="text-8xl ml-3"/>
          <div className="stat place-items-center">
              <div className="stat-title">Reviews</div>
              <div className="stat-value">31K</div>
          </div>
         </div>
      </div>}
          </div>}
        </div>
    );
};

export default Profile;