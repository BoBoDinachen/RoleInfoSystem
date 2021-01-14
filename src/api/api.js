import { axiosGet, axiosPost } from "../utils/request.js";


// 关于用户的
export const UserAPI = {
  // 用户头像的baseURL
  HeadURL: "http://localhost:9090/user",
  // 登录请求
  login: function (params) {
    let request = axiosPost("/user/login", params);
    return request;
  },
  // 按id查找用户信息
  findUserByID(id) { 
    let request = axiosGet("/user/findUserById/" + id);
    return request;
  },
  // 注册请求
  register: function (params) { 
    let request = axiosPost("/user/register", params);
    return request;
  },
  // 注册信息查重
  checkRepeat: function (params) { 
    let request = axiosPost("/user/checkRepeat", params);
    return request;
  },
  // 修改用户信息
  updateUserInfo(params) { 
    let request = axiosPost("/user/updateUserInfo", params);
    return request;
  },
  // 修改用户密码
  updateUserPass(params) { 
    let request = axiosPost("/user/setPassWord", params);
    return request;
  }
}



// 关于式神信息的
export const RoleAPI = {
  // 式神头像的baseURL
  ImgURL: "http://localhost:9090/",
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
  },
  // 修改式神信息
  updateRoleInfo(params) {
    let request = axiosPost("/role/changeRole", params);
    return request;
  },
  // 式神名字查重
  checkReName(name) { 
    let request = axiosGet("/role/checkName/" + name);
    return request;
  },
  // 添加式神信息
  addRoleInfo(params) { 
    let request = axiosPost("/role/addRole", params);
    return request;
  },
  // 删除式神
  deleteRoleInfo(name) { 
    let request = axiosGet("/role/deleteRole/" + name);
    return request;
  }
}
