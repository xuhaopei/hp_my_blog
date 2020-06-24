
import axios from "axios";

//完成基本配置
const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 1000,
    //withCredentials: true, 
    /**
     *  表示跨域请求时是否需要使用凭证  请求为跨域类型时是否在请求中协带cookie true为是，如果设置了这个为true时，后台的Access-Control-Allow-Origin不能为* 只能为这个客户端服务器的域名 
        Access-Control-Allow-Credentials 响应头表示是否可以将对请求的响应暴露给页面。返回true则可以，其他值均不可以
     * */ 
    
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
export default instance;
