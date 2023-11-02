import axios from 'axios'
import {Message} from "@element-plus/icons-vue";


axios.defaults.withCredentials = true
const http = axios.create({
    //'api'是指把当前启动项目的url作为baseURL
    baseURL: "http://192.168.131.129:14565",
    timeout: 1000 * 5,//超时时间，单位毫秒,
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    if (localStorage.getItem('user')) {
        let token = JSON.parse(localStorage.getItem('user')).token;
        config.headers['authorization'] = token;
        let minute = 30;
        let expires = new Date(new Date() * 1 + minute * 60 * 1000);
        localStorage.setItem('user', localStorage.getItem('user'));
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //只返回config内的data的数据，其他的不展示
    const res = response.data
    return res
}, function (error) {
    // 对响应错误做点什么
    //如果请求出错会有弹框提示
    Message({
        type: "error",
        message: error.message
    })
    return Promise.reject(error)
});

export default http