import axios from 'axios';
import { axiosMockNoqApi } from './mockApi/mockApi';

const axiosNoqApi = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
});

export default import.meta.env.NOQ_IS_MOCK_API === 'true' ? axiosMockNoqApi : axiosNoqApi;
