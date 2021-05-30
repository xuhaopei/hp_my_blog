import instance from './base.js'

import {
    validateLogin
} from '@/utils/Validate.js'
import {
    Message
} from 'element-ui';

export async function httpImageAdd($file){
    let msg = {};
    try {
        if (validateLogin() === false) throw new Error("请您登录");
        let formdata = new FormData();
        formdata.append("image", $file);

        let {data} = await instance.request({
            url: "/imageAdd",
            method: "post",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        })

        msg.url = data.data[0];
        Message({
            showClose: true,
            message: "图片上传成功",
            type: 'success',
        });
    } catch (error) {
        Message({
            showClose: true,
            message: error,
            type: 'error',
        });
    }

    return msg;
} 