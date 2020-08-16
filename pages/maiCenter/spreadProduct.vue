<template>
	<view class="min-h100">
		<view class="list" v-if="list.length>0">
			<navigator :url="'/pages/product/detail?id='+item.productId+'&shopId='+$store.state.shopId" class="li-item b-b" v-for="(item,i) in list" :key="i">
				<view class="img">
					<image class="img-img" :src="$imgHost+item.pictureUrl"></image>
					
				</view>
				<view class="content">
					<view class="title f-c-b1">{{item.sortName}}</view>
					<view class="h30">
						
					</view>
					
					<view class="f-between-b">
						<view>
							<view class="price f-c-g2 h30"></view>
							<view class="discountPrice f-c-g2">￥{{item.price}} </view>
						</view>
						<view class="earn-btn mrg_r10" @click.stop="showMenu(item)">推广赚 {{item.disMoney}}元</view>
					</view>
						
				</view>
			</navigator> 
		</view>
		<view v-else>
			<empty v-if="!beloading" text="暂时无货，努力补货中~" :emptyType="5"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClickCallback="hideMenu">
			<view class="bottom-box">
				<view class="flex-box pad_tb20">
					<view class="flex-item f-con-c f-m" @click="showShareWX">
						<image class="menu-icon" src="/static/share-btn1.png"></image>
						<view class="text-c mrg_t10">分享到微信</view>
					</view>
					<view class="flex-item f-con-c f-m" @click="showCode2">
						<image class="menu-icon" src="/static/share-btn3.png"></image>
						<view class="text-c mrg_t10">生成商品海报</view>
					</view>
					<view class="flex-item f-con-c f-m" @click="showCode1">
						<image class="menu-icon" src="/static/share-btn4.png"></image>
						<view class="text-c mrg_t10">短链接</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center" :maskClickCallback="hideMenu1">
			
			<view class="img-box">
				<image class="share-img" :src="shareQrcode" v-if="shareQrcode"></image>
			</view>
			<view class="text-c f-c-w l-h60">长按图片保存至相册</view>
			<view class="tralfont tral-guanbi2 close" @click="hideMenu1"></view>
		</uni-popup>
		<uni-popup ref="popup2" type="top" :maskClickCallback="hideShareWX">
			<view class="img-box2">
				
			</view>
			<view class="text-c font-36 f-b f-c-w">立即推广给好友吧</view>
			<view class="text-c f-c f-c-w">点击屏幕右上角将本页面分享给好友</view>
		</uni-popup>
		<uni-popup ref="popup4" type="center" :maskClickCallback="hideMenu4">
			
			<view class="img-box">
				<view class="l-h60 f-b font-32 text-c">分享链接</view>
				<view class="mrg10" v-if="shareText">{{shareText}}</view>
				<view class="text-c pad_tb10">
					<view class="copy-btn" @click="copyFun">复制文案</view>
				</view>
			</view>
			<view class="tralfont tral-guanbi2 close" @click="hideMenu4"></view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {getCollectList, delCollect,shortUrl} from '@/http/product.js';
	import {queryDisProduct,createShareProduct,createSharePic} from '@/http/commission.js'
	import loading from '@/components/loading2.vue'
	//import {webSite} from '@/http/config.js'
	import wxsdk from '@/common/wxsdk'
	let webSite = window.location.origin;
	export default {
		data(){
			return {
				shareText:'',
				nowObj:'',
				shareQrcode:'',
				beloading:false,
				list:[],
				pages:1, // 总页数
				params:{
					"pageNum": 1,
					"pageSize": 10
				},
			}
		},
		components: {
			loading,
			uniPopup
		},
		onLoad(params){
			//this.init();
		},
		onShow(){
			this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum += 1;
			if(this.pages>=this.params.pageNum){
				this.queryDisProductFun();
			}
		},
		computed:{
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
			isOver(){
				return !this.pages || !this.params.pageNum || this.pages>this.params.pageNum
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
		methods:{
			copyFun(){
				uni.setClipboardData({ data:this.shareText,
				success:function(data){
					uni.showToast({
						title: '复制成功，快去分享给朋友吧！',
						duration: 2000,
						icon:'none'
					});
				}, fail:function(err){
					uni.showToast({
						title: '复制失败，请手动复制',
						duration: 2000,
						icon:'none'
					});
				}, complete:function(res){} })
			},
			shortUrlFun(){
				var url = webSite+'/#/pages/product/detail?id='+this.nowObj.productId+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					url = url+'&inviteCode='+this.inviteCode; //分享链接
				}
				shortUrl({url}).then(data=>{
					if(data.data.success){
						this.shareText = this.nowObj.productName +' '+ data.data.shortUrl
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
			},
			toShare(){
				//console.log('img',this.$imgHost+this.pictureUrl.pictureUrl)
				var url = window.location.href.split('#')[0]
				let til =this.nowObj.productName || '亿麦周边游商品'
				let desc = this.nowObj.sketch || '亿麦周边游商品...'
				var linkurl = webSite+'/#/pages/product/detail?id='+this.nowObj.productId +'&shopId='+this.$store.state.shopId
				if(this.$store.state.shopType===0){
					linkurl = linkurl+'&inviteCode='+this.inviteCode; //分享链接
				}
				var obj = {
				  title: til,		//分享标题
				  desc: desc,						//分享内容
				  linkurl: linkurl,//分享链接
				  img: this.$imgHost+this.nowObj.pictureUrl,				//分享内容显示的图片
				}
				wxsdk.getJSSDK(url, obj)
			},
			showShareWX(){
				this.toShare()
				this.$refs.popup2.open();
			},
			hideShareWX(){
				this.$refs.popup2.close();
			},
			createSharePicFun(item){ //生成推广产品二维码
				var shareUrl = webSite+'/#/pages/product/detail?id='+this.nowObj.productId+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					shareUrl = shareUrl+'&inviteCode='+this.inviteCode; //分享链接
				}
				let params={
					"inviteCode":this.inviteCode,
					"headImgUrl": this.avatar,
					 "productId": item.productId,
					 "referrerName": this.nickname,
					 "shareUrl": shareUrl
				}
				createSharePic(params).then(data=>{
					if(data.data.retCode===0){
						this.shareQrcode = this.$imgHost+data.data.result;
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			createShareProductFun(item){ // 生成推广产品二维码海报
				var shareUrl = webSite+'/#/pages/product/detail?id='+this.nowObj.productId+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					shareUrl = shareUrl+'&inviteCode='+this.inviteCode; //分享链接
				}
				let params={
					"headImgUrl": this.avatar,
					 "productId": item.productId,
					 "referrerName": this.nickname,
					 "shareUrl": shareUrl
				}
				createShareProduct(params).then(data=>{
					if(data.data.retCode===0){
						this.shareQrcode = this.$imgHost+data.data.result;
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			queryDisProductFun(){
				this.beloading = true;
				queryDisProduct(this.params).then(data=>{
					this.beloading = false;
					if(this.params.pageNum===1){
						this.list = [];
					}
					if(data.data.retCode===0){
						if(data.data.result.list){
							let list = data.data.result.list.map(item=>{
								item.sortName = item.productName;
								if(item.productName && item.productName.length>26){
									item.sortName = item.productName.substr(0,25)+'...'
								}
								return item;
							});
							this.list = [...this.list,...list]
							this.pages = data.data.result.pages;
							this.params.pageNum = data.data.result.pageNum;
						}
					}
				}).catch(e=>{
					this.beloading = false;
				})
			},
			init(){
				if(this.isToken){
					this.queryDisProductFun();
					//this.getCollectListFun();
				}
			},
			showCode1(){
				//this.createSharePicFun(this.nowObj)
				this.shortUrlFun()
				this.$refs.popup4.open();
			},
			showCode2(){
				this.createShareProductFun(this.nowObj)
				this.$refs.popup1.open();
			},
			showMenu(item){
				this.nowObj = item;
				this.$refs.popup.open();
			},
			hideMenu(){
				this.$refs.popup.close();
				this.shareQrcode = ''
			},
			showMenu1(){
				this.$refs.popup1.open();
			},
			hideMenu1(){
				console.log('----->')
				this.$refs.popup1.close();
				this.shareQrcode = ''
			},
			hideMenu4(){
				console.log('----->')
				this.$refs.popup4.close();
				this.shareText = ''
			},
			getCollectListFun(){
				this.beloading = true;
				getCollectList().then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						if(data.data.result.list){
							this.list = data.data.result.list;
							this.pages = data.data.result.pages;
							this.params.pageNum = data.data.result.pageNum;
						}
					}
				}).catch(e=>{
					this.beloading = false;
				});
			},
			goProduct(id){
				uni.navigateTo({
					url: '/pages/product/detail?id='+id+'&shopId='+this.$store.state.shopId
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.copy-btn{
		width:145upx;
		border-radius:10upx;
		background-color:$uni-color-primary;
		color:#fff;
		font-size: 26upx;
		padding:10upx;
		text-align: center;
		margin:10upx auto;
	}
	.uni-popup__wrapper-box{
		overflow: visible;
	}
	.img-box2{
		margin-top:20upx;
		width:700upx;
		height: 200upx;
		background: url(~@/static/share-arrow.png) no-repeat right top;
		background-size: 168upx;
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
	.share-img{
		width:100%;
	}
	.menu-icon{
		width:120upx;
		height: 120upx;
		border-radius: 60upx;
		margin:0 auto;
	}
	.bottom-box{
		box-sizing: border-box;
		padding:20upx;
		margin-bottom: 0;
		background-color: #fff;
		width:100%;
	}
	.img-box{
		width:500upx;
		background-color: #fff;
		border-radius:10upx;
	}
	.close{
		width:60upx;
		height: 60upx;
		font-size: 60upx;
		color: #fff;
		margin:0 auto;
	}
	.list{
		padding:30upx;
	}
	.li-item{
		padding-left:270upx;
		padding-bottom: 20upx;
		margin-bottom:30upx;
		position:relative;
		background-color:#fff;
		height:250upx;
		
		.img{
			width:250upx;
			height:250upx;
			position:absolute;
			top: 0;
			left: 0;
			.img-img{
				width:250upx;
				height:250upx;
				border-radius: 15upx;
			}
			.endTime{
				height: 70upx;
				line-height: 70upx;
				background-color:rgba(10,10,10,0.3);
				color:#fff;
				position:absolute;
				bottom:0;
				left:0;
				width:100%;
				padding:0 10upx;
				box-sizing: border-box;
				border-radius: 0 0 0 15upx;
				.day-tag{
					border-radius:10upx;
					background-color:#fff;
					display:inline-block;
					color:#333;
					width:44upx;
					height:40upx;
					line-height: 40upx;
					text-align: center;
					margin:0 6upx;
				}
			}
		}
		.content{
			.title{
				font-weight: bold;
				font-size: 32upx;
				height: 80upx;
			}
			.discountPrice{
				font-size: 30upx;
				color:$uni-color-primary;
				font-weight: bold;
			}
			.price{
				font-size: 24upx;
				
			}
			.discount-tag{
				display:inline-block;
				font-size: 24upx;
			}
			.address{
				font-size: 22upx;
				width:240upx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
	.tag1{
		display: inline-block;
		border-radius: 16upx;
		font-size: 24upx;
		color:$uni-color-primary;
		background-color:lightgoldenrodyellow;
		padding:0 10upx;
	}
	.buy-btn{
		padding:0 25upx;
		line-height: 50upx;
		display:inline-block;
		background-color:$uni-color-primary;
		color:#fff;
		text-align: center;
		border-radius:8upx;
	}
	.earn-btn{
		padding:0 25upx;
		line-height: 50upx;
		display:inline-block;
		background-color:$uni-color-primary;
		color:#fff;
		text-align: center;
		border-radius:25upx;
	}
</style>
