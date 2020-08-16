<template>
	<view class="page-bg">
		<view class="top-part">
			<view class="f-between-c mrg_b10">
				<view class="flex-box">
					<image class="my-photo box-shadow" :src="avatar"/>
					<view class="my-info mrg_l20 f-c-w">
						<view class="font-36 f-b">{{nickname}} <text class="level-tag mrg_l10">{{role===0?'大麦客':(role===1? '小麦客':'普通用户')}}</text></view>
						<view class="font-24">推荐人：{{inviter ? inviter : '平台'}}</view>
						<view class="font-24">邀请码： {{inviteCode}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box box-shadow pad20 mrg_t_50" v-if="myInfo">
			
			<view class="f-between-t text-c">
				<view class="flex-item">
					<view class="font-36 f-b">{{myInfo.totalAmount? myInfo.totalAmount:0}}</view>
					<view class="font-24 f-c-g2">累计收益(元)</view>
				</view>
				<view class="flex-item">
					<view class="font-36 f-b">{{myInfo.myTeamIncome? myInfo.myTeamIncome :0}}</view>
					<view class="font-24 f-c-g2">团队收益(元)</view>
				</view>
				<view class="flex-item">
					<view class="font-36 f-b">{{myInfo.usedWithdrawAmount? myInfo.usedWithdrawAmount : 0}}</view>
					<view class="font-24 f-c-g2">已提现(元)</view>
				</view>
			</view>
			<view class="b-b f-c-g1 pad_b5">含待结算{{myInfo.settleAmount? myInfo.settleAmount : 0}}元</view>
			<view class="f-between-c pad_t10">
				<view class="f-c-g1">可提现金额(元)：{{myInfo.usableWithdrawAmount? myInfo.usableWithdrawAmount:0}}</view>
				<navigator url="/pages/maiCenter/withdraw" class="btn-1">立即提现</navigator>
			</view>
		</view>
		<view class="box box-shadow pad20 mrg_t10" v-if="myInfo">
			
			<view class="f-between-t text-c">
				<navigator :url="'/pages/maiCenter/distributionOrder?shopId='+$store.state.shopId" class="flex-item">
					<view class="font-36 f-b">{{myInfo.myOrderCount? myInfo.myOrderCount :0}}</view>
					<view class="font-24 f-c-g2">推广订单(笔)</view>
				</navigator>
				<navigator :url="'/pages/maiCenter/myCustomer?shopId='+$store.state.shopId" class="flex-item">
					<view class="font-36 f-b">{{myInfo.myCustomerCount? myInfo.myCustomerCount: 0}}</view>
					<view class="font-24 f-c-g2">累计顾客(人)</view>
				</navigator>
				<navigator :url="'/pages/maiCenter/myTeam?shopId='+$store.state.shopId" class="flex-item">
					<view class="font-36 f-b">{{myInfo.myTeamCount? myInfo.myTeamCount:0}}</view>
					<view class="font-24 f-c-g2">累计团队(人)</view>
				</navigator>
			</view>
			
		</view>
		<view class="box box-shadow pad_t10">
			<view class=" pad_tb10">
				<view v-for="(item,i) in menuList" class="f-c-c f-con-c f-m w25p" :key="i">
					<navigator :url="item.url" v-if="item.url" >
						<view class="menu-img">
							<image class="img" :src="item.image"></image>
							<view v-if="item.tips" class="tips">{{item.tips}}</view>
						</view>
						<view class=" pad_t10">{{item.text}}</view>
					</navigator>
					<view v-else @click="callbackFun(item)">
						<view class="menu-img">
							<image class="img" :src="item.image"></image>
							<view v-if="item.tips" class="tips">{{item.tips}}</view>
						</view>
						<view class=" pad_t10">{{item.text}}</view>
					</view>
				</view>
				
			</view>
			<!-- <uni-grid :options="menuList" :show-border="false" :column-num="4" /> -->
		</view>
		
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		<uni-popup ref="popup1" type="center" :maskClickCallback="hideCode">
			<view class="img-box">
				<image v-if="shareQrcode" class="share-img" :src="$imgHost+shareQrcode"></image>
			</view>
			<view class="text-c f-c-w l-h60">长按图片保存至相册</view>
			<view class="tralfont tral-guanbi2 close" @click="hideMenu1"></view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import footerMenu from '@/components/footer'
	//import {getMyCouponsCount, getOrderCountWithStatus} from '@/http/product.js'
	import {getMyAccountDis,createMainPoster} from '@/http/commission'
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
					if(data.data.retCode===0){
						this.myInfo = data.data.result;
					}
				}).catch(e=>{
					
				});
			},
			init(){
				console.log('this.isToken',this.isToken)
				if(this.isToken){
					this.getMyAccountDisFun();
					//this.getOrderCountWithStatusFun();
					//this.getMyCouponsCountFun();
				}
				this.menuList.forEach(item=>{
					if(item.url){
						item.url = item.url+'?shopId='+this.$store.state.shopId;
					}
				})
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
				shareQrcode:'',
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
					/* {
						image: '/static/mai-icon4.png',
						text: '麦客排行',
						url:'/pages/order/list?status=-4',
						tips:''
					}, */
					{
						image: '/static/mai-icon5.png',
						text: '麦客权益',
						url:'/pages/maiCenter/rights',
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
	.close{
		width:60upx;
		height: 60upx;
		font-size: 60upx;
		color: #fff;
		margin:0 auto;
	}
	.share-img{
		width:100%;
	}
	.img-box{
		width:570upx;
		//background-color: #fff;
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
	.w25p{
		width:25%;
		display:inline-block;
		text-align:center;
		margin-bottom: 10upx;
	}
	.btn-1{
		background-color: $uni-color-primary;
		padding:2upx 20upx;
		border-radius: 30upx;
		color: #fff;
		line-height: 50upx;
	}
	.level-tag{
		padding:2upx 20upx;
		background-color: rgba(0,0,0,0.2);
		color:#fff;
		border-radius: 30upx;
		font-size: 24upx;
	}
	.top-part{
		padding:50upx 40upx 100upx 40upx;
		background-color: $uni-color-primary;
		height:350upx;
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
		width:150upx;
		height:150upx;
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
