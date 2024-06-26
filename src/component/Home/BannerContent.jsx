
import { Link } from "react-router-dom";
import "../../style.css"
const BannerContent = ({ image }) => {
    return (
        <div>
            <div className="hero bg-cover bg-center roboto-thin nunito" style={{ backgroundImage: `url(${image})` }}>
                <div className="hero-overlay bg-gradient-to-r from-[#151515] to-[rgb(21,21,21,0) py-60 md:py-80"></div>
                <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                    <div className="md:w-[50%]">
                        <h1 className="mb-7 text-3xl md:4xl lg:text-6xl text-center md:text-start  font mt-4">StepStyle Step into Fashion!</h1>
                        <p className='text-gray-300 md:text-gray-500 text-center md:text-start text-sm md:text-base mb-4'>Discover your perfect pair at StepStyle, where style meets comfort. Browse our extensive collection of the latest trends in footwear and find the ideal shoes for every occasion. Step up your fashion game and shop the newest arrivals today!</p>
                        <div className='flex justify-center md:justify-start'>
                            <button className="btn text-white border-none bg-[#1A2130] rounded-3xl w-44">
                                <Link to="/shop">Shop Now</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default BannerContent;