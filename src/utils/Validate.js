import store from '@/store/index.js'
import { Message } from 'element-ui';
 
export function validateLogin(){
    if(store.state.people.user === null) {
        let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        if(user === null) {
            Message({
                showClose: true,
                message: "权限受限，建议您登录。",
                type: 'error'
            })
            return false;
        } else {
            setHeaderToken(localStorage.getItem("token"));
            store.commit('setUser',user);
            return true;
        }
    } else {
        return true;
    }

}

