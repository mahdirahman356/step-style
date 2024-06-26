import { useForm } from "react-hook-form";
import iamge from "../../assets/image/login-page-image.jpg"
import "../../style.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";
const Login = () => {
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const { loginUser } = useContext(AuthContext)
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        setLoading(true);
        loginUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    title: 'Success',
                    text: 'User Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                navigate(from, { replace: true });
            })
            .cetch(error => {
                console.log(error.message)
                Swal.fire({
                    title: 'Error',
                    text: 'User is not available',
                    icon: 'error',
                    confirmButtonText: 'close'
                })
                setLoading(false);
            })

    }



    return (
        <div className="w-full nunito">
            <div className="m-0 p-0  w-full flex flex-col-reverse lg:flex-row justify-between">

                <div className="hero h-screen shadow-2xl lg:w-[40%]" style={{ backgroundImage: `url(${iamge})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-4xl font-semibold" >New Here? Join StepStyle Today!</h1>
                            <p className="mb-5">Welcome to StepStyle! Enjoy exclusive deals, personalized recommendations, and effortless shopping. Sign up now and step into style!</p>
                            <button className="btn text-white border-none bg-[#1A2130] rounded-3xl w-44 mr-3">
                                <Link to='/'>Go Home</Link>
                            </button>
                            <button className="btn text-white border-none bg-[#1A2130] rounded-3xl w-44">
                                <Link to='/sign-up'>Sing Up</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="text-3xl md:text-5xl font-semibold mt-5">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] md:w-[50%] mx-auto space-y-4 mt-12 mb-4">
                        <label className="input rounded-3xl input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                name="email"
                                placeholder="Email"
                                {...register("email", { required: true })} />
                        </label>
                        {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                        <label className="input rounded-3xl input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password"
                                className="grow"
                                name="password"
                                placeholder="Password"
                                {...register("password", { required: true })} />
                        </label>
                        {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                        <button className="btn w-full rounded-3xl bg-[#1A2130] text-white">
                            {loading ?
                                <span className="loading loading-spinner text-white"></span>
                                : "Continue"}
                        </button>
                    </form>
                    <p className="text-center">___________or___________</p>
                </div>
            </div>
        </div>
    );
};

export default Login;