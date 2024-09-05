import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import "../../style.css"
import { FaArrowRightLong } from "react-icons/fa6";
import ShoesDetailsModal from "../ShoesDetailsModal/ShoesDetailsModal";
import ShoesOrderModal from "../ShoesOrderModal/ShoesOrderModal";
import PrivetRoute from "../../PrivetRoute/PrivetRoute";

const NewProducts = () => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    };


    const axiosCommon = useAxiosCommon()
    const { data: newProducts = [] } = useQuery({
        queryKey: ["newProducts"],
        queryFn: async () => {
            const res = await axiosCommon.get("/shoes")
            const newProdects = res.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 6);
            return newProdects
        }
    })
    
     return (
        <div className="my-10 w-[95%] md:w-[80%] mx-auto md:my-28">

            <div className="slider-container w-[94%] md:w-full">
            <h1 className="header-font text-gray-600 text-3xl md:text-5xl my-16 font-bold border-l-4 border-gray-600 pl-4">New Products</h1>
                      <p className="mr-4 mb-2 flex justify-end items-center gap-2 text-gray-600">See More <FaArrowRightLong /></p>
                <Slider {...settings}>
                {
                    newProducts.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                    <div className="overflow-hidden bg-cover bg-center rounded-t-lg cursor-pointer w-full h-64 group"
                        style={{ backgroundImage: `url(${shoes.image})` }}>
                        <div
                            className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100 bg-gray-300 bg-center bg-cover rounded-t-lg shadow-md">
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

                    <div className="-mt-10 overflow-hidden rounded-b-lg shadow-lg  w-full bg-white">
                        <h3 className="py-2 font-bold tracking-wide text-center uppercase ">{shoes.name}</h3>
                        <div className="flex items-center justify-between px-3 py-2 bg-[#1A2130] text-white ">
                            <span className="font-bold">${shoes.price}</span>

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
                                        <PrivetRoute >
                                            <ShoesOrderModal id={shoes._id}></ShoesOrderModal>
                                        </PrivetRoute>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>)
                }
                </Slider>
            </div>
        </div>
    );
};

export default NewProducts;