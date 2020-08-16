import wx from 'weixin-js-sdk'			//微信sdk依赖
import {getWXAuth} from '@/http/product'
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareWeibo','getLocation']
import {geocoderF} from '@/http/product'
import store from '@/store/index';
//const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData']
//let wx= require('jweixin-module') 
//要用到微信API

function readyFun(dataForWeixin){
	wx.ready(function () {
	  wx.onMenuShareAppMessage({
	  //wx.updateAppMessageShareData({
	    title: dataForWeixin.title,
	    desc: dataForWeixin.desc,
	    link: dataForWeixin.linkurl,
	    imgUrl: dataForWeixin.img,
	    trigger: function trigger(res) { },
	    success: function success(res) {
	      console.log('已分享');
	    },
	    cancel: function cancel(res) {
	      console.log('已取消');
	    },
	    fail: function fail(res) {
	      //alert(JSON.stringify(res));
	    }
	  });
	  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
	  wx.onMenuShareTimeline({
	  //wx.updateTimelineShareData({
	    title: dataForWeixin.title,
	    link: dataForWeixin.linkurl,
	    imgUrl: dataForWeixin.img,
	    trigger: function trigger(res) {
	      // alert('用户点击分享到朋友圈');
	    },
	    success: function success(res) {
	      //alert('已分享');
	    },
	    cancel: function cancel(res) {
	      //alert('已取消');
	    },
	    fail: function fail(res) {
	      //alert(JSON.stringify(res));
	    }
	  });
	// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
	 wx.onMenuShareQQ({
	    title: dataForWeixin.title,
	    desc: dataForWeixin.desc,
	    link: dataForWeixin.linkurl,
	    imgUrl: dataForWeixin.img,
	    trigger: function trigger(res) {
	      //alert('用户点击分享到QQ');
	    },
	    complete: function complete(res) {
	      //alert(JSON.stringify(res));
	    },
	    success: function success(res) {
	      //alert('已分享');
	    },
	    cancel: function cancel(res) {
	      //alert('已取消');
	    },
	    fail: function fail(res) {
	      //alert(JSON.stringify(res));
	    }
	  });
	  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
	  wx.onMenuShareWeibo({
	    title: dataForWeixin.title,
	    desc: dataForWeixin.desc,
	    link: dataForWeixin.linkurl,
	    imgUrl: dataForWeixin.img,
	    trigger: function trigger(res) {
	      //alert('用户点击分享到微博');
	    },
	    complete: function complete(res) {
	      // alert(JSON.stringify(res));
	    },
	    success: function success(res) {
	      //alert('已分享');
	    },
	    cancel: function cancel(res) {
	      // alert('已取消');
	    },
	    fail: function fail(res) {
	    // alert(JSON.stringify(res));
	    }
	  });
	})
	wx.error(function (res) {
	  //alert("微信验证失败"+JSON.stringify(res));
	});
}
let wxconfig = ''						
function getJSSDK(url, dataForWeixin) {
	let shopId = uni.getStorageSync('shopId');
	console.log('wxconfig',wxconfig)
	if(wxconfig){
		readyFun(dataForWeixin)
	}else{
		getWXAuth({url:encodeURIComponent(url),shopId:shopId}).then(res => {
			  console.log('sdkres',res)
		  wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: res.data.result.appId, // 必填，公众号的唯一标识
		    timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
		    nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
		    signature: res.data.result.signature, // 必填，签名
		    jsApiList: jsApiList // 必填，需要使用的JS接口列表
		  })
			wxconfig = {
		    debug: false,
		    appId: res.data.result.appId, 
		    timestamp: res.data.result.timestamp, 
		    nonceStr: res.data.result.nonceStr, 
		    signature: res.data.result.signature, 
		    jsApiList: jsApiList
		  }
		  readyFun(dataForWeixin)
		})
	}
}
function getPosition(){
	wx.ready(function () {
		wx.getLocation({
			type: 'wgs84',
			success: (res) => {
				geocoderF({lat:res.latitude,lng:res.longitude}).then(data=>{
					//alert(JSON.stringify(data))
					if(data.data.status===0){
						store.commit('setCity',data.data.result.ad_info.city)
					}
				}).catch()
			  // 地址解析:http://lbs.qq.com/javascript_v2/guide-service.html#link-four
			 /* let geocoder = new qq.maps.Geocoder({
				complete: function (result) {
					alert(JSON.stringify(result))
				  resolve(result.detail.address)
				}
			  })
			  var coord = new qq.maps.LatLng(res.latitude, res.longitude)
			  geocoder.getAddress(coord) */
			}
	  })
	})
}
export default {
  // 获取JSSDK
  getJSSDK: getJSSDK,
  getPosition: getPosition
}