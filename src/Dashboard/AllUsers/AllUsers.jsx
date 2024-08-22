import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            console.log(res.data)
            return res.data
        }
    })

    return (
        <div className="w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mt-24 my-10 text-center text-gray-500">All Users</h2>

            <div className="overflow-x-auto">
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
                                <img className="object-cover w-14 h-14 rounded-full" src={user.image} alt="" />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.location}</td>
                            <td><span className="btn btn-sm text-blue-500">Make Admin</span></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;