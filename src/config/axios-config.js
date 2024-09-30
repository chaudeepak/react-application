import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    timeoutErrorMessage: 'server timeout...',
        params: {
            lang: 'english'
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
            // 'x-rapidapi-key': '1a0674d546mshd2198af6ea64f71p16d63fjsn94c88fec5d19',
            'x-rapidapi-host': 'bbc-api2.p.rapidapi.com'
        }
})

axiosInstance.interceptors.response.use(
    (success) => {
        return success
    },
    (reject) => {
        console.log(reject)
        throw reject?.response;
    }
)

export default axiosInstance;