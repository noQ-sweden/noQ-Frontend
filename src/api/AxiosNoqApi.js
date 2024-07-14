import axios from 'axios';
import { axiosMockNoqApi } from './mockApi/mockApi';
import Cookies from 'js-cookie';



const csrftoken = Cookies.get('csrftoken');

axios.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put') {
        config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
});

const axiosNoqApi = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-type": "application/json"
      },
      withCredentials: true,
});


export default import.meta.env.NOQ_IS_MOCK_API === 'true' ? axiosMockNoqApi : axiosNoqApi;
