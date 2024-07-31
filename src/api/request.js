import axios from "axios";
import store from "@/store";
const request = axios.create({
    baseURL: '/api',
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use((config)=>{
    if(store.state.detail.uuidToken){
        config.headers.userTempId = store.state.detail.uuidToken
    }
    if(localStorage.getItem('Token')){
        config.headers.Token = localStorage.getItem('Token')
    }
    return config
});

//响应拦截器
request.interceptors.response.use((res)=>{
    return res.data
}, ()=>{
    return Promise.reject(new Error('Faile'));
})

export default request
