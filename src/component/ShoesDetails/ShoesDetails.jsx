import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";

const ShoesDetails = () => {
    const shoes = useLoaderData()
    const { user } = useContext(AuthContext)
    const [TheUser, SetTheUser] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/users/email/${user.email}`)
            .then(res => {
                console.log(res.data[0])
                SetTheUser(res.data[0])
            })
    }, [])

    const handleOrder = e => {
        e.preventDefault();
        let form = e.target;
        let name = form.name.value;
        let email = form.email.value;
        let location = form.location.value;
        let contactNumber = form.contactNumber.value;
        console.log(name, email, location, contactNumber)
    }

    return (
        <div className="w-[95%] md:w-[85%] mx-auto flex flex-col md:flex-row justify-between gap-16 items-center md:my-20">
            {
                shoes.map((shoes, index) => <div key={index} className="max-w-2xl md:w-1/2 overflow-hidden bg-white md:rounded-lg shadow-md ">
                    <img className="object-cover w-full h-64" src={shoes.image} alt="Article" />

                    <div className="p-6">
                        <div>
                            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{shoes.brand}</span>
                            <div className="flex justify-between items-center">
                                <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:underline" tabIndex="0" role="link">{shoes.name}</a>
                                <p className="text-2xl font-bold text-red-500">${shoes.price}</p>
                            </div>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-3">{shoes.description}</p>
                            <div className="my-4 space-y-1">
                                <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Size</span> {shoes.size.join(', ')}</p>
                                <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Color</span> {shoes.color.join(', ')}</p>
                                <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints />{shoes.category} Shoes</p>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-center">Order</h1>
                <form onSubmit={handleOrder} className=" space-y-4 mt-12 mb-4 w-full">
                    {/* Name */}
                    <label className="input rounded-3xl input-bordered flex items-center gap-2 w-full">
                        <LuUser2 className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            className="grow"
                            name="name"
                            defaultValue={TheUser.name ? TheUser.name : ""}
                            placeholder="Your Name"
                            required />
                    </label>

                    {/* email */}
                    <label className="input rounded-3xl input-bordered flex items-center gap-2 w-full">
                        <IoMailOutline className="text-gray-500 text-xl" />
                        <input
                            type="email"
                            className="grow"
                            name="email"
                            defaultValue={TheUser.email ? TheUser.email : ""}
                            placeholder="Your email"
                            required />
                    </label>
                    {/*location*/}
                    <label className="input rounded-3xl input-bordered flex items-center gap-2 w-full">
                        <IoLocationOutline className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            className="grow"
                            name="location"
                            defaultValue={TheUser.location ? TheUser.location : ""}
                            placeholder="Your Location"
                            required />
                    </label>
                    {/* contact number */}
                    <label className="input rounded-3xl input-bordered flex items-center gap-2 w-full">
                        <IoCallOutline className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            className="grow"
                            name="contactNumber"
                            defaultValue={TheUser.contactNumber ? TheUser.contactNumber : ""}
                            placeholder="Contact Number"
                            required />
                    </label>

                    <button className="btn w-full rounded-3xl bg-[#1A2130] text-white">
                        order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShoesDetails;