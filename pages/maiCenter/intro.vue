<template>
	<view class="page-bg">
		<view class="top-part">
			<view class="f-between-c mrg_t10">
				<view class="flex-box">
					<image class="my-photo box-shadow" :src="avatar"/>
					<view class="my-info mrg_l20 f-c-w f-m f-c-c">
						<view class="font-36 f-b">{{nickname}} </view>
					</view>
				</view>
				<view class="r-box f-c-c f-con-c f-m icon-text">
					<view class="font-20">￥0</view>
					<view class="font-20">已得佣金</view>
				</view>
			</view>
		</view>
		<view class="box box-shadow pad20 mrg_t_50">
			<view class="til-1">20粉就能升麦客</view>
			<view class="photo-box f-c-c f-con-c">
				<view class="photo-item" v-for="(item,i) in photoList" :key="i">
					<image :src="item" class="photo-img"></image>
				</view>
				
			</view>
			<view class="f-c-c">
				<view class="btn-1" @click="showCode">距离成为麦客还剩{{20-myFans.length}}个粉丝<text class="mrg_l10 tralfont tral-jiantouyou"></text></view>
			</view>
		</view>
		<view class="box box-shadow pad20 mrg_t10">
			<view class="til-2">20粉成麦客 享2大特权</view>
			<view class="photo-box2 flex-box">
				<view class="flex-item f-con-c f-m text-c">
					<image class="icon-img" src="/static/account_icon1.png"></image>
					<view class="icon-text font-22">
						<view class="l-h40">自购返现</view>
						<view class="l-h40">最高12%</view>
					</view>
				</view>
				<view class="flex-item f-con-c f-m text-c">
					<image class="icon-img" src="/static/account_icon2.png"></image>
					<view class="icon-text font-22">
						<view class="l-h40">粉丝购买</view>
						<view class="l-h40">最高返12%</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		<uni-popup ref="popup1" type="center" :maskClickCallback="hideCode">
			<view class="img-box">
				<image v-if="shareQrcode" class="share-img" :src="$imgHost+shareQrcode"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import footerMenu from '@/components/footer'
	import {getMyCouponsCount, getOrderCountWithStatus} from '@/http/product.js'
	import {getMyAccountDis, createMainPoster, getMyFans} from '@/http/commission'
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
			inviteCode(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.userAccount){
					return this.$store.state.login.user.userAccount.inviteCode
				}
				return ''
			},
			role(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
					return this.$store.state.login.user.member.isDis
				}
				return 2
			},
		    isToken() {
		        return this.$store.state.login ? this.$store.state.login.token :''
		    },
			inviter(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
					return this.$store.state.login.user.member.parentName
				}
				return ''
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
			getMyFansFun(){
				getMyFans().then(data=>{
					this.myFans =[];
					this.photoList = ['','','','','','','','','','','','','','','','','','','',''];
					if(data.data.retCode===0){
						//this.shareQrcode = this.$imgHost+data.data.result;
						if(data.data.result){
							this.myFans = data.data.result
						}
						this.photoList=this.photoList.map((item,i)=>{
							if(this.myFans[i] && this.myFans[i].avatar){
								item = this.myFans[i].avatar
							}
							return item
						})
						console.log('this.photoList',this.photoList)
						console.log('this.myFans,',this.myFans)
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			createMainPosterFun(){ // 生成推广产品二维码
				let params={
					"inviteCode":this.inviteCode,
					"headImgUrl": this.avatar,
					 "referrerName": this.nickname,
					 "shareUrl": webSite+'/#/?inviteCode='+this.inviteCode+'&shopId='+this.$store.state.shopId
				}
				createMainPoster(params).then(data=>{
					if(data.data.retCode===0){
						this.shareQrcode = data.data.result;
					}
				}).catch(e=>{
					console.log('e--->',e)
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			callbackFun(item){
				if(item.callback){
					this[item.callback]()
				}
			},
			showCode(){
				this.createMainPosterFun();
				this.$refs.popup1.open();
			},
			hideCode(){
				this.$refs.popup1.close();
			},
			getMyAccountDisFun(){
				getMyAccountDis().then(data=>{
					if(data.code===0){
						
					}
				}).catch(e=>{
					
				});
			},
			init(){
				console.log('this.isToken',this.isToken)
				this.menuList.forEach(item=>{
					item.url = item.url+'?shopId='+this.$store.state.shopId;
				})
				if(this.isToken){
					this.getMyAccountDisFun();
					this.getMyFansFun();
					//this.getOrderCountWithStatusFun();
					//this.getMyCouponsCountFun();
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
				photoList:['','','','','','','','','','','','','','','','','','','',''],
				myFans:[],
				shareQrcode:'',
				shareBanner:'',
				menuList: [{
						image: '/static/mai-icon1.png',
						text: '推广商品',
						url:'/pages/maiCenter/spreadProduct',
						tips:''
					},
					{
						image: '/static/mai-icon2.png',
						text: '推广海报',
						callback:'showCode',
						tips:''
					},
					/* {
						image: '/static/mai-icon3.png',
						text: '邀请麦客',
						url:'/pages/order/list?status=4',
						tips:''
					}, */
					{
						image: '/static/mai-icon4.png',
						text: '麦客排行',
						url:'/pages/order/list?status=-4',
						tips:''
					},
					{
						image: '/static/mai-icon4.png',
						text: '麦客权益',
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
	.share-img{
		width:100%;
	}
	.img-box{
		width:522upx;
		background-color: #fff;
		border-radius:10upx;
	}
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
	.tral-jiantouyou{
		&:before{
			color:#fff!important;
		}
	}
	/* .btn-1{
		background-color: $uni-color-primary;
		padding:10upx 60upx;
		border-radius: 35upx;
		color: #fff;
		line-height: 90upx;
	} */
	.icon-img{
		width:92upx;
		height:92upx;
		border-radius: 50%;
		margin:10upx auto;
	}
	.photo-item{
		width:64upx;
		height:64upx;
		border-radius: 50%;
		box-sizing: border-box;
		border:2upx solid #ffc069;
		background-color: #fef7e7;
		margin:10upx;
		.photo-img{
			width:100%;
			height:100%;
			border-radius: 50%;
		}
	}
	.icon-text{
		color:#b35518;
	}
	.photo-box{
		width:440upx;
		margin:20upx auto;
	}
	.photo-box2{
		width:560upx;
		margin:20upx auto;
	}
	.til-1{
		height: 73upx;
		background: url(~@/static/til_banner.png) no-repeat center;
		background-size: 358upx;
		text-align: center;
		color:#b35518;
		font-size: 34upx;
		line-height: 90upx;
	}
	.til-2{
		height: 73upx;
		background: url(~@/static/til_banner2.png) no-repeat center;
		background-size: 458upx;
		text-align: center;
		color:#b35518;
		font-size: 34upx;
		line-height: 90upx;
	}
	.r-box{
		width:215upx;
		height: 124upx;
		background:url(~@/static/account_bg.png) no-repeat center;
		background-size: 215upx;
	}
	.w25p{
		width:25%;
		display:inline-block;
		text-align:center;
		margin-bottom: 10upx;
	}
	.btn-1{
		background-color: $uni-color-primary;
		padding:0 30upx;
		border-radius: 30upx;
		color: #fff;
		line-height: 60upx;
	}
	.level-tag{
		padding:2upx 20upx;
		background-color: rgba(0,0,0,0.2);
		color:#fff;
		border-radius: 30upx;
		font-size: 24upx;
	}
	.top-part{
		padding:50upx 40upx 70upx 40upx;
		background-color: $uni-color-primary;
		height:320upx;
		box-sizing: border-box;
	}
	.mrg_t_50{
		margin-top: -100upx;
	}
	.menu-img{
		width:70upx;
		height: 70upx;
		position:relative;
		margin:0 auto;
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
		//background-color:$uni-color-primary;
		background-size: 100% 400upx;
		overflow:hidden;
		background-attachment:fixed;
	}
	.my-photo{
		width:110upx;
		height:110upx;
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
