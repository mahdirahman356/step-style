
import image from "../../assets/image/shutterstock-1124941217-scaled.webp"
import "../../style.css"
const Banner = () => {
    return (
        <div>
            <div>
            <div className="hero min-h-screen bg-cover  roboto-thin nunito" style={{ backgroundImage: `url(${image})` }}>
                <div className="hero-overlay py-60 md:py-80"></div>
                <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                    <div className="lg:w-[73%] mx-auto">
                        <div className='flex justify-center md:justify-start'>
                            <h1 className="header-font font-bold text-4xl md:text-5xl lg:text-7xl text-center text-white">step style step into fashion</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Banner;