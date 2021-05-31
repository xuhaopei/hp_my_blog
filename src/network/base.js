import axios from "axios";

import {
  createLoading,
  cancelLoading
} from '@/assets/js/androidLoading.js';

const instance = axios.create({
  // baseURL: 'http://106.75.167.111:80',	          // 个人博客网站服务器的地址
  baseURL: 'http://106.75.167.111:5200',          // 个人笔记网站服务器的地址
  //baseURL: 'http://localhost:5200',
  timeout: 5000,                                    
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  /*在发送请求之前做些什么*/
  createLoading(); // 每次请求都弹出请求加载图标

  return config;
}, function (error) {
  /*对请求错误做些什么*/
  cancelLoading();
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  /* 对响应数据做点什么*/
  cancelLoading();
  return response;

}, function (error) {
  /* 对响应错误做点什么*/
  cancelLoading();
  return Promise.reject(error);

});

export default instance;