import { axiosGet, axiosPost } from "../utils/request.js";

export const UserAPI = {
  // 登录请求
  login: function (params) {
    let request = axiosPost("/user/login",params)
    return request;
  },
  // 注册请求
  register: function (params) { 
    let request = axiosPost("/user/register", params)
    return request;
  }

}
