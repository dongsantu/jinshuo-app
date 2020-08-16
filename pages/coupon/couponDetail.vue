<template>
	<view class="warp">
		<view class="box-w b-c-w mrg_lr10 pad_tb10">
			<view class="text-c font-36 c-gr">{{coupon.name}}</view>
			<view class="text-c font-60 f-c-primary l-h80">￥{{coupon.couponAmount}}</view>
			<view class="text-c font-36 mrg_tb5 c-gr2">
				<view v-if="coupon.type===1">现金券</view>
				<view v-if="coupon.type===2"><text v-if="item.amount==0">无门槛</text><text v-else>满 {{item.amount}}元可用</text></view>
				<view v-if="coupon.type===3">折扣券</view>
			</view>
			<navigator url="/pages/home/home" open-type="reLaunch" class="btn-use">立即使用</navigator>
		</view>
		<view class="box-w b-line"></view>
		<view class="box-w b-c-w pad10 b-s c-gr">
			<view class="c-gr2">有效期：</view>
			<view v-if="coupon.validitType===2">{{coupon.validityStartDate.split('T')[0]}}至{{coupon.vaildityEndDate.split('T')[0]}}</view>
			<view v-else>有效天数{{coupon.vaildityDays}}</view>
			<view class="c-gr2">使用规则：</view>
			<view>{{coupon.scopeType===1 ? '全部商品可用' : '部分商品可用'}}</view>
			<view class="c-gr2">使用说明：</view>
			<view>{{coupon.couponDesc}}</view>
		</view>
	</view>
</template>

<script>
	import {getMyCouponDetail} from '@/http/product'
	export default{
		data(){
			return {
				id:'',
				coupon:{
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
		methods:{
			init(){
				this.getMyCouponDetailFun();
			},
			getMyCouponDetailFun(){
				getMyCouponDetail({id:this.id}).then(data=>{
					if(data.data.retCode===0){
						this.coupon = data.data.result
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
				})
			}
		},
		onLoad(params){
			if(params.id){
				this.id = params.id;
			}
			this.init()
		},
		onShow(){
			if(this.$root.$mp.query.id){
				this.id=this.$root.$mp.query.id;
			}
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.c-gr{
		color: #888;
	}
	.c-gr2{
		color: #666;
	}
	.warp{
		background: $uni-color-primary;
		min-height: 100%;
		padding-top: 20upx;
		box-sizing: border-box;
	}
	.box-w{
		width: 704upx;
		margin: 0 auto;
	}
	.b-s{
		box-sizing: border-box;
	}
	.b-line{
		height: 49upx;
		
		background: url(~@/static/card/bg8.png) no-repeat center;
		background-size: 100%;
	}
	.btn-use{
		width:279upx;
		height: 57upx;
		border:1px solid $uni-color-primary;
		color:$uni-color-primary;
		font-size: 36upx;
		text-align: center;
		margin:0 auto;
		line-height: 57upx;
		border-radius: 10upx;
	}
</style>
