import instance from './base.js'

export function setToken(){
    let token = localStorage.getItem('token');
    instance.defaults.headers['token'] = token;
}

export function clearToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    instance.defaults.headers['token'] = '';
}