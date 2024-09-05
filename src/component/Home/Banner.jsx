
import image from "../../assets/image/banner.jpg"
import "../../style.css"
const Banner = () => {
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-cover  roboto-thin nunito"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}>
                    <div className="hero-overlay bg-opacity-80 py-60 md:py-80"></div>
                    <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                        <div className=" mx-auto">

                            <div className="hero mt-16">
                                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                                    
                                    <div className="bg-black opacity-30 p-5 md:p-20">
                                        <h1 className="text-5xl md:text-7xl font-bold header-font header-font2">step style step into fashion</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;