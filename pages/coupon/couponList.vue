<template>
	<view>
		<view class="fixHead f-between-c">
			<view :class="{act:params.useStatus===0}" @click="changeAct(0)">未使用</view>
			<view :class="{act:params.useStatus===1}" @click="changeAct(1)">已使用</view>
			<view :class="{act:params.useStatus===-1}" @click="changeAct(-1)">已过期</view>
		</view>
		<view class="h50"></view>
		<view v-if="couponList.length>0">
			<view class="list-item f-between-c" :class="'status'+item.useStatus" v-for="(item,i) in couponList" :key="i">
				<view class="l f-c-c f-m f-con-c">
					<view class="f-c-b">
						<view class="lh40 f-c-g2">￥</view>
						<view class="font-60 lh60">{{item.couponAmount}}</view>
					</view>
					<view class="font-24" v-if="item.type===1">现金券</view>
					<view class="font-24" v-if="item.type===2"><text v-if="item.amount==0">无门槛</text><text v-else>满 {{item.amount}}元可用</text></view>
					<view class="font-24" v-if="item.type===3">折扣券</view>
				</view>
				<view class="c f-l-c f-con-c">
					<view class="font-32 w-f">{{item.name}}</view>
					<view class="font-20 w-f" v-if="item.validitType===2">{{item.validityStartDate.split('T')[0]}}~{{item.vaildityEndDate.split('T')[0]}}</view>
					<view class="font-20 w-f" v-else>有效天数{{item.vaildityDays}}</view>
					<navigator :url="'/pages/coupon/couponDetail?id='+item.id+'&shopId='+$store.state.shopId" class="font-20 w-f">详细说明<view class="tralfont tral-tishi mrg_l5 font-20"></view></navigator>
				</view>
				<navigator :url="'/pages/home/home?shopId='+$store.state.shopId" open-type="reLaunch" class="r f-c-c f-con-c f-m" v-if="item.useStatus===0">
					<view>立即</view>
					<view>使用</view>
				</navigator>
				<view class="r f-c-c f-con-c f-m" v-if="item.useStatus===1">
					<view class="lh40">已</view>
					<view class="lh40">使</view>
					<view class="lh40">用</view>
				</view>
				<view class="r f-c-c f-con-c f-m lh30" v-if="item.useStatus===-1">
					<view class="lh40">已</view>
					<view class="lh40">过</view>
					<view class="lh40">期</view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty v-if="!beloading" text="您暂时还没有优惠券~" emptyType="8"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<navigator :url="'/pages/coupon/center?shopId='+$store.state.shopId" class="go-btn">去领券中心</navigator>
		</view>
	</view>
</template>

<script>
	import {getMyCoupons} from '@/http/product';
	import loading from '@/components/loading2.vue'
	export default {
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
					/* {
						name:'优惠券名称',
						useStatus:0,
						amount:50,
						require:200,
						validitType:1,
						validityStartDate:'2019.08.30',
						vaildityEndDate:'2019.09.30'
					} */
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
			getMyCouponsFun(){
				this.beloading = true;
				//this.couponList = [];
				if(this.params.pageNum===1){
					this.couponList = [];
				}
				getMyCoupons(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						if(data.data.result){
							let couponList = data.data.result.list;
							this.couponList = [...this.couponList,...couponList]
							this.pages= data.data.result.pages;
						}
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					this.beloading = false;
					console.log('e',e)
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			changeAct(val){
				this.params.pageNum =1;
				this.params.useStatus = val;
				
				this.getMyCouponsFun();
			},
			init(){
				if(this.isToken){
					this.getMyCouponsFun()
				}
			}
		},
		onLoad(){
			//this.init();
		},
		onShow(){
			this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum +=1;
			if(this.pages>=this.params.pageNum){
				this.getMyCouponsFun();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.fixHead{
		width:100%;
		height: 90upx;
		line-height: 90upx;
		background-color: #fff;
		position: fixed;
		//border-bottom: 1px solid #ccc;
		padding:0 60upx;
		box-sizing: border-box;
		z-index: 10;
		font-size: 30upx;
		font-weight: bold;
		.act{
			color: $uni-color-primary;
		}
	}
	.list-item{
		margin:10upx auto;
		width:701upx;
		height: 189upx;
		background-size:100%;
		background-repeat: no-repeat;
		background-position: center;
		&.status0{
			background-image:url(~@/static/card/bg7.png)
		}
		&.status1{
			background-image:url(~@/static/card/bg9.png)
		}
		&.status-1{
			background-image:url(~@/static/card/bg10.png)
		}
		.l{
			width:210upx;
			height:189upx;
			color: $uni-color-primary;
		}
		.r{
			width:106upx;
			height:189upx;
			color: #fff;
		}
		.c{
			width:382upx;
			height:189upx;
			box-sizing: border-box;
			padding:0 20upx;
			color: #666;
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
	
</style>
