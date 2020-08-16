<template>
	<view>
		
		<view class="box-shadow box">
			<view class="pad10 pro-name" v-if="product.name">
				{{product.name}}
			</view>
			
			<view class="pad_lr10 f-c-g2" v-if="product.spuOtherDto">有效日期 : {{product.spuOtherDto.activityDate}}</view>
			
			<view class="f-between-c l-h80 t-b pad10">
				<view>购买数量</view>
				<view v-if="order.goodsOrderDetailCmdList"><sunui-stepper :label='1' :max="10" :val="order.goodsOrderDetailCmdList[0].number" :min="1" @change="stepperChange"></sunui-stepper></view>
			</view>
		</view>
		<view class="box-shadow box pad_lr10" v-if="product.skus && product.skus.length>1">
			<view class="box-title">可选规格</view>
			<view class="pad10">
				<view class="pad5 skuItem f-between-c" :class="{checked:item.id ===order.goodsOrderDetailCmdList[0].goodsSkuId}" v-for="(item,i) in product.skus" :key="i" @click="changeSku(item)">
				<text>{{item.name}}</text>
				<text>￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="box-shadow box pad_lr10" v-if="product.typeId==='1'">
			<view>
				<view class="f-between-c pad_tb5">
					<view class="lab l-h80">配送方式:</view>
					<view class=" flex-box l-h80">
						<text class="mrg_r10">快递</text>
						<text v-if="product.spuOtherDto && product.spuOtherDto.courierFee">￥{{product.spuOtherDto.courierFee}}</text>
						<text v-else>免运费</text>
					</view>
				</view>
			</view>
		</view>
		<view class="box-shadow box pad_lr10">
			<view class="box-title">预订人信息</view>
			<view>
				<view class="flex-box pad_tb5 b-b" v-if="product.typeId==='1'">
					<view class="lab l-h64">收货地址:</view>
					<navigator :url="'/pages/my/addressList?id='+ product.id +'&ifSelect=1'+'&shopId='+$store.state.shopId" class="font-28 f-l-c">
						<view v-if="order.goodsOrderAddressCmd.userAddress">{{order.goodsOrderAddressCmd.userAddress}}</view>
						<view class="f-c-g2" v-else>选择收货地址</view>
					</navigator>
				</view>
				<view class="flex-box pad_tb5 b-b">
					<view class="lab l-h64">联系人:</view>
					<view class="f-l-c">
						<input class="font-28" v-model="order.goodsOrderAddressCmd.userName" placeholder="请填写联系人姓名" @blur="blurFun" />
					</view>
					
				</view>
				<view class="flex-box pad_tb5">
					<view class="lab l-h64">联系电话:</view>
					<view class="f-l-c">
						<input class="font-28" type="number" v-model="order.goodsOrderAddressCmd.userPhone" placeholder="请填写手机号码" @blur="blurFun" />
					</view>
				</view>
				<view class="flex-box pad_tb5">
					<view class="lab l-h64">备注信息:</view>
					<view class="f-l-c flex-item">
						<input  class="font-28" v-model="order.remarks" placeholder="如需要,请填写备注信息" @blur="blurFun" ></input>
					</view>
				</view>
			</view>
		</view>
		<view class="box-shadow box pad_lr10">
			<view class="box-title">优惠信息</view>
			<view>
				<view class="f-between-c pad_tb5">
					<view class="lab l-h80">优惠券:</view>
					<navigator class="f-c-orange1 flex-box l-h80" :url="'/pages/coupon/chooseCoupon?targetId='+ product.id +'&qry='+qry+'&shopId='+$store.state.shopId">
						<view class="l-h80" v-if="couponAmount">省￥{{couponAmount}}</view>
						<view class="l-h80" v-else-if="couponNum">有{{couponNum}}张可用</view>
						<view class="l-h80" v-else>无可用</view>
						<view class="tralfont tral-jiantouyou mrg_l5 f-c-orange1 l-h80"></view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- <view class="box-shadow box pad10">
			<view class="box-title">支付方式</view>
			<view class="act pay-li pad_tb10">
				<view class="wxPay">微信支付</view>
			</view>
		</view> -->
		<view class="h50"></view>
		<view class="foot-menu" :class="{fixtop:!showPay}">
			<view class="flex-box" v-if="!orderId">
				<view class="f-between-c flex-item">
					<view class="f-c-orange1 font-40 l-h80 pad_l10">￥{{sumPrice}}</view>
					<view class="f-c-g1 pad_r10" v-if="showDetail" @click="hideDetailFun">
						明细
						<view class="tralfont tral-jiantouxia font-24 pad_l5"></view>
						
					</view>
					<view class="f-c-g1 pad_r10" v-else @click="showDetailFun" >
						明细
						<view class="tralfont tral-jiantoushang font-24 pad_l5"></view>
					</view>
				</view>
				<view class="submit-btn" @click="submitFun">提交订单</view>
			</view>
			<view class="f-c-c" v-else>
				<view @click="payFun" class="f-c-orange1 font-40 l-h80 text-c" v-if="!lock">
					继续支付
				</view>
			</view>
		</view>
		<uni-popup ref="popup1" type="bottom" :maskClick="false">
			<view class="bottom-box1">
				<view class="pad10">
					<view class="box-title f-between-c">
						<view>支付方式</view>
						<view class="tralfont tral-guanbi1" @click="closePay"></view>
					</view>
					<view class="act pay-li pad_tb10">
						<view class="wxPay">微信支付</view>
					</view>
				</view>
				<view class="pad20">
					<button type="warn" @click="createOrderFun">立即支付 ￥{{sumPrice}}</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup" type="bottom" :maskClickCallback="hideDetailF">
			<view class="bottom-box">
				<!-- <view class="f-between-c">
					<view>市场价：</view>
					<view class="f-c-primary onuse">￥{{product.marketPrice}}</view>
				</view> -->
				<view class="f-between-c">
					<view>价格：</view>
					<view class="f-c-primary">{{order.goodsOrderDetailCmdList[0].number}} ✕ ￥{{order.goodsOrderDetailCmdList[0].price}}</view>
				</view>
				<view class="f-between-c" v-if="product.spuOtherDto && product.spuOtherDto.courierFee">
					<view>运费：</view>
					<view class="f-c-primary">￥{{product.spuOtherDto.courierFee}}</view>
				</view>
				<view class="f-between-c" v-if="couponAmount">
					<view>优惠券：</view>
					<view class="f-c-primary">-￥{{couponAmount}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	//import loading from '@/components/_loading';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import sunuiStepper from '@/components/sunui-stepper/sunui-stepper.vue'
	import {getSpuInfoBySpuId,createOrder,getMyCouponByTargetId,submitWXOrder} from "@/http/product.js"
	import {dateUtils, validator} from "@/common/util.js"
	//let lock= false;
	export default {
		components:{sunuiStepper,uniPopup},
		data(){
			return {
				lock:false,
				couponNum:'',
				params:{
					//"count":1,
					//"useStatus":0,
					"targetCmds":[],
					"pageNum": 1,
					"pageSize": 10,
					//"targetId":''
				},
				couponReceiveId:'',
				couponAmount:'',
				orderNo:'',
				orderId:'',
				max:10,
				startT:'',
				endT:'',
				endTime:{
					d:0,
					h:0,
					m:0,
					s:0
				},
				showDetail:false,
				showPay:false,
				step:1,
				product:{
					id:''
				},
				order:{
				  "inviteCode":'',
				  "goodsCount": 1,
				  "goodsOrderAddressCmd": {
					"userAddress": "",
					"userName": "",
					"userPhone": ""
				  },
				  "goodsOrderDetailCmdList": [
					{
					  "discountAmount": 0,
					  "discountRate": 0,
					  "goodsSkuId": 0,
					  "goodsSpuId": 0,
					  "number": 1,
					  "remarks": "",
					  "price":''
					}
				  ],
				  "memberId": 111111,
				  "orderType": 1,
				  "remarks": "",
				  "supplierId": '1111'
				}
			}
		},
		watch:{
			isToken(){
				this.init();
			}
		},
		computed:{
			isToken() {
			    return this.$store.state.login ? this.$store.state.login.token :''
			},
			qry(){
				return JSON.stringify([{count:this.count ? this.count : 1, targetId: this.skuId}])
			},
			count(){
				return this.order.goodsOrderDetailCmdList? this.order.goodsOrderDetailCmdList[0].number :1
			},
			skuId(){
				if(this.product.skus){
					return this.product.skus[0].id;
				}
				return '';
			},
			sumPrice(){
				let price = 0;
				console.log('this.order.goodsOrderDetailCmdList',this.order.goodsOrderDetailCmdList)
				if(this.order.goodsOrderDetailCmdList[0].price){
					price = this.order.goodsOrderDetailCmdList[0].number * this.order.goodsOrderDetailCmdList[0].price;
				}
				if(this.product.spuOtherDto && this.product.spuOtherDto.courierFee){
					price = price + this.product.spuOtherDto.courierFee;
				}
				if(this.couponAmount){
					price= price -this.couponAmount
				}
				if(price<0){
					price =0;
				}
				return Number(price).toFixed(2);
			}
		},
		
		onLoad(params){
			console.log('params',params)
			if(params.id){
				this.product.id=params.id;
			}
			if(params.couponReceiveId){
				this.couponReceiveId=params.couponReceiveId;
			}
			if(params.couponAmount){
				this.couponAmount=params.couponAmount;
			}
			
			this.init();
		},
		onShow(){
			console.log('show参数',this.$root.$mp.query)
			if(this.$root.$mp.query.id){
				this.product.id=this.$root.$mp.query.id;
			}
			if(this.$root.$mp.query.couponReceiveId){
				this.couponReceiveId=this.$root.$mp.query.couponReceiveId;
			}
			if(this.$root.$mp.query.couponAmount){
				this.couponAmount=this.$root.$mp.query.couponAmount;
			}
			
			let order = uni.getStorageSync('order');
			console.log('order1',order)
			if(order){
				this.order = JSON.parse(order);
				console.log('this.order',this.order)
			}
			this.init();
		},
		onHide(){
			this.orderId='';
			this.orderNo = '';
			uni.setStorageSync('order', JSON.stringify(this.order));
			console.log('order------>',uni.getStorageSync('order'))
		},
		onUnload(){
			this.orderId='';
			this.orderNo = '';
		},
		methods:{
			gotoSuccess(price,orderNo,id){
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/product/paySuccess?price='+price+'&orderNo='+orderNo+'&id='+id
					});
				},1900)
			},
			gotoDetail(id){
				setTimeout(()=>{
					uni.reLaunch({
						url: '/pages/order/detail?id='+id
					});
				},1900)
			},
			onBridgeReady(appId,timeStamp,nonceStr,paypackage,paySign,price,orderNo,id){
				const _this = this;	
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
						_this.gotoSuccess(price,orderNo,id);
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
			},
			submitWXOrderFun(id,price,orderNo){
				submitWXOrder({id: id}).then((dataR)=>{
					setTimeout(()=>{
						this.lock = false;
					},400)
					let data = dataR.data.result;
					if(data.return_code =="FAIL"){
						uni.showToast({
							title: data.return_msg,
							duration: 2000,
								icon:'none'
						});
						this.gotoDetail(id)
					}else{
						if(data.result_code=="FAIL"){
							uni.showToast({
								title: data.err_code_des,
								duration: 2000,
									icon:'none'
							});
							this.gotoDetail(id)
						}else{
							if(data.needPay==='FAIL'){
								uni.showToast({
									title: '下单成功',
									duration: 2000,
									icon:'none'
								});
								this.gotoDetail(id)
							}else{
								//window.location.href= data.mwebUrl;
								var payappId = data.payappId;
								var paytimestamp = data.paytimestamp;
								var paynonceStr = data.paynonceStr;
								var paypackage = data.paypackage;
								var paySign = data.paySign;
								//var sendUrl = data.sendUrl;
								this.onBridgeReady(payappId,paytimestamp,paynonceStr,paypackage,paySign,price,orderNo,id);
							}
							
						}
					}
				}).catch((e)=>{
					uni.showToast({
						title: '调用微信支付失败',
						duration: 2000,
						icon:'none'
					});
					this.gotoDetail(id)
				});
			},
			changeSku(item){
				this.order.goodsOrderDetailCmdList[0].goodsSkuId = item.id;
				this.order.goodsOrderDetailCmdList[0].price = item.price;
				//this.order.goodsOrderDetailCmdList = JSON.parse(JSON.stringify(this.order.goodsOrderDetailCmdList))
			},
			blurFun(){
				console.log('blur')
				if(window){
					console.log('windowblur')
					window.scrollTo(0, 1)
				}
			},
			getMyCouponByTargetIdFun(){
				getMyCouponByTargetId(this.params).then(data=>{
					if(data.data.retCode===0){
						if(data.data.result){
							this.couponNum = data.data.result.total || ''
						}
					}else{
						this.couponNum = ''
					}
				}).catch(e=>{
					this.couponNum = ''
				})
			},
			payFun(){
				//调微信支付
				this.submitWXOrderFun(this.orderId,this.sumPrice,this.orderNo);
			},
			createOrderFun(){
				if(this.lock){
					return;
				}
				this.lock = true;
				let order = JSON.parse(JSON.stringify(this.order))
				if(this.couponReceiveId){
					order.couponReceiveId = this.couponReceiveId
				}
				const inviteCode = uni.getStorageSync('inviteCode');
				if(inviteCode){
					order.inviteCode = inviteCode;
				}
				createOrder(order).then(data=>{
					console.log('jjll',data)
					if(data.data.retCode ===0){
						/* uni.showToast({
							title: '订单提交成功，等待支付',
							duration: 2000,
							icon:'none'
						}); */
						this.orderId = data.data.result.id;
						this.orderNo = data.data.result.orderNo;
						//调微信支付
						this.submitWXOrderFun(data.data.result.id,this.sumPrice,data.data.result.orderNo);
						//隐藏层
						this.closePay();
						
					}else{
						console.log('cuowu--',data)
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
						this.lock = false;
					}
				}).catch(e=>{
					uni.showToast({
						title: '提交订单失败',
						duration: 2000,
						icon:'none'
					});
					this.lock = false;
				})
			},
			getSpuInfoBySpuIdFun(){
				this.max=10;
				getSpuInfoBySpuId({id:this.product.id}).then(data=>{
					if(data.data.retCode ===0){
						this.product = data.data.result;
						//处理最大购买数
						if(this.product.stock && this.product.stock<this.max){ 
							this.max = this.product.stock
						}else{
							this.max = 0;
						}
						//处理时间
						if(this.product.spuOtherDto && this.product.spuOtherDto.buyEndDate && this.product.spuOtherDto.buyStartDate){
							/* this.startT = dateUtils.timeToDate(this.product.spuOtherDto.buyStartDate)
							this.endT = dateUtils.timeToDate(this.product.spuOtherDto.buyEndDate) */
							this.endTime =dateUtils.getTimeF(this.product.spuOtherDto.buyEndDate);
							console.log('this.endTime',this.endTime);
						}
						console.log('this.product.skus[0].id',this.product.skus[0].id);
						//给order赋值
						if(!uni.getStorageSync('order')){
							this.order.goodsOrderDetailCmdList[0].goodsSkuId = this.product.skus[0].id;
							console.log('this.order.goodsOrderDetailCmdList[0].goodsSkuId',this.order.goodsOrderDetailCmdList[0].goodsSkuId);
							this.order.goodsOrderDetailCmdList[0].goodsSpuId = this.product.skus[0].spuId;
							this.order.goodsOrderDetailCmdList[0].price = this.product.skus[0].price;
							this.order.orderType = this.product.typeId;
							if(this.$root.$mp.query.skuId){
								this.order.goodsOrderDetailCmdList[0].goodsSkuId=this.$root.$mp.query.skuId;
							}
							if(this.$root.$mp.query.skuPrice){
								this.order.goodsOrderDetailCmdList[0].price=this.$root.$mp.query.skuPrice;
							}
						}
						
						
						//针对小程序对详情的富文本标签转换
						// #ifdef MP-WEIXIN
						if(this.product.spuDescDto && this.product.spuDescDto.mobileDesc){
							this.product.spuDescDto.mobileDesc = this.product.spuDescDto.mobileDesc.replace(/<img/g, '<img style="max-width:100%;"');
						}
						if(this.product.spuDescDto && this.product.spuDescDto.bookingNotes){
							this.product.spuDescDto.bookingNotes = this.product.spuDescDto.bookingNotes.replace(/<img/g, '<img style="max-width:100%;"');
						}
						// #endif
						
					}
					//this.setHeight();
				}).catch()
			},
			init(){
				if(this.isToken){
					this.getSpuInfoBySpuIdFun();
					this.getMyCouponByTargetIdFun();
				}
				if(this.$root.$mp.query.address){
					let address = JSON.parse(this.$root.$mp.query.address)
					this.order.goodsOrderAddressCmd.userName = address.userName
					this.order.goodsOrderAddressCmd.userPhone = address.userPhone
					this.order.goodsOrderAddressCmd.userAddress = address.userAddress
					console.log('this.order.goodsOrderAddressCmd',this.order.goodsOrderAddressCmd)
				}
			},
			submitFun(){
				if(validator.ifEmpty(this.order.goodsOrderAddressCmd.userName,'请填写联系人姓名')){return ;}
				if(validator.ifEmpty(this.order.goodsOrderAddressCmd.userPhone,'请填写联系人手机')){return ;}
				if(validator.ifPhone(this.order.goodsOrderAddressCmd.userPhone,'联系人手机格式不正确')){return ;}
				this.$refs.popup.close();
				this.$refs.popup1.open();
				this.showPay = true;
				
				/* uni.navigateTo({
					url: '/pages/order/detail?id=111111'
				}); */
			},
			closePay(){
				this.$refs.popup1.close();
				this.showPay = false;
			},
			showDetailFun(){
				this.showDetail = true;
				this.$refs.popup.open();
			},
			hideDetailF(){
				console.log('this---',this)
				let _this=this;
				// #ifdef MP-WEIXIN
					_this = this.$parent;
				// #endif
				_this.showDetail = false;
			},
			hideDetailFun(){
				this.showDetail = false;
				this.$refs.popup.close();
			},
			stepperChange(obj){
				this.order.goodsOrderDetailCmdList[0].number = obj.val;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.skuItem{
		//display: inline-block;
		background-color: #f1f1f1;
		line-height: 60upx;
		padding:0 30upx;
		border-radius: 10upx;
		margin-bottom:10upx;
		border:1px solid #f1f1f1;
		&.checked{
			border:1px solid $uni-color-primary;
			color:$uni-color-primary;
			background-color: #f9e9ec;
		}
	}
	.l-h64{
		line-height: 74upx;
		.tralfont{
			line-height: 74upx;
		}
	}
	.f-c-orange1{
		&::before{
			color: $uni-color-orange1;
		}
	}
	.pad_t2{
		padding-top: 8upx;
	}
	.onuse{
		text-decoration: line-through;
	}
	.foot-menu{
		&.fixtop{
			z-index: 999999;
		}
	}
	.bottom-box{
		box-sizing: border-box;
		padding:20upx;
		margin-bottom: 100upx;
		background-color: #fff;
		width:100%;
	}
	.bottom-box1{
		box-sizing: border-box;
		padding:20upx;
		background-color: #fff;
		width:100%;
	}
	.font-24{font-size: 22upx;
	::before{font-size: 22upx;}
	}
	.submit-btn{
		width:260upx;
		background-color:$uni-color-primary;
		text-align: center;
		line-height: 100upx;
		color:#fff;
		font-size: 36upx;
		font-weight: bold;
	}
	.pay-li{
		width:100%;
		&.act{
			background:url(~@/static/checked.png) no-repeat center right;
			background-size: 48upx;
		}
	}
	.wxPay{
		padding-left:60upx;
		background:url(~@/static/wxpay.png) no-repeat center left;
		background-size: 40upx;
	}
	.pro-name{
		font-size: 34upx;
		font-weight: bold;
		line-height: 46upx;
	}
	.lab{
		width:180upx;
	}
</style>
