<template>
	<view class="page-bg pad_t30">
		<view class="box box-shadow pad20">
			<view class="f-between-c f-con-c f-m mrg_b10 f-c-primary">
				<view class="font-100">{{myInfo.usableWithdrawAmount?myInfo.usableWithdrawAmount:0}}</view>
				<view class="font-28">可提现(元)</view>
			</view>
			<view class="f-between-t text-c pad_lr20">
				<view>
					<view class="font-36 f-b">{{myInfo.reviewAmount?myInfo.reviewAmount:0}}</view>
					<view class="font-28 f-c-g2">待审核佣金</view>
				</view>
				<view>
					<view class="font-36 f-b">{{myInfo.payingAmount?myInfo.payingAmount:0}}</view>
					<view class="font-28 f-c-g2">待打款佣金(元)</view>
				</view>
			</view>
		</view>
		
		<view class="box box-shadow pad_lr20 pad_tb10">
			<view>
				<navigator :url="'/pages/maiCenter/withdrawLog?shopId='+$store.state.shopId" class="f-between-c b-b">
					<view class="l-h100 flex-box icon1">
						<!-- <view class="tralfont tral-shoucang3 font-36 mrg_r5 f-c-primary"></view> -->
						提现记录
					</view>
					<view class="l-h100 flex-box">
						<view class="tralfont tral-jiantouyou"></view>
					</view>
				</navigator>
				<navigator :url="'/pages/maiCenter/commissionLog?shopId='+$store.state.shopId" class="f-between-c">
					<view class="l-h100 flex-box icon2">
						佣金明细
					</view>
					<view class="l-h100 flex-box">
						<view class="tralfont tral-jiantouyou"></view>
					</view>
				</navigator>
				
			</view>
		</view>
		<view class="f-c-c">
			<view @click="gotoApply" class="btn-1">申请提现</view>
		</view>
		<view class="pad20 b-c-w mrg_t10">
			<view class="f-b">用户须知</view>
			<view class="f-c-g2">
				<view>1.佣金满50元可以提现</view>
				<view>2.申请成功后1-3个工作日可到账</view>
			</view>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import footerMenu from '@/components/footer'
	//import {getMyCouponsCount, getOrderCountWithStatus} from '@/http/product.js'
	import {getMyAccountDisInfo} from '@/http/commission.js'
	export default {
		components: {
			uniGrid,
			footerMenu
		},
		computed: {
			avatar(){
				if(this.$store.state.login && this.$store.state.login.user){
					return this.$store.state.login.user.avatar
				}
				return ''
			},
			nickname(){
				if(this.$store.state.login && this.$store.state.login.user){
					return this.$store.state.login.user.nickname
				}
				return ''
			},
		    isToken() {
		        return this.$store.state.login ? this.$store.state.login.token :''
		    }
		},
		watch:{
			isToken(){
				this.init();
			}
		},
		onShow: function() {
			this.init();
		},
		onLoad: function() {
			this.init();
		},
		methods:{
			gotoApply(){
				if(this.myInfo && this.myInfo.usableWithdrawAmount && this.myInfo.usableWithdrawAmount>50){
					uni.reLaunch({
						url: '/pages/maiCenter/withdrawApply?shopId='+ this.$store.state.shopId
					});
				}else{
					uni.showToast({
						title: '可提现佣金必须大于50元才可提现！',
						duration: 2000,
						icon:'none'
					});
				}
			},
			getMyAccountDisInfoFun(){
				getMyAccountDisInfo().then(data=>{
					if(data.data.retCode===0){
						this.myInfo = data.data.result;
					}
				}).catch()
			},
			init(){
				console.log('this.isToken',this.isToken)
				if(this.isToken){
					this.getMyAccountDisInfoFun()
					//this.getOrderCountWithStatusFun();
					//this.getMyCouponsCountFun();
				}
			},
			/* getOrderCountWithStatusFun(){
				getOrderCountWithStatus().then(data=>{
					if(data.data.retCode===0){
						if(data.data.result['0']){
							this.menuList[0].tips = data.data.result['0']
						}else{
							this.menuList[0].tips = ''
						}
						if(data.data.result['1']){
							this.menuList[1].tips = data.data.result['1']
						}else{
							this.menuList[1].tips = ''
						}
						if(data.data.result['4']){
							this.menuList[2].tips = data.data.result['4']
						}else{
							this.menuList[2].tips = ''
						}
						if(data.data.result['-4']){
							this.menuList[3].tips = data.data.result['-4']
						}else{
							this.menuList[3].tips = ''
						}
					}
				}).catch()
			}, */
			/* getMyCouponsCountFun(){
				getMyCouponsCount().then(data=>{
					if(data.data.retCode===0){
						this.myInfo.card = data.data.result || 0
					}
				}).catch()
			} */
		},
		data(){
			return {
				menuList: [{
						image: '/static/order1.png',
						text: '待付款',
						url:'/pages/order/list?status=0',
						tips:''
					},
					{
						image: '/static/order2.png',
						text: '已付款',
						url:'/pages/order/list?status=1',
						tips:''
					},
					{
						image: '/static/order3.png',
						text: '已完成',
						url:'/pages/order/list?status=4',
						tips:''
					},
					{
						image: '/static/order4.png',
						text: '已取消',
						url:'/pages/order/list?status=-4',
						tips:''
					}
				],
				myInfo:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-1{
		background-color: $uni-color-primary;
		padding:8upx 50upx;
		border-radius: 35upx;
		color: #fff;
		line-height: 50upx;
	}
	.font-100{
		font-size: 100upx;
		line-height: 120upx;
	}
	.menu-img{
		width:70upx;
		height: 70upx;
		position:relative;
		.tips{
			position: absolute;
			top:-10upx;
			right: -10upx;
			width:30upx;
			height: 30upx;
			background-color: $uni-color-primary;
			color:#fff;
			text-align: center;
			line-height: 30upx;
			border-radius: 15upx;
		}
		.img{
			width:70upx;
			height:70upx;
		}
	}
	.page-bg{
		background: url(~@/static/my_bg.png) no-repeat top center;
		background-size: 100%;
		overflow:hidden;
		background-attachment:fixed;
	}
	.my-photo{
		width:120upx;
		height:120upx;
		border-radius: 50%;
	}
	.icon1{
		padding-left:55upx;
		box-sizing: border-box;
		background:url(~@/static/icon4.png) no-repeat left center;
		background-size: 40upx;
	}
	.icon2{
		padding-left:55upx;
		box-sizing: border-box;
		background:url(~@/static/icon5.png) no-repeat left center;
		background-size: 40upx;
	}
	.icon3{
		padding-left:55upx;
		box-sizing: border-box;
		background:url(~@/static/icon3.png) no-repeat left center;
		background-size: 40upx;
	}
</style>
