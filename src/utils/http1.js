import axios from 'axios';

// 请求拦截 设置统一的header
axios.interceptors.request.use(
  config => {
    if (localStorage.jwt2) {
      config.headers.Authorization = localStorage.jwt2;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
