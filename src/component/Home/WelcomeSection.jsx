import welcome from "../../assets/image/welcome.jpg"
import "../../style.css"
const WelcomeSection = () => {
    return (
        <div>
            <div className="hero my-12">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={welcome}
                        className="md:max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold nunito text-gray-700 header-font">Welcome to <br /><span className="text-[#cbbd87]">Step Style</span></h1>
                        <p className="text-sm md:text-base py-6 md:w-[60%] nunito">
                        Welcome to StepStyle, your go-to for stylish and comfortable footwear. Explore our range from everyday sneakers to special occasion shoes. Discover new arrivals, special deals, and enjoy a seamless shopping experience. Step up your shoe game with StepStyle!                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;