
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/Context";
import { LuUser2 } from "react-icons/lu";
import { imageUplode } from "../../imageAPI";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import profileImage from "../../assets/image/user.avif"


const UpdateProfile = ({ id, location, contactNumber, image, refetch }) => {
    const { user, userUpdate } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const axiosSecure = useAxiosSecure();
    const inputRef = useRef(null);

    const handleImageSelect = (e) => {
        e.preventDefault();
        const file = inputRef.current.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData({ ...formData, image: file });

        }
    };


    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        location: location || "",
        contactNumber: contactNumber || "",
        image: image
    });

    useEffect(() => {
        setFormData({
            name: user?.displayName || "",
            location: location || "",
            contactNumber: contactNumber || "",
            image: image
        });
    }, [user, location, contactNumber, image]);

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
                <div className="flex items-center justify-center mt-6 mb-7">
                    <a className="w-1/3 pb-4 font-medium text-center border-b-2 dark:border-[#1A2130]">
                        Edit Profile
                    </a>
                </div>
                <div>

                    <label htmlFor="dropzone-file" className="mb-12 flex flex-col w-36 h-36 items-center max-w-lg mx-auto mt-2 text-center bg-white  cursor-pointer rounded-full">
                        <img className='w-36 h-36 object-cover rounded-full' src={selectedImage  ? selectedImage : user.photoURL || formData.image || profileImage} alt="" />

                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            name="image"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleImageSelect} />
                            </label>
                </div>

                <div className="space-y-7 mb-11 md:w-[80%] mx-auto">
                    {/* Your Name */}
                    <div className="flex items-center w-full text-gray-700 ">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <LuUser2 className="text-gray-500 text-xl mr-3" />
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Username"
                        />
                    </div>
                    {/* Location */}
                    <div className="flex items-center w-full text-gray-700 ">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <IoLocationOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Location"
                        />
                    </div>
                    {/* Contact Number */}
                    <div className="relative flex items-center">
                        <span className="pb-3 border-gray-300 border-b-2 ">
                            <IoCallOutline className="text-gray-500 text-xl  mr-3" />
                        </span>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                            className="grow border-b-2 border-gray-300 pb-2 focus:border-blue-500 outline-none rounded-none"
                            placeholder="Contact Number"
                        />
                    </div>
                </div>
              <div className="md:w-[80%] mx-auto">
              <button
                    className="btn text-white bg-[#1A2130] w-full my-6 rounded-sm"
                    type="submit"
                >
                    {loading ? <span className="loading loading-spinner text-white"></span> : "Continue"}
                </button>
              </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
