import { getUserInfo } from '@/http/user';

const state = {
  token: '',//'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNqqVkqtKFCyMjQ1M7UwNjUzNtZRKi1OLfJMAYoZGlmYWphbWBhbmJoaGZqZmdQCAAAA__8.HOQGsqKeq444h6RXX1LHrx_BK7a1nHumNZO9cqqQaocQkhFsKeC7G0YbSqoVbNMJkTy1j-3ZLZhs5q8_7KmkYg',
  userName:'',
  userId:'',
  companyId:'',
  //user:null
  user:'',//{
    /* bookType:'high',
    userType:1,
    roles:['admin'], //['aduit'],
    name:'haha',
    companyName:'超大型公司' */
  //}
}

const mutations = {
  CHANGE_TOKEN (state,res) {
    console.log(2.2);
    state.token = res;
	uni.setStorageSync('token', res);
    //window.sessionStorage.setItem('token', res);
  },
  SET_USERINFO (state, res){
    state.user = res;
	//state = JSON.parse(JSON.stringify(state))
    console.log('stateuser:',state);
  }
}
const actions = {
  restore({ commit }) {
    //const token = window.sessionStorage.getItem('token');
    const token = ''; // todo
    console.log('restore-in',token);
    if (!token) {
      return () => Promise.resolve();
    }
     commit('CHANGE_TOKEN', token);

     return () => Promise.resolve();
   },
   getUserInfoAction({ commit }){
    getUserInfo().then((data)=>{
		if(data.data.retCode===0){
			commit('SET_USERINFO',data.data.result);
		}else{
			commit('CHANGE_TOKEN','');
			// #ifdef H5
			let shopId = uni.getStorageSync('shopId');
			if(location.href.indexOf('inviteCode=')>-1){
				let inviteCode = location.href.split('inviteCode=')[1]
				if(inviteCode.indexOf('&')>-1){
					inviteCode = inviteCode.split('&')[0]
				}
				try{
					window.location.href= location.href.split('?')[0] + '?inviteCode='+inviteCode+'&shopId='+shopId
				}catch(e){
					console.log(e)
				}
				
			}else{
				window.location.href= location.href.split('?')[0]+'?shopId='+shopId
			}
				
			// #endif
		}
      
    }).catch((err)=>{
      //CHANGE_TOKEN('');
      commit('CHANGE_TOKEN','');
	  // #ifdef H5
		//window.location.href= location.href.split('?')[0]
		const shopId = uni.getStorageSync('shopId') || '';
		if(location.href.indexOf('inviteCode=')>-1){
			let inviteCode = location.href.split('inviteCode=')[1]
			window.location.href= location.href.split('?')[0] + '?inviteCode='+inviteCode+'&shopId='+shopId
		}else{
			window.location.href= location.href.split('?')[0]+'?shopId='+shopId
		}
	  // #endif
      //Toast('登陆失败，请稍后重新进入再试');
      /* if(!window.sessionStorage.getItem('getUserInfoFail')){

      } */
    })
  }
}

export default {
  state,
  mutations,
  actions
}
