import axios from "axios";


const axiosCommon = axios.create({
    baseURL: "https://step-style-server.vercel.app"
})

const useAxiosCommon = () => {
    return axiosCommon
};

export default useAxiosCommon;