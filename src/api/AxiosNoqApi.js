import axios from 'axios';
import { axiosMockNoqApi } from './mockApi/mockApi';

const axiosNoqApi = axios.create({
    baseURL: import.meta.env.NOQ_BASE_URL,
    headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
});

export default import.meta.env.NOQ_IS_MOCK_API === 'true' ? axiosMockNoqApi : axiosNoqApi;
