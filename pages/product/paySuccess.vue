<template>
	<view>
		<view>
			<view class="f-c-c">
				<view class="tralfont tral-yuanxingxuanzhongfill font-80 mrg_tb15 f-c-orange1"></view>
			</view>
			<view class="text-c font-40 f-b">支付成功</view>
			<view class="f-c-c">
				<view class="tralfont tral-qiapian font-36"></view>
				<view class="mrg_l10 f-c-g2 flex-box">
					订单编号 <view class="f-c-orange1">{{order.orderNo}}</view>
				</view>
			</view>
			<view class="f-c-c">
				<view class="tralfont tral-qian font-36"></view>
				<view class="mrg_l10 f-c-g2 flex-box">
					订单金额 <view class="f-c-orange1"> ￥{{order.price}}</view>
				</view>
			</view>
			<view class="f-c-c mrg_t15">
				<view><button class="mini-btn" type="primary" size="mini" @click="goOrderDetail">查看订单</button></view>
				<view class="mrg_l10"><button class="mini-btn" type="warn" size="mini" @click="goHome">回到首页</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				order:{
					id:'',
					price:'',
					orderNo:''
				}
			}
		},
		methods:{
			goOrderDetail(){
				if(this.order.id){
					uni.reLaunch({
						url: '/pages/order/detail?id='+ this.order.id+'&shopId='+this.$store.state.shopId
					});
				}
			},
			goHome(){
				uni.reLaunch({
					url: '/pages/home/home?shopId='+this.$store.state.shopId
				});
			}
		},
		onLoad(params){
			if(params.id){
				this.order.id = params.id;
			}
			if(params.price){
				this.order.price = params.price;
			}
		},
		onShow(){
			if(this.$root.$mp.query.id){
				this.order.id=this.$root.$mp.query.id;
			}
			if(this.$root.$mp.query.price){
				this.order.price=this.$root.$mp.query.price;
			}
			if(this.$root.$mp.query.orderNo){
				this.order.orderNo=this.$root.$mp.query.orderNo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font-80{
		&::before{
		  font-size: 160upx;
		}
	  }
</style>
