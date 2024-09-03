import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import profileImage from "../../assets/image/user.avif"
import Swal from "sweetalert2";
const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            console.log(res.data)
            return res.data
        }
    })

    const handleMakeAdmin = (id, name) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make him an admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user-admin/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success",
                                text: `${name} is an Admin Now!`,
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
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">All Users</h2>

            <div className="overflow-x-auto mb-16">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>User Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {users.map((user, index) => <tr key={index} className="hover font-semibold text-xs whitespace-nowrap">
                            <td>
                                <img className="object-cover w-14 h-14 rounded-full border" src={user.image ? user.image : profileImage} alt="" />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td>
                                {user.role === "admin" ? 
                                <span className="btn btn-sm  w-32 text-green-500">Admin</span>
                                : <span onClick={() => handleMakeAdmin(user._id, user.name)} className="btn btn-sm  w-32 text-blue-500">Make Admin</span>
                                }
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;