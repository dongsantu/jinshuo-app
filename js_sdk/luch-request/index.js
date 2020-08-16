import Request from './request'
import store from '@/store/index';
import host from '@/http/config'
console.log('host',host)
const test = new Request();
test.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = host;
	/* config.header = {
		a: 1,
		b: 2
	} */
	return config
})
test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	console.log('config',config)
	if(store.state.login && store.state.login.token){
      config.header = {
		...config.header,
        Authorization: `Bearer ${store.state.login.token}`
      }
    }
	if (config.method === 'post') {
		const shopId = uni.getStorageSync('shopId');
		if (shopId) {
		  if (config.data) {
			console.log('config.data', config.data)
			config.data.shopId = shopId
		  } else {
			config.data = { 'shopId': shopId }
		  }
		  console.log('config', config)
		}
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
test.interceptor.response((response) => { /* 请求之后拦截器 */
	return response;
})

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = host; /* 根域名不同 */
	/* config.header = {
		a: 1,
		b: 2
	} */
	console.log(123)
	/* config.header = {
			...config.header,
	  Authorization: `Bearer 1232131231`
	} */
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	/* config.header = {
		...config.header,
		b: 1
	} */
	if(store.state.login && store.state.login.token){
	  store.commit('SET_LOADING',true);
	  config.header = {
		...config.header,
	    Authorization: `Bearer ${store.state.login.token}`
	  }
	}
	if (config.method === 'POST') {
		const shopId = uni.getStorageSync('shopId');
		if (shopId) {
		  if (config.data) {
			config.data.shopId = shopId
		  } else {
			config.data = { 'shopId': shopId }
		  }
		}
	}
	console.log('config2',config)
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log('response：：：',response);
	store.commit('SET_LOADING',false);
	if(response.statusCode===401 && response.data.error_description && response.data.error==='invalid_token'){
		console.log('过期')
		store.commit('CHANGE_TOKEN','');
		store.commit('SET_USERINFO','');
		/* uni.showToast({
			title: '用户登陆信息过期，请关闭页面后重新进入！',
			duration: 2000,
			icon:'none'
		}); */
		uni.showModal({
		    title: '提示',
		    content: '用户登陆信息过期，请重新登陆',
		    success: function (res) {
		        if (res.confirm) {
		            console.log('用户点击确定');
					uni.removeStorageSync('failtry');
					const shopId = uni.getStorageSync('shopId');
					let origin = window.location.origin + '/#/?shopId='+shopId;
					let inviteCode = '';
					if(location.href.split('inviteCode=').length>1){
						inviteCode = location.href.split('inviteCode=')[1]
						if(inviteCode.indexOf('&')>-1){
							inviteCode = inviteCode.split('&')[0]
						}
					}
					if(inviteCode){
						origin = origin +'&inviteCode='+inviteCode
					}
					window.location.href = origin;
					//window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
	}
	return response;
})
export {
	http,
	test
};
export default http

