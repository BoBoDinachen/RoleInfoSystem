import { axiosGet, axiosPost } from "../utils/request.js";


// 关于用户的
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



// 关于式神信息的
export const RoleAPI = {
  // 获取所有的式神信息
  getRolesInfo: function () { 
    let request = axiosGet("/role/allInfo");
    return request;
  },
  // 按式神类别获取式神信息
  getRolesInfoByType(param) { 
    // restful风格请求
    let request = axiosGet("/role/getInfoByType/"+param);
    return request;
  }
}
