import axios from "axios";

const mockAjax = axios.create({
    baseURL: '/mock',
    timeout: 5000
});

//请求拦截器
mockAjax.interceptors.request.use((config)=>{
    return config
});

//响应拦截器
mockAjax.interceptors.response.use((res)=>{
    return res.data
}, ()=>{
    return Promise.reject(new Error('Faile'));
})

export default mockAjax
