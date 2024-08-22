import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import "../../style.css"
import { FaArrowRightLong } from "react-icons/fa6";

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
    const { data: shoes = [] } = useQuery({
        queryKey: ["shoes"],
        queryFn: async () => {
            const res = await axiosCommon.get("/shoes")
            return res.data
        }
    })
    const products = shoes.sort((a, b) => a.price - b.price)
    .slice(0, 6);
    
    const newProdects = shoes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
    console.log(newProdects)
     return (
        <div className="my-10 w-[95%] md:w-[80%] mx-auto md:my-28">

            <div className="slider-container w-[94%] md:w-full">
            <h1 className="header-font text-[#677D6A] text-3xl md:text-5xl my-16 font-bold border-l-4 border-[#677D6A] pl-4">New Products</h1>
                      <p className="mr-4 mb-2 flex justify-end items-center gap-2 text-gray-600">See More <FaArrowRightLong /></p>
                <Slider {...settings}>
                {
                    newProdects.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full">
                        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${shoes.image})` }}></div>
                        <div className="-mt-10 overflow-hidden bg-white rounded-b-lg shadow-lg md:w-full">
                            <h3 className="py-2 font-bold tracking-wide text-center uppercase">{shoes.name}</h3>
                            <div className="flex items-center justify-between px-3 py-2 bg-[#677D6A] text-white">
                                <span className="font-bold">${shoes.price}</span>
                                <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                                    <Link to={`/shoes-order/${shoes._id}`}>Buy</Link>
                                </button>
                            </div>
                        </div>
                    </div>)
                }
                </Slider>
            </div>


            <h1 className="header-font text-[#677D6A] text-3xl md:text-5xl my-16 font-bold border-l-4 border-[#677D6A] pl-4">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {
                    products.map((shoes, index) => <div key={index} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{ backgroundImage: `url(${shoes.image})` }}></div>
                        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64">
                            <h3 className="py-2 font-bold tracking-wide text-center uppercase">{shoes.name}</h3>
                            <div className="flex items-center justify-between px-3 py-2 bg-[#677D6A] text-white">
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