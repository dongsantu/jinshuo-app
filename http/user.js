import api from '@/js_sdk/luch-request/index';
const userapi = '/userapi';
export const getSession = (params) => {
	// #ifdef H5
		return api.post('/userApi/v1/wx/login/gzpt', params);
	// #endif
	// #ifdef MP-WEIXIN
		return api.post('/userApi/v1/wx/login/mini', params);
	// #endif
}
// 获取用户信息 根据 code
export const getUserInfo = (params) => {
  return api.post('/userApi/v1/wx/user/info',params);
} 
//获取配置信息
export const getConfig = (params) => {
  return api.post('/userApi/v1/wx/config/getConfig',params);
} 
// 创建二维码
export const createQrcode = (params) => {
  return api.post('/userApi/v1/api/config/createQrcode',params);
} 
// /v1/wx/user/comUserInfo 完善客户信息
export const comUserInfo = (params) => {
  return api.post('/userApi/v1/wx/user/comUserInfo',params);
}
// /v1/wx/user/memberInfo 微信用户信息
export const memberInfo = (params) => {
  return api.get('/userApi/v1/wx/user/memberInfo',params);
}

//  获取验证对象
export const geetest = (params) => {
  return api.get('/userApi/v1/wx/user/geetest?t='+(new Date()).getTime());
}

//  发送验证码
export const sendMsg = (params) => {
  return api.post('/userApi/v1/wx/user/sendMsg',params);
}
//更新手机 
export const upPhone = (params) => {
  return api.post('/userApi/v1/wx/user/upPhone',params);
}