import axios from "axios";

const axiosPublic=axios.create({
    // baseURL:'https://diagnoz-server.vercel.app',
    baseURL:'https://diagnoz-server.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;