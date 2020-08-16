<template>
	<view class="page-bg pad_t30">
		<view class="box box-shadow pad20">
			<view class="f-between-c mrg_b10">
				<view class="flex-box">
					<image class="my-photo box-shadow" :src="avatar"/>
					<view class="my-info mrg_l20">
						<view class="font-36">{{nickname}}</view>
						<view class="font-24 f-c-g2">{{myInfo.city}} {{myInfo.address}}</view>
					</view>
				</view>
				<navigator :url="'/pages/my/myInfo?shopId='+$store.state.shopId" class="tralfont tral-shezhi font-36"></navigator>
			</view>
			<view class="f-between-t text-c">
				<view class="w150">
					<view class="font-36 f-b">{{myInfo.account}}</view>
					<view class="font-28">余额</view>
				</view>
				<navigator url="/pages/coupon/couponList" class="flex-item">
					<view class="font-36 f-b">{{myInfo.card}}</view>
					<view class="font-28">卡劵</view>
				</navigator>
				<navigator url="/pages/integral/integralShop" class="w150">
					<view class="font-36 f-b">{{myInfo.integral}}</view>
					<view class="font-28">积分</view>
				</navigator>
			</view>
		</view>
		<view class="box box-shadow pad_lr20 pad_t10">
			<view class="box-title f-between-c">
				我的订单
				<navigator :url="'/pages/order/list?shopId='+$store.state.shopId" class="more">全部订单<view class="tralfont tral-jiantouyou pad_l5"></view></navigator>
			</view>
			<view class="f-between-c pad_tb10">
				<navigator :url="item.url" v-for="(item,i) in menuList" class="f-m" :key="i">
					<view class="menu-img">
						<image class="img" :src="item.image"></image>
						<view v-if="item.tips" class="tips">{{item.tips}}</view>
					</view>
					<view class=" pad_t10">{{item.text}}</view>
				</navigator>
			</view>
			<!-- <uni-grid :options="menuList" :show-border="false" :column-num="4" /> -->
		</view>
		<view class="box box-shadow pad_lr20 pad_tb10">
			<view>
				<navigator :url="'/pages/my/collectList?shopId='+$store.state.shopId" class="f-between-c b-b">
					<view class="l-h100 flex-box icon1">
						<!-- <view class="tralfont tral-shoucang3 font-36 mrg_r5 f-c-primary"></view> -->
						我的收藏
					</view>
					<view class="l-h100 flex-box">
						<view class="tralfont tral-jiantouyou"></view>
					</view>
				</navigator>
				<navigator :url="'/pages/my/addressList?shopId='+$store.state.shopId" class="f-between-c b-b">
					<view class="l-h100 flex-box icon2">
						收货地址
					</view>
					<view class="l-h100 flex-box">
						<view class="tralfont tral-jiantouyou"></view>
					</view>
				</navigator>
				<view class="f-between-c" @click="showContactFun">
					<view class="l-h100 flex-box icon3">
						<!-- <view class="tralfont tral-tishifill mrg_r5 font-36 f-c-primary"></view> -->
						联系我们
					</view>
					<view class="l-h100 flex-box">
						<view class="tralfont tral-jiantouyou"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		<uni-popup ref="popup" type="center" :maskClickCallback="hideContactFun">
			<view class="con-box">
				<view class="til">联系客服</view>
				<view class="pad_tb10">
					<view class="text-c font-24">长按二维码并关注，可直接联系客服</view>
					<view class="contact-img">
						<image :src="webSite+'/static/shop-call-icon.jpg'" class="contact-img-img"></image>
					</view>
					
					<view class="f-between-c pad_lr30 font-24 t-b pad_t5" @click="callme">
						<view>
							<view>联系商家</view>
							<view>18688902986</view>
						</view>
						<view class="tell-icon" ></view>
					</view>
				</view>
			</view>
		</uni-popup>	
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import footerMenu from '@/components/footer'
	import {getMyCouponsCount, getOrderCountWithStatus} from '@/http/product.js'
	//import {webSite} from '@/http/config.js'
	let webSite = window.location.origin;
	export default {
		components: {
			uniGrid,
			footerMenu,
			uniPopup
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
		onHide: function() {
			this.init();
		},
		methods:{
			hideContactFun(){
				this.$refs.popup.close();
			},
			showContactFun(){
				this.$refs.popup.open();
			},
			callme(){
				uni.makePhoneCall({
				    phoneNumber: '18688902986' 
				});
			},
			init(){
				this.webSite = webSite
				console.log('this.isToken',this.isToken)
				this.menuList.map(item=>{
					item.url = item.url+'&shopId='+this.$store.state.shopId;
					return item;
				})
				if(this.isToken){
					this.getOrderCountWithStatusFun();
					this.getMyCouponsCountFun();
				}
			},
			getOrderCountWithStatusFun(){
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
			},
			getMyCouponsCountFun(){
				getMyCouponsCount().then(data=>{
					if(data.data.retCode===0){
						this.myInfo.card = data.data.result || 0
					}
				}).catch()
			}
		},
		data(){
			return {
				webSite:'',
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
				myInfo:{
					name:'天空行',
					photo:'/static/templateHL.png',
					city:'',
					address:'',
					account:'0',
					card:'0',
					integral:'0'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-image{
		height: auto;
		div{
			height:auto;
		}
		img{
			position: relative;
			height: auto;
		}
	}
	.tell-icon{
		width:50upx;
		height: 50upx;
		background: url(~@/static/phone-icon.jpg) no-repeat center;
		background-size: 50upx;
	}
	.contact-img{
		width:241upx;
		height: 231upx;
		margin:10upx auto;
		.contact-img-img{
			width:100%;
		}
	}
	.con-box{
		width:578upx;
		background-color: #fff;
		border-radius:20upx;
		.til{
			background-color: #f60837;
			line-height: 80upx;
			text-align: center;
			font-size: 32upx;
			font-weight: bold;
			color: #fff;
			border-radius:20upx 20upx 0 0;
		}
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
		background:url(~@/static/icon1.png) no-repeat left center;
		background-size: 40upx;
	}
	.icon2{
		padding-left:55upx;
		box-sizing: border-box;
		background:url(~@/static/icon2.png) no-repeat left center;
		background-size: 40upx;
	}
	.icon3{
		padding-left:55upx;
		box-sizing: border-box;
		background:url(~@/static/icon3.png) no-repeat left center;
		background-size: 40upx;
	}
</style>
