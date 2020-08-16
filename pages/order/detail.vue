<template>
	<view>
		<view v-if="order.orderStatus" class="status-box" :class="'status'+order.orderStatus.value">{{order.orderStatus.displayName}}</view>
		<view class="box-shadow box pad10">
			<view v-for="(item,i) in order.goodsOrderDetailList" :key="i">
				<view class="item-li">
					<view class="img">
						<image class="img-img" :src="$imgHost+item.goodsImage"></image>
					</view>
					<view class="content">
						<view class="title f-c-b1">{{item.goodsName}}</view>
						<view class="f-between-c">
							<view class="discountPrice">￥{{item.goodsPrice}}</view>
							<view>×{{item.number}}</view>
						</view>
					</view>
				</view>
				<view v-if="item.orderVerificationCodeList && item.orderVerificationCodeList.length>0" class="pad10 t-b-d">
					<view class="f-between-c">
						<view>
							<view v-for="(item2,i2) in item.orderVerificationCodeList" :key="i2">
								<view>使用码:{{item2.verifySn}}</view>
								<view v-if="item2.autoSendCode===0" class="text-c btn b-c-primary f-c-w mrg_tb5" @click="showTopTips(item2.verifySn)">查看二维码</view>
							</view>
						</view>
						<view class="btn-book" @click="goUrl(item.reserveAddress)" v-if="item.reserveAddress">预约</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="box-shadow box pad10" v-if="order.goodsOrderAddress">
			<view class="box-title">联系人信息</view>
			<view>
				<view class="flex-box pad_tb5">
					<view class="lab mrg_r10">联系人: </view>
					<view>{{order.goodsOrderAddress.userName}}</view>
				</view>
				<view class="flex-box pad_tb5">
					<view class="lab mrg_r10">联系电话: </view>
					<view>{{order.goodsOrderAddress.userPhone}}</view>
				</view>
				<view class="flex-box pad_tb5" v-if="order.goodsOrderAddress.userAddress">
					<view class="lab mrg_r10">联系地址: </view>
					<view>{{order.goodsOrderAddress.userAddress}}</view>
				</view>
			</view>
		</view>
		<view class="box-shadow box pad10">
			<view>
				<!-- <view class="f-between-c pad_tb5">
					<view class="lab">商品金额:</view>
					<view class="f-c-primary">￥569</view>
				</view>
				<view class="f-between-c pad_tb5">
					<view class="lab">优惠金额:</view>
					<view class="f-c-primary">￥10</view>
				</view> -->
				<view class="f-between-c pad_tb5" v-if="order.couponAmount">
					<view class="lab">优惠金额:</view>
					<view class="f-c-primary">￥{{order.couponAmount}}</view>
				</view>
				<view class="f-between-c pad_tb5" v-if="order.logisticsFee">
					<view class="lab">运费:</view>
					<view class="f-c-primary">￥{{order.logisticsFee}}</view>
				</view>
				<view class="f-between-c pad_tb5">
					<view class="lab">实付金额:</view>
					<view class="f-c-primary">￥{{order.orderAmountTotal}}</view>
				</view>
			</view>
		</view>
		<view class="box-shadow box pad10" v-if="order.goodsOrderExpress">
			<view class="pad_tb5 mrg_r10">
				快递方式: {{order.goodsOrderExpress.expressCompanyName}}
			</view>
			<view class="pad_tb5 mrg_r10 f-between-c">
				<text>快递单号: {{order.goodsOrderExpress.expressNo}}</text>
				<navigator :url="'/pages/order/expressInfo?shopId='+$store.state.shopId+'&id='+order.id" class="mrg_l20 exp-btn">查看物流信息</navigator>
			</view>
		</view>
		<view class="box-shadow box pad10">
			<view class="pad_tb5 mrg_r10">
				订单编号: {{order.orderNo}}
			</view>
			<view class="pad_tb5 mrg_r10">
				下单时间: {{order.createDateF}}
			</view>
			<view class="pad_tb5 mrg_r10" v-if="order.payTime">
				付款时间: {{order.payTimeF}}
			</view>
			<!-- <view class="pad_tb5">
				完成时间: 2019-09-01 12:12:12
			</view> -->
		</view>
		<view class="h50"></view>
		<view class="foot-menu" v-if="order.orderStatus && (order.orderStatus.value ===0 || order.orderStatus.value ===2 || order.orderStatus.value ===3 || order.orderStatus.value ===4)" >
			<view class="flex-box" v-if="order.orderStatus.value===0">
				<view class="f-c-c flex-item f-c-g2">
					<view class="l-h100">剩余支付时间:</view>
					<view class="f-c-orange2 pad_l5" v-if="!endTime.ifover">
						<uni-countdown 
							color="#f60837" 
							background-color="#ffffff" 
							border-color="#f60837" 
							splitorColor="#ffffff"
							:show-day="false" 
							:hour="endTime.h" 
							:minute="endTime.m" 
							:second="endTime.s">
						</uni-countdown>
					</view>
					<view class="text-c mrg_l10" v-else>已超时</view>
				</view>
				<view class="submit-btn" v-if="!endTime.ifover" @click="submitFun">立即支付</view>
			</view>
			<view>
				<view class="flex-box" v-if="order.orderStatus.value===2 || order.orderStatus.value===3">
					<view class="submit-btn3" @click="buyAgain">再次购买</view>
				</view>
				<view class="flex-box" v-if="order.orderStatus.value===4">
					<view class="f-c-c flex-item font-36" @click="deleteOrder">
						删除订单
					</view>
					<view class="submit-btn2" @click="buyAgain">再次购买</view>
				</view>
			</view>
			
		</view>
		<uni-popup ref="popupTopTips" type="center" :maskClickCallback="hideTopTips">
			<view class="qrimg" >
			    <tki-qrcode
			    ref="qrcode"
			    :val="verCode"
			    :icon="yimaiIcon"
				:onval="true"
				@result="qrR"
				:size="500"
				:loadMake="true"
			     />
			</view>
			<view class="tralfont tral-guanbi2 close font-50 f-c-w" @click="hideTopTips"></view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import yimailogo from '@/static/yimailogo.png'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {queryOrderDetail} from '@/http/product.js';
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import {submitWXOrderFun,dateUtils} from "@/common/util.js"
	export default {
		components: {uniCountdown,tkiQrcode,uniPopup},
		data(){
			return {
				yimaiIcon: yimailogo,
				verCode:'',
				endTime:{
					d:0,
					h:0,
					m:0,
					s:0,
					ifover:true
				},
				showPay:false,
				order: {
					price:'',
					status: '1',
					statusName: '待付款',
					id:'1111',
					orderStatus:'',
					product: [
						{
							name:'【惠州巽寮湾】所有日期不加收！平日暑假周末通用，168元抢原价599元惠州巽寮湾巴厘海岸酒店，五分钟即到沙滩',
							id:'123213',
							price:569,
							img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564034470758&di=667825a58b7b96d0cad2fa3fbc0661cb&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20150331%2Fxuetianbolimuqiangdewuxingjijiudian_4079471.jpg'
						}
					]
				}
			}
		},
		computed: {
		    isToken() {
		        return this.$store.state.login ? this.$store.state.login.token :''
		    }
		},
		watch:{
			isToken(){
				this.init();
			}
		},
		onLoad(params){
			if(params.id){
				this.order.id = params.id;
			}
			this.init();
		},
		onShow(){
			if(this.$root.$mp.query.id){
				this.order.id=this.$root.$mp.query.id;
			}
			this.init();
		},
		methods:{
			qrR(e){
				console.log('qrC:',e)
			},
			showTopTips(code){
				this.verCode = code;
				this.$refs.popupTopTips.open();
				
			},
			hideTopTips(){
				this.$refs.popupTopTips.close();
			},
			goUrl(url){
				// #ifdef H5
				window.location.href = url;
				// #endif
			},
			init(){
				if(this.isToken){
					this.queryOrderDetailFun();
				}
			},
			queryOrderDetailFun(){
				queryOrderDetail({id:this.order.id}).then(data=>{
					if(data.data.retCode===0){
						this.order=data.data.result;
						if(this.order.payTime){
							this.order.payTimeF = dateUtils.timeToDateTime(this.order.payTime)
						}
						this.order.createDateF = dateUtils.timeToDateTime(this.order.createDate)
						this.endTime =dateUtils.getTimeF(this.order.createDate,30);
					}
				}).catch();
			},
			deleteOrder(){
				
			},
			submitFun(){
				submitWXOrderFun(this.order.id,this.order.goodsAmountTotal,this.order.orderNo);
			},
			buyAgain(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-book{
		padding:2upx 20upx;
		border-radius: 40upx;
		background-color: $uni-color-primary;
		color:#fff;
	}
	.t-b-d{
		border-top:1px dashed #f5f5f5;
	}
	.submit-btn{
		width:260upx;
		background-color:$uni-color-orange1;
		text-align: center;
		line-height: 100upx;
		color:#fff;
		font-size: 36upx;
	}
	.submit-btn2{
		width:375upx;
		background-color:$uni-color-orange1;
		text-align: center;
		line-height: 100upx;
		color:#fff;
		font-size: 36upx;
	}
	.submit-btn3{
		width:100%;
		background-color:$uni-color-orange1;
		text-align: center;
		line-height: 100upx;
		color:#fff;
		font-size: 36upx;
	}
	.item-li{
		padding-left:220upx;
		padding-bottom: 20upx;
		margin-bottom:10upx;
		position:relative;
		background-color:#fff;
		min-height:200upx;
		.img{
			width:200upx;
			height:200upx;
			position:absolute;
			top: 0;
			left: 0;
			.img-img{
				width:200upx;
				height:200upx;
				border-radius: 15upx 0 0 15upx;
			}
		}
		.content{
			.title{
				font-weight: bold;
				font-size: 32upx;
				line-height: 40upx;
				min-height: 160upx;
			}
			.discountPrice{
				display:inline-block;
				font-size: 36upx;
				color:$uni-color-primary;
				font-weight: bold;
			}
		}
	}
	.status-box{
		line-height: 100upx;
		box-sizing: border-box;
		padding-left: 100upx;
		background-position: 40upx center;
		background-repeat: no-repeat;
		background-size: 50upx;
		font-size: 36upx;
		color:#fff;
		&.status0{
			background-color:#fe8636;
			background-image:url(~@/static/status1.png) 
		}
		&.status1{
			background-color:#fe8636;
			background-image:url(~@/static/status2.png) 
		}
		&.status2{
			background-color:#47b0fb;
			background-image:url(~@/static/status2.png) 
		}
		&.status3{
			background-color:#61e9a3;
			background-image:url(~@/static/status3.png) 
		}
		&.status4{
			background-color:#ccc;
			background-image:url(~@/static/status3.png) 
		}
		&.status-1{
			background-color:#ccc;
			background-image:url(~@/static/status4.png) 
		}
		&.status-2{
			background-color:#ccc;
			background-image:url(~@/static/status4.png) 
		}
		&.status-3{
			background-color:#ccc;
			background-image:url(~@/static/status4.png) 
		}
		&.status-4{
			background-color:#ccc;
			background-image:url(~@/static/status4.png) 
		}
		&.status-5{
			background-color:#ccc;
			background-image:url(~@/static/status4.png) 
		}
	}
	.exp-btn{
		display: inline-block;
		color: $uni-color-warning;
	}
</style>
