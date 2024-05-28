import axios from 'axios';

const axiosNoqApi = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
});

export default axiosNoqApi;