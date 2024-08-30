import { useQuery } from "@tanstack/react-query";
import shopImage from "../../assets/image/shop.png"
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import "../../style.css"
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import ShoesDetailsModal from "../ShoesDetailsModal/ShoesDetailsModal";
import ShoesOrderModal from "../ShoesOrderModal/ShoesOrderModal";
import PrivetRoute from "../../PrivetRoute/PrivetRoute";
const Shop = () => {
    const [search, setSearch] = useState("")
    const [sortOption, setSortOption] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const axiosCommon = useAxiosCommon()
    const { data: Allshoes = [], refetch } = useQuery({
        queryKey: ["Allshoes", search, selectedBrand],
        queryFn: async () => {
            const res = await axiosCommon.get(`/shoes?search=${search}&brand=${selectedBrand}`)
            console.log(res.data)
            return res.data
        }
    })

    const handleSearch = (e) => {
        e.preventDefault();
        let search = e.target.search.value;
        setSearch(search)

    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        console.log(e.target.value)
        refetch();
    };

    const sortproducts = (Allshoes, option) => {
        switch (option) {
            case "priceLowHigh":
                return [...Allshoes].sort((a, b) => a.price - b.price)
            case "priceHighLow":
                return [...Allshoes].sort((a, b) => b.price - a.price)
            default:
                return Allshoes
        }
    };

    const sortedproducts = sortproducts(Allshoes, sortOption);


    const uniqueBrands = [...new Set(Allshoes.map(product => product.brand))];



    return (
        <div>
            <div className="pt-14">
                <div className="w-[95%] md:w-[85%] flex flex-col md:flex-row gap-5 mx-auto my-6">

                    <form onSubmit={handleSearch} className="flex w-full">
                        <input type="text" name="search" placeholder="Search here" className="input rounded-sm input-bordered w-full" />
                        <button className="btn bg-[#677D6A] text-white rounded-sm">
                            <MdSearch className="text-xl" />
                            Search
                        </button>
                    </form>

                    <select value={sortOption} onChange={handleSortChange} className="select rounded-sm select-bordered w-full max-w-xs bg-[#677D6A] text-white">
                        <option value="" disabled selected>Shot By Price </option>
                        <option value="priceLowHigh">Product Price: Low to High</option>
                        <option value="priceHighLow">Product Price: High to Low</option>
                    </select>
                    <select value={selectedBrand} onChange={handleBrandChange} className="select rounded-sm select-bordered w-full max-w-xs bg-[#677D6A] text-white">
                        <option value="" disabled selected>All Brands</option>
                        {uniqueBrands.map((brand, index) =>
                            <option key={index} value={brand}>{brand}</option>
                        )}
                    </select>
                </div>
            </div>


            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={shopImage}
                        className="w-full md:max-w-lg" />
                    <div className="">
                        <h1 className="text-4xl md:text-5xl text-gray-700 header-font">Exclusive Shoe Collection</h1>
                        <p className="py-6 md:w-[50%]">
                            Explore our exclusive collection of shoes, designed for style, comfort, and every occasion. Find your perfect pair today!
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-24 w-[95%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {
                    sortedproducts.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <div className="overflow-hidden bg-cover bg-center rounded-lg cursor-pointer w-full h-64 group"
                            style={{ backgroundImage: `url(${shoes.image})` }}>
                            <div
                                className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100 bg-gray-300 bg-center bg-cover rounded-lg shadow-md">
                                <h2 className="mt-4 text-xl font-semibold text-white capitalize">{shoes.name}</h2>

                                {/* see details modal  */}
                                <div className="my-2">
                                    <div className="">
                                        <button onClick={() => window[`my_modal_details_${shoes._id}`].showModal()} className="text-sm">
                                            <p className="mt-2 text-lg tracking-wider text-[#67f37c] ">See Details...</p>
                                        </button>
                                    </div>
                                    <dialog id={`my_modal_details_${shoes._id}`} className="modal">
                                        <div className="modal-box p-0 md:p-6">
                                            <form method="dialog">
                                                <button className="btn btn-sm bg-gray-100 btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                                <ShoesDetailsModal id={shoes._id} ></ShoesDetailsModal>
                                        </div>
                                    </dialog>
                                </div>



                            </div>
                        </div>

                        <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-white">
                            <h3 className="py-2 font-bold tracking-wide text-center uppercase ">{shoes.name}</h3>
                            <div className="flex items-center justify-between px-3 py-2 bg-[#677D6A] text-white ">
                                <span className="font-bold">${shoes.price}</span>
                                {/* <button className="btn btn-sm border-none px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                    <Link to={`/shoes-order/${shoes._id}`}>Buy</Link>
                                </button> */}

                                {/* order modal  */}
                                <div className="">
                                    <div className="">
                                        <button onClick={() => window[`my_modal_${shoes._id}`].showModal()} className="btn btn-sm border-none px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                            <span>Order</span>
                                        </button>
                                    </div>
                                    <dialog id={`my_modal_${shoes._id}`} className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm bg-gray-100 btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <PrivetRoute>
                                                <ShoesOrderModal id={shoes._id}></ShoesOrderModal>
                                            </PrivetRoute>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>

    );
};

export default Shop;