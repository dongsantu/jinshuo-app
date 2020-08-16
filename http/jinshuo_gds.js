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


export const queryGdsSpuPage = (params) => {
  return api.post('/v1/h5/user/gdsmain/queryGdsSpuPage',params);
} 

//  获取验证对象
export const geetest = (params) => {
  return api.get('/userApi/v1/wx/user/geetest?t='+(new Date()).getTime());
}

