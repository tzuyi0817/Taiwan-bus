import axios, { type AxiosHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('taiwan_bus_token');

    if (token && config.headers) {
      config.headers = { ...config.headers } as AxiosHeaders;
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    const { statusText } = error.response;

    if (statusText === 'Unauthorized') {

    } else {
      // toast.showToast(data?.message ?? error.message, 'error');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
