import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:8008'
});


export default axiosApi;