import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import "../../style.css"
const NewProducts = () => {
    const axiosCommon = useAxiosCommon()
    const { data: shoes = [] } = useQuery({
        queryKey: ["shoes"],
        queryFn: async () => {
            const res = await axiosCommon.get("/shoes")
            console.log(res.data)
            const latestShoes = res.data
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0,6);
            console.log(latestShoes)
            return latestShoes;
        }
    })  
    return (
        <div className="my-10 w-[95%] md:w-[80%] mx-auto md:my-28">
        <h1 className="header-font text-3xl md:text-5xl my-16 font-bold border-l-4 border-gray-800 pl-4">New Products</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {
                shoes.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                    <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${shoes.image})` }}></div>
                    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
                        <h3 className="py-2 font-bold tracking-wide text-center uppercase">{shoes.name}</h3>
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-200">
                            <span className="font-bold ">${shoes.price}</span>
                            <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                <Link to={`/shoes-order/${shoes._id}`}>Buy</Link>
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </div>
        <div className="flex justify-center items-center my-11">
        <button className="btn text-white border-none bg-[#1A2130] rounded-3xl w-44">
            <Link to="/shop">See All Products</Link>
        </button>
        </div>
       </div>
    );
};

export default NewProducts;