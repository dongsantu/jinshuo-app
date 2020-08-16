import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		login
	},
	state: {
		shopLogo:'',
		shopDesc:'',
		shopName:'',
		shopId:'',
		shopType:0, //0店铺，1代销商
		appid:'',
		component_appid:'',
		hasLogin: false,
		loginProvider: "",
		openid: null,
		showCount: 0,
		city:'',
		fetchLoading:false,     //全局加载状态的Loading
	},
	mutations: {
		setShopLogo(state,shopLogo){
			state.shopLogo = shopLogo;
			uni.setStorageSync('shopLogo',shopLogo)
		},
		setShopDesc(state,shopDesc){
			state.shopDesc = shopDesc;
			uni.setStorageSync('shopDesc',shopDesc)
		},
		setShopName(state,shopName){
			state.shopName = shopName;
			uni.setStorageSync('shopName',shopName)
		},
		setCity(state,city){
			state.city = city;
		},
		setShopId(state,shopId){
			state.shopId = shopId;
		},
		setShopType(state,shopType){
			state.shopType = shopType;
		},
		setAppId(state,appid){
			state.appid = appid;
		},
		setComponentAppId(state,component_appid){
			state.component_appid = component_appid;
		},
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		// loading开关
	  SET_LOADING (state,res) {
		if (res) {
		  state.showCount += 1;
		} else {
		  state.showCount -= 1;
		}
		if(state.showCount < 0){
		  state.showCount =0;
		}
		if (state.showCount > 0) {
		  state.fetchLoading = true;
		} else {
		  state.fetchLoading = false;
		}
		console.log('state.showCount--',state.showCount);
	  },
	  CLEARLOADING(state){
		console.log('clearloading');
		state.showCount = 0;
	  },
	},
	actions: {
		// lazy loading openid
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
