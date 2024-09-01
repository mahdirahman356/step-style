import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { AuthContext } from "../Context/Context";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    let { googleLogIn } = useContext(AuthContext)
    let axiosCommon = useAxiosCommon()
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    let handleGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                console.log(result.user)
                let userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: null,
                    location: null,
                    contactNumber: null
                }
                axiosCommon.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.acknowledged === true) {
                            Swal.fire({
                                title: 'Success',
                                text: 'User Added Successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                        }
                    })
                navigate(from, { replace: true });

            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="mt-6">
            <div className="">
                <p onClick={handleGoogleLogIn} className="btn btn-outline border-gray-500 rounded-3xl w-full"><FcGoogle className="text-[25px]" />Continue With Google</p>
            </div>
        </div>
    );
};

export default GoogleLogin;