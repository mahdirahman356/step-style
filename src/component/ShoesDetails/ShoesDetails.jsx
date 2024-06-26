import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";

const ShoesDetails = () => {
    const shoes = useLoaderData()
    const { user } = useContext(AuthContext)
    const [TheUser, SetTheUser] = useState([])
    const axiosSecure = useAxiosSecure()
    const { name, price, image, brand, description, size, color, category } = shoes[0]
    useEffect(() => {
        axiosSecure.get(`/users/email/${user.email}`)
            .then(res => {
                console.log(res.data[0])
                SetTheUser(res.data[0])
            })
    }, [])

    const handleOrder = async(e) => {
        e.preventDefault();
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
            location: location,
            contactNumber: contactNumber,
            productName: name,
            productPrice: price,
            productBrand: brand,
            shoeSize: shoeSize,
            shoeColor: shoeColor,
        }
        console.log(order)
        try {
          const res = await  axiosSecure.post('/order', order)
          console.log(res.data)
          if(res.data.acknowledged){
            Swal.fire({
                title: 'Success',
                text: 'Thank you for your order! Your product has been ordered. Please complete the payment to receive it.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
          }

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className="w-[95%] md:w-[85%] mx-auto flex flex-col md:flex-row justify-between gap-16 items-center md:my-20">

            <div className="max-w-2xl md:w-1/2 overflow-hidden bg-white md:rounded-lg shadow-md ">
                <img className="object-cover w-full h-64" src={image} alt="Article" />

                <div className="p-6">
                    <div>
                        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">{brand}</span>
                        <div className="flex justify-between items-center">
                            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:underline" tabIndex="0" role="link">{name}</a>
                            <p className="text-2xl font-bold text-red-500">${price}</p>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
                        <div className="my-4 space-y-1">
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Size</span> {size.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints /><span className="font-bold">Color</span> {color.join(', ')}</p>
                            <p className="text-gray-500 flex items-center gap-2"><VscActivateBreakpoints />{category} Shoes</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex-1">
                <h1 className="text-3xl font-bold text-center">Order</h1>
                <form onSubmit={handleOrder} className=" space-y-4 mt-12 mb-4 w-full">
                    {/* Name */}
                    <label className="input rounded-3xl input-bordered flex items-center gap-2 w-full">
                        <LuUser2 className="text-gray-500 text-xl" />
                        <input
                            type="text"
                            className="grow"
                            name="userName"
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
                   <div className="flex gap-2"> 
                     {/* your shoe size */}
                     <select name="shoeSize" className="select select-bordered w-full rounded-3xl" required>
                            <option value="" disabled selected>Select your shoe size</option>
                            {size.map((sz, index) =>  
                            <option value={sz} key={index}>{sz}</option>)}
                        </select>
                    {/* shoe color */}
                        <select name="shoeColor" className="select select-bordered w-full rounded-3xl" required>
                            <option value="" disabled selected>Select your shoe Color</option>
                            {color.map((clr, index) =>  
                            <option value={clr} key={index}>{clr}</option>)}
                        </select>
                   </div>

                    <button className="btn w-full rounded-3xl bg-[#1A2130] text-white">
                        order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShoesDetails;