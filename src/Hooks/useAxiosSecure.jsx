import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";


const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {
    let navigate = useNavigate()
    let {userLogOut} = useContext(AuthContext)
    // Add a request interceptor
    axiosSecure.interceptors.request.use((config) => {
     const token = localStorage.getItem("access-token")   
     config.headers.authorisation = `Bearer ${token}` 
     return config
    }, error => {
        return Promise.reject(error);
    })
    // Add a response interceptor 401 403 status
    axiosSecure.interceptors.response.use((res) => {
        return res
    }, err => {
        const status = err.response.status
        console.log(status)
    if(status === 403 || status === 401){
        // for 401 or 403 logout the user and move the user to the login pagef
        userLogOut()
        .then(() => {
            console.log("user Log out")
          })
          .catch((error) => {
            console.log(error)
          });
        navigate("/login")
    }

        return Promise.reject(err);
    })

    return axiosSecure
};

export default useAxiosSecure;