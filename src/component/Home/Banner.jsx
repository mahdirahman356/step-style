
import image from "../../assets/image/pngtree-stunning-abstract-wallpaper-featuring-3d-green-wavy-twists-image_3840820.jpg"
import "../../style.css"
import shopImage from "../../assets/image/womens-slip-on-canvas-shoes-white-front-62800b6389cd1_2000x-removebg-preview.png"
const Banner = () => {
    return (
        <div>
            <div>
                <div className="hero min-h-screen bg-cover  roboto-thin nunito"
                 style={{
                    backgroundImage: `url(${image})`,
                  }}>
                    <div className="hero-overlay py-60 md:py-80"></div>
                    <div className=" w-[95%] md:w-[85%] mx-auto text-neutral-content">
                        <div className=" mx-auto">
                           
                            <div className="hero mt-16">
                                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                                    <img
                                        src={shopImage}
                                        className="w-full md:max-w-sm" />
                                    <div className="">
                                        <h1 className="text-5xl md:text-7xl font-bold header-font header-font2">step style step into fashion</h1>
                                        <p className="md:w-[70%] mt-4 text-sm md:text-base">Discover a wide range of premium shoes that blend comfort, style, and durability. Whether you are looking for the latest trends or timeless classics, our collection offers something for every step of your journey. Shop now and find the perfect pair to elevate your look</p>
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