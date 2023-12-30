import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://emil-m-js-20-financetracker-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;