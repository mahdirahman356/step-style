import { useQuery } from "@tanstack/react-query";
import shopImage from "../../assets/image/shop.jpg"
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
const Shop = () => {
    const axiosCommon = useAxiosCommon()
    const { data: Allshoes = [] } = useQuery({
        queryKey: ["Allshoes"],
        queryFn: async () => {
            const res = await axiosCommon.get("/shoes")
            console.log(res.data)
            return res.data
        }
    })

    const handleSearch = (e) => {
        e.preventDefault();
        let search = e.target.search.value;
        console.log(search)
    }

    return (
        <div>
            <div className="hero bg-cover bg-center roboto-thin nunito" style={{ backgroundImage: `url(${shopImage})` }}>
                <div className="hero-overlay bg-gradient-to-r from-[#151515] to-[rgb(21,21,21,0) py-60 md:py-80"></div>
                <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                    <div className="md:w-[50%] mx-auto">
                        <h1 className="mb-7 text-3xl md:4xl lg:text-6xl text-center  font mt-4">Discover Your Perfect Pair</h1>
                        <form onSubmit={handleSearch} className="flex items-center ">
                            <input type="text" name="search" placeholder="Search Here" className="block rounded-3xl mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 border-4 border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            <button type="submit" className="btn btn-sm btn-ghost -ml-14 mt-2"><IoSearch className="text-xl text-gray-500" /></button>
                        </form>
                    </div>
                </div>
            </div>

            <div className=" w-[95%] my-24 md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {
                    Allshoes.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${shoes.image})` }}></div>
                        <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-white">
                            <h3 className="py-2 font-bold tracking-wide text-center uppercase ">{shoes.name}</h3>
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-200 ">
                                <span className="font-bold">${shoes.price}</span>
                                <button className="btn btn-sm border-none px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                    <Link to={`/shoes-order/${shoes._id}`}>Buy</Link>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
            </div>


        </div>
    );
};

export default Shop;