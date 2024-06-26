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
                        <h1 className="text-3xl md:text-5xl font-bold nunito">Welcome to StepStyle</h1>
                        <p className="text-sm md:text-base py-6 md:w-[60%] nunito">
                        Welcome to StepStyle, your ultimate destination for fashionable and comfortable footwear. Our selection ensures every step you take is in style. From everyday sneakers to special occasion shoes, we have something for everyone. Browse our new arrivals, take advantage of our special deals, and enjoy a seamless shopping experience. Step up your shoe game with StepStyle!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;