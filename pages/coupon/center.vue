<template>
	<view>
		<view class="top-box f-c-c f-con-c f-m f-c-w f-b">
			<navigator open-type="reLaunch" :url="'/pages/home/home?shopId='+$store.state.shopId" class="tralfont tral-tubiao- goHome">
			</navigator>
			<view class="font-50">领券中心</view>
			<view class="font-30">-会员专属福利，优惠看得见-</view>
		</view>
		<view v-if="couponList.length>0">
			<view class="list-item2" v-for="(item,i) in couponList" :key="i">
				<view class="f-between-c pad-lr46" :class="'status'+item.couponStatus">
					<view class="flex-item flex-box f-c-w">
						<view class="f-c-b mrg_r10 f-c-c f-con-c">
							<view class="lh40">￥</view>
							<view class="font-60 lh60">{{item.couponAmount}}</view>
						</view>
						<view>
							<view>{{item.name}}</view>
							<view v-if="item.isCondition===1">满{{item.amount}}可用</view>
						</view>
					</view>
					<view v-if="item.receivedStatus===1" class="btn btn0" @click="receiveCouponFun(item.id)">立即领取</view>
					<view v-if="item.receivedStatus===0" class="btn btn1">已领取</view>
				</view>
				<view class="pad-lr46 c-g3 pad_tb20">
					<view v-if="item.validitType===1">有效日期：从领取之日起{{item.vaildityDays}}日内有效</view>
					<view v-else>有效日期：<text v-if="item.validityStartDate">{{item.validityStartDate.split('T')[0]}}~{{item.vaildityEndDate.split('T')[0]}}</text></view>
					<view>可用范围：{{item.scopeType===1 ? '全场通用' : '部分商品可用'}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty v-if="!beloading" text="暂时还没有优惠券~" emptyType="8"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<navigator :url="'/pages/coupon/couponList?shopId='+$store.state.shopId" class="go-btn">查看已领取的优惠券</navigator>
		</view>
		<!-- <gift></gift> -->
	</view>
</template>

<script>
	//import gift from '@/components/giftBox.vue'
	import loading from '@/components/loading2.vue'
	import {getCoupons,receiveCoupon} from '@/http/product.js'
	
	export default {
		/* components:{
			gift
		}, */
		components: {
			loading
		},
		data(){
			return {
				beloading:false,
				pages:1,
				params:{
					"useStatus":0,
					"pageNum": 1,
					"pageSize": 10
				},
				couponList:[
					{
						name:'优惠券名称',
						couponStatus:0,
						amount:50,
						couponAmount:200
					},
					{
						name:'优惠券名称',
						couponStatus:1,
						price:50,
						couponAmount:200
					}
				]
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
		methods:{
			init(){
				if(this.isToken){
					this.getCouponsFun()
				}
			},
			receiveCouponFun(couponId){
				console.log('couponId---',couponId)
				receiveCoupon({couponId:couponId}).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '已领取',
							duration: 2000,
							icon:'none'
						});
						this.getCouponsFun();
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				});
			},
			getCouponsFun(){
				this.beloading = true;
				this.couponList =[];
				this.params.shopId=this.$store.state.shopId;
				getCoupons(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						this.couponList = data.data.result.list;
						this.pages= data.data.result.pages;
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					this.beloading = false;
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			}
		},
		onLoad(){
			this.init();
		},
		onShow(){
			this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum +=1;
			if(this.pages>=this.params.pageNum){
				this.getCouponsFun();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.top-box{
		position:relative;
		width:750upx;
		height:333upx;
		background:url(~@/static/card/bg3.png) no-repeat center;
		background-size: 100%;
		.goHome{
			position: absolute;
			top:25upx;
			right:25upx;
			width:50upx;
			height: 50upx;
			font-size: 50upx;
			color: #fff;
			line-height: 50upx;
			font-weight: normal;
		}
	}
	.go-btn{
		height: 100upx;
		width: 100%;
		background-color: $uni-color-primary;
		text-align: center;
		line-height: 100upx;
		color: #fff;
		font-size: 36upx;
	}
	.list-item2{
		margin:25upx auto;
		width:711upx;
		background-color: #fff;
		border-radius: 15upx;
		.status0{
			width:711upx;
			height: 133upx;
			background:url(~@/static/card/bg4.png) no-repeat center;
			background-size: 100%;
			box-sizing: border-box;
		}
		.status1{
			width:711upx;
			height: 133upx;
			background:url(~@/static/card/bg5.png) no-repeat center;
			background-size: 100%;
			box-sizing: border-box;
		}
	}
	.pad-lr46{
		box-sizing: border-box;
		padding:10upx 46upx;
	}
	.btn{
		width:145upx;
		border-radius:10upx;
		background-color:#fff;
		font-size: 26upx;
		text-align: center;
		&.btn0{
			color:#fb4769;
		}
		&.btn1{
			color:#b5b5b5;
		}
	}
	.c-g3{
		color:#666666;
	}
</style>
