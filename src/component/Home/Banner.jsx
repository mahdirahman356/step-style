
import image from "../../assets/image/shutterstock-1124941217-scaled.webp"
const Banner = () => {
    return (
        <div>
            <div>
            <div className="hero  md:min-h-screen bg-cover  roboto-thin nunito" style={{ backgroundImage: `url(${image})` }}>
                <div className="hero-overlay py-60 md:py-80"></div>
                <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                    <div className="md:w-[50%]">
                        <div className='flex justify-center md:justify-start'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Banner;