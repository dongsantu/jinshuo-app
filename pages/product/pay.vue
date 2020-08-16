<template>
	<view>
		<view class="box-shadow box">
			<view class="pad10 pro-name" v-if="product.name">
				{{product.name}}
			</view>
			<view class="pad_lr10">有效日期 : {{startT}}-{{endT}}</view>
			<view class="f-between-c l-h80 t-b pad10">
				<view>购买数量</view>
				<view><sunui-stepper :label='1' :max="10" :val="order.num" :min="1" @change="stepperChange"></sunui-stepper></view>
			</view>
		</view>
		<view class="box-shadow box pad10">
			<view class="box-title">预定人信息</view>
			<view>
				<view class="flex-box pad_tb5">
					<view class="lab">联系人:</view>
					<input v-model="product.productName" placeholder="请填写联系人姓名" />
				</view>
				<view class="flex-box pad_tb5">
					<view class="lab">联系电话:</view>
					<input v-model="product.phone" placeholder="请填写手机号码" />
				</view>
			</view>
		</view>
		<view class="box-shadow box pad10">
			<view class="box-title">支付方式</view>
			<view class="act pay-li pad_tb10">
				<view class="wxPay">微信支付</view>
			</view>
		</view>
		<view class="foot-menu">
			<view class="flex-box">
				<view class="f-between-c flex-item">
					<view class="f-c-orange1 font-40 l-h80 pad_l10">￥{{product.price}}</view>
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
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="bottom-box">
				<view class="f-between-c">
					<view>市场价：</view>
					<view class="f-c-primary onuse">￥{{product.marketPrice}}</view>
				</view>
				<view class="f-between-c">
					<view>抢购价：</view>
					<view class="f-c-primary">￥{{product.price}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import sunuiStepper from '@/components/sunui-stepper/sunui-stepper.vue'
	import {queryOrderDetail} from "@/http/product.js"
	import {dateUtils} from "@/common/util.js"
	export default {
		components:{sunuiStepper,uniPopup},
		data(){
			return {
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
				step:1,
				product:{
					id:''
				},
				order:{
				  "goodsCount": 0,
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
					  "number": 0,
					  "remarks": ""
					}
				  ],
				  "memberId": 111111,
				  "orderType": 1,
				  "remarks": "",
				  "supplierId": '1111'
				}
			}
		},
		onLoad(params){
			console.log('params',params)
			if(params.id){
				this.product.id=params.id;
			}
			this.init();
		},
		onShow(){
			console.log('show参数',this.$root.$mp.query)
			if(this.$root.$mp.query.id){
				this.product.id=this.$root.$mp.query.id;
			}
			this.init();
		},
		methods:{
			queryOrderDetailFun(){
				queryOrderDetail({id:this.product.id}).then(data=>{
					if(data.data.retCode ===0){
						this.product = data.data.result;
						
						//处理时间
						if(this.product.spuOtherDto && this.product.spuOtherDto.buyEndDate && this.product.spuOtherDto.buyStartDate){
							this.startT = dateUtils.timeToDate(this.product.spuOtherDto.buyStartDate)
							this.endT = dateUtils.timeToDate(this.product.spuOtherDto.buyEndDate)
							this.endTime =dateUtils.getTimeF(this.product.spuOtherDto.buyEndDate);
							console.log('this.endTime',this.endTime);
						}
						
					}
					//this.setHeight();
				}).catch()
			},
			init(){
				this.getSpuInfoBySpuIdFun();
			},
			submitFun(){
				uni.navigateTo({
					url: '/pages/order/detail?id=111111'
				});
			},
			showDetailFun(){
				this.showDetail = true;
				this.$refs.popup.open();
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
	.onuse{
		text-decoration: line-through;
	}
	.foot-menu{
		z-index: 999999;
	}
	.bottom-box{
		box-sizing: border-box;
		padding:20upx;
		margin-bottom: 100upx;
		background-color: #fff;
		width:100%;
	}
	.font-24{font-size: 22upx;
	::before{font-size: 22upx;}
	}
	.submit-btn{
		width:260upx;
		background-color:$uni-color-orange1;
		text-align: center;
		line-height: 100upx;
		color:#fff;
		font-size: 36upx;
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
		font-size: 30upx;
		font-weight: bold;
		line-height: 44upx;
	}
	.lab{
		width:180upx;
	}
</style>
