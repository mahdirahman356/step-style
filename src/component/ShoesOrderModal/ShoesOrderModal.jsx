import { useContext, useEffect, useState } from "react";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import { LuUser2 } from "react-icons/lu";

const ShoesOrderModal = ({ id }) => {

    const { user } = useContext(AuthContext)
    const [TheUser, SetTheUser] = useState([])
    const [loading, setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: shoes = [] } = useQuery({
        queryKey: ["shoes", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/shoes-details/${id}`)
            return res.data
        }
    })


    const shoeDetails = shoes[0] || {}

    const { _id, name, price, brand, size = [], color = [] } = shoeDetails
    useEffect(() => {
        axiosSecure.get(`/users/email/${user.email}`)
            .then(res => {
                SetTheUser(res.data[0])
            })
    }, [user.email, axiosSecure])

    const handleOrder = async (e) => {
        e.preventDefault();
        setLoading(true)
        let form = e.target;
        let userName = form.userName.value;
        let email = form.email.value;
        let location = form.location.value;
        let contactNumber = form.contactNumber.value;
        let shoeSize = form.shoeSize.value;
        let shoeColor = form.shoeColor.value;
        const order = {
            name: userName,
            email: email,
            image: user?.photoURL,
            location: location,
            contactNumber: contactNumber,
            productId: _id,
            productName: name,
            productPrice: price,
            productBrand: brand,
            shoeSize: shoeSize,
            shoeColor: shoeColor,
            date: new Date(),
            confirmation: "Pending",
            isPaid: false
        }
        try {
            const res = await axiosSecure.post('/order', order)
            if (res.data.acknowledged) {
                Swal.fire({
                    title: 'Success',
                    text: 'Thank you for your order! Your product has been ordered. Please complete the payment to receive it.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                navigate("/dashboard/order")
            }

        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }

    }


    return (
        <div className="flex-1 my-5 md:w-[90%] mx-auto">
            <h1 className="text-3xl font-bold text-center nunito text-gray-500">Order</h1>
            <form onSubmit={handleOrder} className=" space-y-8 mt-12 mb-4  w-full nunito">
                {/* Name */}

                <label className="flex items-center w-full text-gray-700 ">
                    <span className="pb-3 border-gray-300 border-b-2 ">
                        <LuUser2 className="text-gray-500 text-xl mr-3" />
                    </span>
                    <input
                        type="text"
                        className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                        name="userName"
                        defaultValue={TheUser.name ? TheUser.name : ""}
                        placeholder="Your Name"
                        required />
                </label>

                {/* email */}

                <label className="flex items-center w-full text-gray-700 ">
                    <span className="pb-3 border-gray-300 border-b-2 ">
                        <IoMailOutline className="text-gray-500 text-xl  mr-3" />
                    </span>
                    <input
                        type="email"
                        className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                        name="email"
                        defaultValue={TheUser.email ? TheUser.email : ""}
                        placeholder="Your email"
                        required />
                </label>

                {/*location*/}
                <label className="flex items-center w-full text-gray-700 ">
                    <span className="pb-3 border-gray-300 border-b-2 ">
                        <IoLocationOutline className="text-gray-500 text-xl  mr-3" />
                    </span>
                    <input
                        type="text"
                        className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                        name="location"
                        defaultValue={TheUser.location ? TheUser.location : ""}
                        placeholder="Your Location"
                        required />
                </label>

                {/* contact number */}
                <label className="flex items-center w-full text-gray-700 ">
                    <span className="pb-3 border-gray-300 border-b-2 ">
                        <IoCallOutline className="text-gray-500 text-xl  mr-3" />
                    </span>
                    <input
                        type="text"
                        className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                        name="contactNumber"
                        defaultValue={TheUser.contactNumber ? TheUser.contactNumber : ""}
                        placeholder="Contact Number"
                        required />
                </label>

                <div className="flex flex-col lg:flex-row gap-2">
                    {/* your shoe size */}

                    <select name="shoeSize" className="select select-bordered w-full rounded-3xl text-gray-700" required>
                        <option value="" disabled selected>Select your shoe size</option>
                        {size.map((sz, index) =>
                            <option value={sz} key={index}>{sz}</option>)}
                    </select>

                    {/* shoe color */}

                    <select name="shoeColor" className="select select-bordered w-full rounded-3xl text-gray-700" required>
                        <option value="" disabled selected>Select your shoe Color</option>
                        {color.map((clr, index) =>
                            <option value={clr} key={index}>{clr}</option>)}
                    </select>
                </div>

                <button className="btn w-full rounded-3xl bg-[#677D6A] text-white">
                    {loading ? <span className="loading loading-spinner loading-md"></span> : "order"}
                </button>
            </form>
        </div>
    );
};

export default ShoesOrderModal;