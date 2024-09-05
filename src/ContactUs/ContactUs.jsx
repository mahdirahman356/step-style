import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const ContactUs = () => {
    return (
        <div>
            <div>
                <div className="hero mx-auto my-14 md:my-24 bg-fixed" style={{ backgroundImage: `url(https://i.ibb.co/1GjgS4Z/jake-ingle-s-t1o-JXKYI4-unsplash-1.jpg)` }}>
                    <div className="hero-overlay bg-opacity-70 py-60"></div>
                    <div className="w-full text-neutral-content">
                        <div className="mx-auto px-1 md:px-24 text-white">
                            <div className="hero">
                                <div className="hero-content flex-col lg:flex-row justify-between">
                                    <div className="lg:w-1/2">
                                        <h2 className="text-3xl md:text-6xl font-bold mb-3 text-center lg:text-start">Contact Us</h2>
                                        <p className="text-xl lg:w-[70%] text-center lg:text-start">
                                            If you have any questions, feedback, or need assistance, feel free to reach out to us!       
                                        </p>
                                    </div>
                                    <div className="lg:w-1/2 p-4 md:p-10 rounded-xl bg-black opacity-50 mt-6">
                                        <p className="flex items-center gap-2 text-base md:text-2xl mb-3">
                                            <MdOutlineEmail />
                                            mahdi.rahman356@gmail.com
                                        </p>
                                        <p className="flex items-center gap-2 text-base md:text-2xl mb-3">
                                            <IoCallOutline />
                                            +123 456 7890
                                        </p>
                                        <p className="flex items-center gap-2 text-base md:text-2xl mb-3">
                                            <IoLocationOutline />
                                           Dhaka, Bangladesh
                                        </p>
                                        
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

export default ContactUs;