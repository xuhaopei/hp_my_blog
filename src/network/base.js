
import axios from "axios";

//完成基本配置
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}          // 设置请求头
});

export default instance;
