import axios from 'axios';
import config from '../config';

const Axios = axios.create({
    baseURL: config.baseURL, // 因为我本地做了反向代理
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    // }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error.response.status === 403) {
            alert('请求异常403');
        } else if (error.response.status === 404) {
            alert('请求异常404');
        } else if (error.response.status === 500) {
            alert('请求异常500');
        } else if (error.response.status === 502) {
            alert('请求异常502');
        }
        return Promise.reject(error);
    }
);

export default Axios;