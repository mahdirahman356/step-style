import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { TbEye } from "react-icons/tb";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllProduct = () => {

    const axiosSecure = useAxiosSecure()

    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosSecure.get('/shoes')
            console.log(res.data)
            return res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }
    })

    const handleDelete = async (id, productName) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/shoes-delete/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `${productName} has been deleted.`,
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
            <h2 className="text-3xl font-bold pt-24 py-10 text-center text-gray-500">All Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {
                    products.map((products, index) => <div key={index} className="card bg-base-100  shadow-xl">
                        <figure className="px-5 pt-5">
                            <img
                                src={products.image}
                                alt="Shoes"
                                className="rounded-xl h-48 object-cover" />
                        </figure>
                        <div className="card-body text-center">
                            <h2 className="font-semibold">{products.name}</h2>
                            <div className="flex justify-center gap-1">
                                <Link to={`shoes-details/${products._id}`}>
                                    <span className="btn btn-sm btn-ghost"><TbEye className="text-xl" /></span>
                                </Link>
                                <Link to={`/dashboard/all-Product/product-update/${products._id}`}>
                                <span className="btn btn-sm btn-ghost"><AiOutlineEdit className="text-xl " /></span>
                                </Link>
                                <span onClick={() => handleDelete(products._id, products.name)} className="btn btn-sm btn-ghost"><RiDeleteBin5Line className="text-xl text-red-500" /></span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllProduct;