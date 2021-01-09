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
  },
  // 注册信息查重
  checkRepeat: function (params) { 
    let request = axiosPost("/user/checkRepeat", params)
    return request;
  }
}
export const RoleAPI = {
  // 获取所有的式神信息
  getRolesInfo: function () { 
    let request = axiosPost("/role/allInfo");
    return request;
  }
}
