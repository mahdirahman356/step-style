import { useQuery } from "@tanstack/react-query";
import shopImage from "../../assets/image/shop.avif"
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import "../../style.css"
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
const Shop = () => {
    const [search, setSearch] = useState("")
    const axiosCommon = useAxiosCommon()
    const { data: Allshoes = [] } = useQuery({
        queryKey: ["Allshoes", search],
        queryFn: async () => {
            const res = await axiosCommon.get(`/shoes?search=${search}`)
            console.log(res.data)
            return res.data
        }
    })

    const handleSearch = (e) => {
        e.preventDefault();
        let search = e.target.search.value;
        setSearch(search)

    }

    return (
        <div>
            <div className="pt-14">
                <div className="w-[95%] md:w-[85%] flex flex-col md:flex-row gap-5 mx-auto my-6">

                    <form onSubmit={handleSearch} className="flex w-full">
                        <input type="text" name="search" placeholder="Search here" className="input rounded-sm input-bordered w-full" />
                        <button className="btn bg-[#677D6A] text-white rounded-sm">
                            <MdSearch className="text-xl"/>
                            Search
                        </button>
                    </form>

                    <select className="select rounded-sm select-bordered w-full max-w-xs bg-[#677D6A] text-white">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                    <select className="select rounded-sm select-bordered w-full max-w-xs bg-[#677D6A] text-white">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </div>


            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={shopImage}
                        className="w-full md:max-w-lg" />
                    <div className="">
                        <h1 className="text-4xl md:text-5xl font-bold header-font">Exclusive Shoe Collection</h1>
                        <p className="py-6 md:w-[50%]">
                            Explore our exclusive collection of shoes, designed for style, comfort, and every occasion. Find your perfect pair today!
                        </p>
                    </div>
                </div>
            </div>

            <div className=" w-[95%] my-24 md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {
                    Allshoes.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${shoes.image})` }}></div>
                        <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-white">
                            <h3 className="py-2 font-bold tracking-wide text-center uppercase ">{shoes.name}</h3>
                            <div className="flex items-center justify-between px-3 py-2 bg-[#677D6A] text-white ">
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