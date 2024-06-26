// import { useContext, useState } from "react";
// import { AuthContext } from "../../Context/Context";
// import { LuUser2 } from "react-icons/lu";
// import { imageUplode } from "../../imageAPI";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

// const UpdateProfile = ({ id, location, contactNumber, refetch }) => {
//     const { user, userUpdate } = useContext(AuthContext)
//     const [loading, setLoading] = useState(false);
//     const axiosSecure = useAxiosSecure()
//     let handleUpdateProfile = async (e) => {
//         setLoading(true);
//         e.preventDefault()
//         let form = e.target
//         let name = form.name.value
//         let location = form.location.value
//         let contactNumber = form.contactNumber.value
//         let image = form.image.files[0]
//         console.log(name, image, location, contactNumber)
//         try {
//             let url = user.photoURL;
//             if (image) {
//                 const uploadResult = await imageUplode(image);
//                 url = uploadResult;
//             }
//             await userUpdate(name, url)
//                 .then(async () => {
//                     const userInfo = {
//                         name: name,
//                         image: url,
//                         location: location,
//                         contactNumber: contactNumber
//                     }
//                     console.log(userInfo)
//                     const res = await axiosSecure.put(`/user-update/${id}`, userInfo)
//                     console.log(res.data)
//                     refetch()

//                 })

//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <div>
//             <form onSubmit={handleUpdateProfile} className="w-full max-w-md text-gray-500">
//                 <div className="flex items-center justify-center mt-6">
//                     <a className="w-1/3 pb-4 font-medium text-center border-b-2 dark:border-blue-400">
//                         Edit Profile
//                     </a>
//                 </div>
//                 {/* Your Name */}
//                 <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Your Name</p>
//                 <div className="relative flex items-center">
//                     <LuUser2 className="text-2xl text-gray-500 absolute ml-4 z-10" />

//                     <input type="text"
//                         name="name"
//                         defaultValue={user?.displayName}
//                         className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         placeholder="Username"
//                     />
//                 </div>
//                 {/* Location */}
//                 <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Location</p>
//                 <div className="relative flex items-center">
//                     <IoLocationOutline className="text-2xl text-gray-500 absolute ml-4 z-10" />

//                     <input type="text"
//                         name="location"
//                         defaultValue={location ? location : ""}
//                         className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         placeholder="Location"
//                     />
//                 </div>
//                 {/*contact number */}
//                 <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Contact Number</p>
//                 <div className="relative flex items-center">
//                     <IoCallOutline className="text-2xl text-gray-500 absolute ml-4 z-10" />

//                     <input type="text"
//                         name="contactNumber"
//                         defaultValue={contactNumber ? contactNumber : ""}
//                         className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         placeholder="Contact Number"
//                     />
//                 </div>


//                 <p className="mt-3 text-gray-500 mb-1 text-sm ml-2">Profile Photo</p>
//                 <label htmlFor="image" className="flex items-center justify-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer ">
//                     <input
//                         type="file"
//                         name="image"
//                         className="file-input bg-[#1A2130] border-none text-white w-full max-w-xs "
//                         accept="image/*"
//                     />
//                 </label>
//                 <button
//                     className="btn text-white bg-[#1A2130] w-full my-6 rounded-3xl"
//                     type="submit">
//                     {loading ?
//                         <span className="loading loading-spinner text-white"></span>
//                         : "Continue"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateProfile;


import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/Context";
import { LuUser2 } from "react-icons/lu";
import { imageUplode } from "../../imageAPI";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";

const UpdateProfile = ({ id, location, contactNumber, refetch }) => {
    const { user, userUpdate } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        location: location || "",
        contactNumber: contactNumber || "",
        image: null
    });

    useEffect(() => {
        setFormData({
            name: user?.displayName || "",
            location: location || "",
            contactNumber: contactNumber || "",
            image: null
        });
    }, [user, location, contactNumber]);

    let handleUpdateProfile = async (e) => {
        setLoading(true);
        e.preventDefault();
        let form = e.target;
        let name = form.name.value;
        let location = form.location.value;
        let contactNumber = form.contactNumber.value;
        let image = form.image.files[0];
        console.log(name, image, location, contactNumber);

        try {
            let url = user.photoURL;
            if (image) {
                const uploadResult = await imageUplode(image);
                url = uploadResult;
            }

            await userUpdate(name, url);
            const userInfo = {
                name: name,
                image: url,
                location: location,
                contactNumber: contactNumber
            };
            console.log(userInfo);

            const res = await axiosSecure.put(`/user-update/${id}`, userInfo);
            console.log(res.data);
            refetch();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateProfile} className="w-full max-w-md text-gray-500">
                <div className="flex items-center justify-center mt-6">
                    <a className="w-1/3 pb-4 font-medium text-center border-b-2 dark:border-blue-400">
                        Edit Profile
                    </a>
                </div>
                {/* Your Name */}
                <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Your Name</p>
                <div className="relative flex items-center">
                    <LuUser2 className="text-2xl text-gray-500 absolute ml-4 z-10" />

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Username"
                    />
                </div>
                {/* Location */}
                <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Location</p>
                <div className="relative flex items-center">
                    <IoLocationOutline className="text-2xl text-gray-500 absolute ml-4 z-10" />

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Location"
                    />
                </div>
                {/* Contact Number */}
                <p className="mt-8 text-gray-500 mb-1 text-sm ml-2">Contact Number</p>
                <div className="relative flex items-center">
                    <IoCallOutline className="text-2xl text-gray-500 absolute ml-4 z-10" />

                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="block w-full py-3 bg-white px-11 border-2 rounded-3xl border-gray-200 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Contact Number"
                    />
                </div>

                <p className="mt-3 text-gray-500 mb-1 text-sm ml-2">Profile Photo</p>
                <label htmlFor="image" className="flex items-center justify-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer ">
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        className="file-input bg-[#1A2130] border-none text-white w-full max-w-xs"
                        accept="image/*"
                    />
                </label>
                <button
                    className="btn text-white bg-[#1A2130] w-full my-6 rounded-3xl"
                    type="submit"
                >
                    {loading ? <span className="loading loading-spinner text-white"></span> : "Continue"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
