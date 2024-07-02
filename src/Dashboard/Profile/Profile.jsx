import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import profile from "../../assets/image/user.avif"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "../../style.css"
const Profile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: TheUser = [], refetch } = useQuery({
        queryKey: ["TheUser"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/email/${user.email}`)
            console.log(data)
            return data
        }
    })
    return (
        <div className="w-[95%] md:w-[60%] mx-auto flex justify-center items-center my-12 md:my-28 nunito">
           {
            TheUser.map((user, index) =>  <div key={index} className="w-full px-8 py-4 mt-12 bg-gray-600 text-white glass rounded-lg shadow-lg  md:mt-24">
            <div className="flex justify-center -mt-16 ">
                <img className="object-cover w-24 h-24 border-2 rounded-full" alt="Testimonial avatar" src={user.image ? user.image : profile} />
            </div>

            <h2 className="mt-3 text-xl text-center font-semibold">{user?.name}</h2>

            <div className="md:p-4 my-6">
                <p className="mt-2 text-sm flex items-center gap-2"><IoMailOutline className="text-xl" />{user?.email}</p>
                <p className="mt-2 text-sm flex items-center gap-2"><IoLocationOutline className="text-xl" />{user.location ? user.location  : "Add your location"}</p>
                <p className="mt-2 text-sm flex items-center gap-2"><IoCallOutline className="text-xl" />{user.contactNumber ? user.contactNumber  : "Add your contact number"}</p>
            </div>
            <div className="flex justify-end">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn rounded-sm " onClick={() => document.getElementById('my_modal_3').showModal()}><LiaEditSolid className="text-xl" /> Edit your profile</button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                        </form>
                        <UpdateProfile id={user._id}  location={user.location} contactNumber={user.contactNumber} refetch={refetch}></UpdateProfile>
                    </div>
                </dialog>
            </div>
        </div>)
           }
        </div>
    );
};

export default Profile;