import axios from 'axios'

//在开发环境中的测试 development
if(process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'http://localhost:9090'
}
//在生产环境中的测试 production
if(process.env.NODE_ENV == 'production') {
	//axios.defaults.baseURL = ''
}
//还有一种环境 debug

//响应超时的时间
// axios.defaults.timeout = 5000;

//请求拦截
axios.interceptors.request.use(
  config => {
    // console.log(config);
		//config.headers = { DeviceType : 'H5' } //设置响应头部
		return config
	}
)

// 设置get请求
export function axiosGet(url, params) {
  let newAxios = axios.create({
    timeout: 500,
    headers: { 'Content-Type': 'application/json',"charset":"utf-8","token": localStorage["userToken"] }
  });
  return newAxios({
    url: url,
    method: "get",
    params: params
  })
}

// 设置post请求
export function axiosPost(url,params) { 
  let newAxios = axios.create({
    timeout: 500,
    headers: { 'Content-Type': 'application/json',"charset":"utf-8","token": localStorage["userToken"] }
  });
  return newAxios({
    method: "post",
    url: url,
    data: params
  })
}