import axios from 'axios';
import { axiosMockNoqApi } from './mockApi/mockApi';

const axiosNoqApi = axios.create({
    baseURL: "http://51.21.97.243", //"http://localhost",
    headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
});

export default import.meta.env.NOQ_IS_MOCK_API === 'true' ? axiosMockNoqApi : axiosNoqApi;
