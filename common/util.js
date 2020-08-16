import {submitWXOrder} from '@/http/product';

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	getTimeF: function(end,time){
		//type没传 代表end 为结束时间, 传了 end代表开始时间
		const obj ={d:0,h:0,m:0,s:0,ifover:true};
		let startTime = 0;
		let endTime =0;
		if(!time){
			startTime = new Date().getTime();
			endTime = new Date(Date.parse(end.replace(/-/g,   "/"))).getTime();
		}else{
			startTime = new Date().getTime();
			endTime = new Date(Date.parse(end.replace(/-/g,   "/"))).getTime()+ time* 60*1000;
			
		}
		
		let btw = endTime -startTime;
		if(btw<=0){
			btw = 0;
		}else{
			obj.ifover = false;
		}
		console.log('btw',btw)
		obj.d = Math.floor(btw/(1000*60*60*24));
		let hTime = btw%(1000*60*60*24);
		
		obj.h = Math.floor(hTime/(1000*60*60));
		let mTime = hTime%(1000*60*60);
		obj.m = Math.floor(mTime/(1000*60));
		let sTime = mTime%(1000*60);
		obj.s = Math.floor(sTime/1000);
		return obj; 
	},
	timeToDate: function(time){
		let timeStr = new Date(Date.parse(time.replace(/-/g,   "/"))).getTime();
		let d = new Date();
		d.setTime(timeStr);
		return d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate()+ '日';
	},
	timeToDateTime: function(time){
		let timeStr = new Date(Date.parse(time.replace(/-/g,   "/"))).getTime();
		let d = new Date();
		d.setTime(timeStr);
		return d.getFullYear() + '年' + (d.getMonth()+1) + '月' + d.getDate()+ '日 ' + d.getHours()+':'+d.getMinutes();
	}
};
//表单验证 使用方式 如 if(validator.ifEmpty('','请填写姓名')){return ;}
export const validator={
  ifEmpty:(value,tips)=>{  //判断是否为空
    if(!value){
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
    return false;
  },
  ifPhone:(value,tips)=>{
    if(!/^1[1-9][0-9]{9}$/.test(value)){  //判断手机号码格式
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
  },
  ifEmail:(value,tips)=>{
    if(!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))){ //判断邮箱格式
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
  },
  ifCode:(value,tips)=>{
    if(!/^[0-9]{4}$/.test(value)){  //判断4位数的数字
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
  },
  ifSame:(value1,value2,tips)=>{ // 判断 两个数是否相同
    if(value1 != value2){
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
  },
  ifIDCard:(value,tips)=>{ // 判断身份证号格式是否正确
    let reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if(!reg.test(value)){
	  uni.showToast({
	  	title: tips,
	  	duration: 2000,
		icon:'none'
	  });
      return true;
    }
  },
  ifEnNum:(value, tips)=>{
    let reg = /^[0-9a-zA-Z]*$/;
    if(!reg.test(value)){
      uni.showToast({
      	title: tips,
      	duration: 2000,
		icon:'none'
      });
      return true;
    }
  }
};
function gotoSuccess(price,orderNo,id){
	setTimeout(()=>{
		uni.reLaunch({
			url: '/pages/product/paySuccess?price='+price+'&orderNo='+orderNo+'&id='+id
		});
	},1900)
};
function gotoDetail(id){
	setTimeout(()=>{
		uni.reLaunch({
			url: '/pages/order/detail?id='+id
		});
	},1900)
}
function onBridgeReady(appId,timeStamp,nonceStr,paypackage,paySign,price,orderNo,id){
		
   	WeixinJSBridge.invoke(
      	'getBrandWCPayRequest', {
         	"appId":appId,         //公众号名称，由商户传入     
			"timeStamp":timeStamp, //时间戳，自1970年以来的秒数     
			"nonceStr":nonceStr,   //随机串     
			"package":paypackage,
			"signType":"MD5",      //微信签名方式：     
			"paySign":paySign      //微信签名 
      },
      function(res){
      	if(res.err_msg == "get_brand_wcpay_request:ok" ){
			uni.showToast({
				title: '支付成功！',
				duration: 2000,
			});
			gotoSuccess(price,orderNo,id);
		} else if(res.err_msg == "get_brand_wcpay_request:fail"){  
			uni.showToast({
				title: '支付失败！',
				duration: 2000,
				icon:'none'
			});
			setTimeout(()=>{
				uni.reLaunch({
					url: '/pages/order/detail?id='+id
				});
			},1900)
		}  
	}); 
}
function submitWXOrderFun(id,price,orderNo){
	submitWXOrder({id: id}).then((dataR)=>{
		let data = dataR.data.result;
		if(data.return_code =="FAIL"){
			uni.showToast({
				title: data.return_msg,
				duration: 2000,
					icon:'none'
			});
			gotoDetail(id)
		}else{
			if(data.result_code=="FAIL"){
				uni.showToast({
					title: data.err_code_des,
					duration: 2000,
						icon:'none'
				});
				gotoDetail(id)
			}else{
				if(data.needPay==='FAIL'){
					uni.showToast({
						title: '下单成功',
						duration: 2000,
						icon:'none'
					});
					gotoDetail(id)
				}else{
					//window.location.href= data.mwebUrl;
					var payappId = data.payappId;
					var paytimestamp = data.paytimestamp;
					var paynonceStr = data.paynonceStr;
					var paypackage = data.paypackage;
					var paySign = data.paySign;
					//var sendUrl = data.sendUrl;
					onBridgeReady(payappId,paytimestamp,paynonceStr,paypackage,paySign,price,orderNo,id);
				}
				
			}
		}
	}).catch((e)=>{
		uni.showToast({
			title: '调用微信支付失败',
			duration: 2000,
			icon:'none'
		});
		gotoDetail(id)
	});
}


 
function shareFriend(obj) {
	console.log('进入分享')
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": obj.appid,
        "img_url": obj.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": obj.lineLink,
        "desc": obj.descContent,
        "title": obj.shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);  // 这是回调函数，必须注释掉
		console.log('分享成功')
    })
 
}
 
function shareTimeline(obj) {
	console.log('进入分享')
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": obj.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": obj.lineLink,
        "desc": obj.descContent,
        "title": obj.shareTitle
        }, function(res) {
       //_report('timeline', res.err_msg); // 这是回调函数，必须注释掉
	   console.log('分享成功')
 
    });
}
 
 function onBridgeReady2(obj) {
	 console.log('kaishistart')
     // 发送给好友
     WeixinJSBridge.on('menu:share:appmessage', function(argv){
		 console.log('kaishi分享')
         shareFriend(obj);
 	});
     // 分享到朋友圈
     WeixinJSBridge.on('menu:share:timeline', function(argv){
		 console.log('kaishi分享')
         shareTimeline(obj);
     });
 }
 
/* function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": descContent,
        "url": lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
} */
 
  // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
/*  var imgUrl = 'http://www.baidu.com/images/share.jpg';  // 分享后展示的一张图片
  var lineLink = 'http://www.baidu.com'; // 点击分享后跳转的页面地址
  var descContent = "描述信息";  // 分享后的描述信息
  var shareTitle = '标题';  // 分享后的标题
  var appid = '';  //应用id,如果有可以填，没有就留空 */
 function shareFun(obj){
	 document.removeEventListener('WeixinJSBridgeReady', onBridgeReady2(obj))
	 document.addEventListener('WeixinJSBridgeReady', onBridgeReady2(obj))
 }


module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	validator: validator,
	submitWXOrderFun: submitWXOrderFun,
	shareFun:shareFun
}
