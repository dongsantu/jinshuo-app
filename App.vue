<script>
	import {appId} from '@/http/config'
	import {getSession,getConfig} from '@/http/user'
	
	let webSite = window.location.origin;
	const queryString = require('query-string');
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//uni.setStorageSync('token','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjpudWxsLCJ1c2VyX25hbWUiOiI4MTY0MDMyOCIsInNjb3BlIjpbInNlcnZpY2UiXSwibmlja25hbWUiOiJ-5rKIIiwic2hvcElkIjoxMDA4OCwiaWQiOiIxMTcyOTM0NDg3NjMwMTUxNjgiLCJleHAiOjE1Nzg4MjcxNzgsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImp0aSI6ImY2NjUwM2IzLWYxY2YtNDcxOS1hNjg0LWFjMGZiMmRlOTA3OSIsImNsaWVudF9pZCI6InltLWNlbnRlci11c2VyIiwidXNlcm5hbWUiOiI4MTY0MDMyOCJ9.QjHTWx5YSa4Ag01Q6t_OQtWeRmzaA7PaahkasMiRcosNzRDvu4U_D4IPlDK1NZRE3rrKld9Le3rxGINW-myepFTCMu2Li4eMhw1FWWzYxHowAP9Oil75CtOjgz_WAlVClfXYiCpjsD8fCKymEdwPVZ_wGWMtQQxjVGDaQcDP4lDomhPaUjd60jARNw82Q_2aHgON7iMEwlmbNG2L9daNe0-7deRHU7wfdUcGraD2cs_p5vuS5ZpZLzbjhbUQjOf45ppSpgB2p_eB197j4FaHetYgG4zqrlpHADc1g7qyvqQmH-dHGjXfZaDBfynv7nzQdp7_SFBehAmD_uQAN8Rlqw')
			//uni.setStorageSync('token','eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjpudWxsLCJ1c2VyX25hbWUiOiI4MTY0MDMyOCIsInNjb3BlIjpbInNlcnZpY2UiXSwibmlja25hbWUiOiJ-5rKIIiwic2hvcElkIjoxMDA4OCwiaWQiOiIxMTcyOTM0NDg3NjMwMTUxNjgiLCJleHAiOjE1Njk4Mjc5MjcsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImp0aSI6IjdmZjI0MTE1LTllNWItNDQzOC05MjI2LWM4MDhmNWM2ZWJmYiIsImNsaWVudF9pZCI6InltLWNlbnRlci11c2VyIiwidXNlcm5hbWUiOiI4MTY0MDMyOCJ9.I9tAQEqiGijduyd8jTWIhzQMc8bNel2GvJfqU5IVOIgOG5yhJQyiG6P6zBnJslmJ_ZShvBmt5TYTpHQzf_e-0gJxJyd6HZeo94i9YP4lbjdd5NxrmHeUncX5DWnbjxAEj3t1Hd3W8SgyuJkhCCyGm_FaXLOUmF4ICd6iYXwzO6IpOsll953LvhvYQA0BIQ211wIKtxREkOTOmKux45heNiGQA6wKvaRcIHur5nCgiix_3TbUQLo4jFs8ZiSxiSxZ3CaDM45tF2UP3IWy9mKRhYAsIq5WtqpVkan0LLS5inuhcJlFiDKe5yAi-BIQhUGkrcN76S1sLGwfRvPWyisTxg')
			const token = uni.getStorageSync('token');
			const shopId = uni.getStorageSync('shopId');
			const parsed = queryString.parse(location.href.split('?')[1]);
			let urlShopId = '';
			if(parsed && parsed.shopId){
				urlShopId = parsed.shopId.split('#')[0];
			}else if(location.href.split('shopId=').length>1){
				urlShopId = location.href.split('shopId=')[1]
				if(urlShopId){
					urlShopId = (urlShopId.split('&')[0]).split('#')[0]
				}
			}
			if(shopId && shopId !==urlShopId){
				this.$store.commit('CHANGE_TOKEN','');
			}else if(token){
				this.$store.commit('CHANGE_TOKEN',token);
			}
			uni.setStorageSync('shopId',urlShopId)
			this.$store.commit('setShopId',urlShopId);
			console.log('store.shopId:',this.$store.state.shopId)
			// #ifdef H5
				this.wxInit();
				
			// #endif
			const shopName = uni.getStorageSync('shopName');
			if(shopName){
				this.$store.commit('setShopName',shopName);
			}
			const shopLogo = uni.getStorageSync('shopLogo');
			if(shopLogo){
				this.$store.commit('setShopLogo',shopLogo);
			}
			const shopDesc = uni.getStorageSync('shopDesc');
			if(shopDesc){
				this.$store.commit('setShopDesc',shopDesc);
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			/* async getConfigFun(shopId){
				try{
					let obj = await getConfig({shopId})
					console.log('shopobj',obj)
					if(obj.data && obj.data.result){
						console.log('obj.data.result.appid',obj.data.result.appid)
						console.log('this.store',this.$store)
						this.$store.commit('setAppId',obj.data.result.appid)
						this.$store.commit('setShopType',obj.data.result.type)
						return obj.data.result;
					}else{
						return false;
					}
					
				}catch(e){
					uni.showToast({
						title: e.retMsg,
						duration: 2000
					});
					return false;
				}
			}, */
			async wxInit(){
				let failtry = uni.getStorageSync('failtry');
				let data={code:''};
				const parsed = queryString.parse(location.href.split('?')[1]);
				if(parsed && parsed.code){
					data.code = parsed.code;
				}
				if(parsed && parsed.inviteCode){
					data.inviteCode = parsed.inviteCode;
				}else if(location.href.split('inviteCode=').length>1){
					data.inviteCode = location.href.split('inviteCode=')[1]
					if(data.inviteCode.indexOf('&')>-1){
						data.inviteCode = data.inviteCode.split('&')[0]
					}
				}
				let shopId = this.$store.state.shopId;
				
				console.log('parsed',parsed)
				console.log('parsed.code::::',parsed.code);
				console.log('this.$store.state',this.$store.state)
				if (this.$store.state.login.token && this.$store.state.login.token !='') {
					console.log('已存在 accessToken：'+ this.$store.state.login.token);
					this.$store.dispatch('getUserInfoAction');
					// resolve();
				}else {
					//先获取appid跟 isDis
					/* let appidObj = this.getConfigFun(shopId)
					console.log('appidObj',appidObj) */
					/* if(!appidObj){
						return ;
					}else{
						
						this.$store.commit('setAppId',appidObj.appid)
						this.$store.commit('setShopType',appidObj.type)
					} */
					//await this.getConfigFun(shopId)
					try{
						console.log('getConfig--shopId:',this.$store.state.shopId)
						let obj = await getConfig({shopId:this.$store.state.shopId})
						console.log('shopobj',obj)
						if(obj.data && obj.data.result){
							this.$store.commit('setAppId',obj.data.result.appid)
							this.$store.commit('setComponentAppId',obj.data.result.component_appid)
							this.$store.commit('setShopType',obj.data.result.type)
							this.$store.commit('setShopName',obj.data.result.shopName)
							this.$store.commit('setShopLogo',obj.data.result.logo)
							this.$store.commit('setShopDesc',obj.data.result.sketch)
						}else{
							return ;
						}
						
					}catch(e){
						uni.showToast({
							title: e.retMsg,
							duration: 2000
						});
						return ;
					}
					
					console.log('appid----',this.$store.state.appid)
					console.log('shopType----',this.$store.state.shopType)
					// 微信授权登录
					console.log('appId', appId);
					//const parsed = queryString.parse(location.href.split('?')[1]);
					const local = window.location.href;
					let origin = window.location.origin + '/#/?shopId='+shopId;
					if(data.inviteCode){
						origin = origin+'&inviteCode='+data.inviteCode
					}
					console.log('parsed:::',parsed);
					console.log('data-->',data);
					if (!parsed.code || parsed.code == null || parsed.code ==='') {
						console.log('没带code,进行跳转 ')
											  //https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE&component_appid=component_appid#wechat_redirect
						
						window.location.href = `http://h5.ymzby.com/index.html?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
						//window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
						//window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
						// resolve();
					} else { // url带 code则 获取用户信息
						data.shopId = this.$store.state.shopId;
						console.log('getsession-data:',data);
						getSession(data).then((data)=>{
							console.log('data:',data);
							if(data.data.retCode !==0 && !failtry){
								uni.setStorageSync('failtry','1');
								window.location.href = `http://h5.ymzby.com/index.html?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
								//window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
								//window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
								//reject();
							}else if(data.data.retCode == 500){
								
								uni.showToast({
									title: data.data.retMsg || '授权登录失败',
									duration: 2000,
									icon:'none'
								});
							}else{
								uni.removeStorageSync('failtry');
								this.$store.commit('CHANGE_TOKEN', data.data.result.token); //add  成功则保存token
								this.$store.dispatch('getUserInfoAction');
								//resolve();
							}
								//this.$store.commit('CHANGE_TOKEN', data.result); //add  成功则保存token
						}).catch((e)=>{
							if(!failtry){
								uni.setStorageSync('failtry','1');
								 window.location.href = `http://h5.ymzby.com/index.html?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
								 //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1&component_appid=${this.$store.state.component_appid}#wechat_redirect`;
								 //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.$store.state.appid}&redirect_uri=${encodeURIComponent(origin)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
								//reject();
							}else{
								uni.showToast({
									title: '授权登陆失败，请稍后重新进入',
									duration: 2000,
									icon:'none'
								});
							}
						});
					}
				}
			}
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	/*每个页面公共css */
	page {
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>
