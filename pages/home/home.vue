<template>
	<view class="warp">
		<view v-if="!isFans" class="top-tips" @click="showTopTips">关注亿麦周边游公众号，每月不定期<text class="f-b">送优惠券</text>哦！<text class="f-b followBtn">点击关注</text></view>
		<navigator :url="'/pages/product/search?shopId='+$store.state.shopId" class="search-box">
			<view class="city" @click.stop="showCity">{{$store.state.city ? $store.state.city : '广州'}}<text class="tralfont tral-jiantouxia font-20 mrg_l5"></text></view>
			<view class="input">请输入目的地/酒店/活动名称</view>
			<view class="search-btn tralfont tral-sousuo"></view>
		</navigator>
		<view class="uni-padding-wrap" v-if="banner && banner.length>0">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,i) in banner" :key="i">
							<view @click="goPage(item.link)">
							<view class="swiper-item">
								<image class="img" :src="item.img"/>
							</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="b-b mrg_t5" v-if="menuList && menuList.length>0"><uni-grid :options="menuList" :show-border="false" :column-num="5" /></view>
		<view class="good-box" v-if="goodList.length>0">
			<view class="good-til f-between-c">
				<view class="font-32">
					<view class="tralfont tral-shixunchengji mrg_r5 f-b"></view>
					优品推荐
					</view>
				<view class="font-22">
					<navigator :url="'/pages/product/list?shopId='+ $store.state.shopId +'&categoryId=6'">查看更多<view class="tralfont tral-jiantouyou"></view></navigator>
				</view>
			</view>
			<view class="good-list">
				<view class="good-list-box flex-box">
					<navigator :url="'/pages/product/detail?id='+item.id+ '&shopId='+$store.state.shopId" class="good-item" v-for="(item,i) in goodList" :key="i">
						<image class="img" :src="$imgHost+item.pictureUrl"></image>
						<view class="f-c-b1 l-h40">{{item.sortName}}</view>
						<view class="f-between-c mrg_tb5">
							<view class="f-c-primary">￥{{item.price}}</view>
							<view class="buy-btn2" v-if="item.disMoney">赚{{item.disMoney}}元</view>
							<view class="buy-btn" v-else>抢</view>
						</view>
					</navigator>
				</view>
				<!-- <view class="line-r"></view> -->
			</view>
		</view>
		<!-- <view class="pad_lr10 pad_t10">
			<navigator url="/pages/coupon/center">
				<image class="couponBanner" src="http://img.gzymtech.com/10088/1/hd/2c3160d3-b8ba-4315-96c5-ebe834598d90.jpg"></image>
			</navigator>
		</view> -->
		<view id="fixTop" :class="{'fixTop':fixtop}">
			<x-tab :tabList="tabList" :callback="changTab"></x-tab>
		</view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		<product-list :list="productList" :beloading="beloading"></product-list>
		<view class="h50"></view>
		<uni-popup ref="popup1" type="center" :maskClickCallback="hideMenu1">
			
			<view :url="startAdvObj.url" class="img-box" v-if="startAdvObj">
				<view class="page-section swiper2" v-if="startAdvObj.list && startAdvObj.list.length>1">
					<view class="page-section-spacing">
						<swiper class="swiper2" :indicator-dots="indicatorDots" :autoplay="false" :interval="interval" :duration="duration">
							<swiper-item v-for="(item,i) in startAdvObj.list" :key="i">
								<view @click="goPage(item.url)">
								<view class="swiper-item2">
									<image class="img" :src="$imgHost+item.image"/>
								</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view v-else>
					<view @click="goPage(item.url)" v-for="(item,i) in startAdvObj.list" :key="i">
					<view class="swiper-item2">
						<image class="img" :src="$imgHost+item.image"/>
					</view>
					</view>
				</view>
				<!-- <image class="share-img" :src="startAdvObj.img" v-if="startAdvObj.img"></image> -->
			</view>
			<view class="tralfont tral-guanbi2 close" @click="hideMenu1"></view>
		</uni-popup>
		<uni-popup ref="popupTopTips" type="center" :maskClickCallback="hideTopTips">
			<view class="qrimg" >
			    <tki-qrcode
			    ref="qrcode"
			    :val="followUrl"
			    :icon="yimaiIcon"
				:onval="true"
				@result="qrR"
				:size="500"
				:loadMake="true"
			     />
			</view>
			<view class="tralfont tral-guanbi2 close" @click="hideTopTips"></view>
		</uni-popup>
		<uni-popup ref="popupCity" type="top" :maskClickCallback="hideCity">
			<view class="b-c-w">
				<view class=" pad_lr15 pad_tb10 b-c-w mrg_b10">
					<view class="til mrg_b5">切换城市</view>
					<view class="flex-box mrg_b5 f-con-t">
						<view v-for="(item,i) in cityList" :key="i" class="tag" :class="{nowCity:$store.state.city===item}" @click="switchCity(item)">{{item}}</view>
					</view>
					
				</view>
			</view>
			<view class="tralfont tral-guanbi2 close" @click="hideCity"></view>
		</uni-popup>
	</view>
</template>
<script>
	import yimailogo from '@/static/yimailogo.png'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {createQrcode} from '@/http/user'
	//import {getUserInfo} from '@/http/user'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import xTab from '@/components/xyz-tab/xyz-tab.vue'
	import productList from '@/components/product-list'
	import footerMenu from '@/components/footer'
	import {getSpuByPage, getFirstPageCategorys,getExcellent,queryAdByCode,queryPopAdByCode, getCityList} from '@/http/product'
	import wxsdk from '@/common/wxsdk'
	//import {webSite} from '@/http/config.js'
	let webSite = window.location.origin;
	export default {
		components: {
			uniGrid,
			xTab,
			productList,
			footerMenu,
			uniPopup,
			tkiQrcode
		},
		data() {
			return {
				cityList:['广州市','深圳市'],
				followUrl:'',
				yimaiIcon: yimailogo,
				top:0,
				startAdvObj:'',
				words:[
					'生命一定要浪费在美好的事物上，体重一定要浪费在美味的食物上，爱情一定要浪费在你爱的人身上',
					'生活有一百种过法，别人的故事再好始终是别人的，活成什么样子，自己决定。',
					'光说不练假把戏，来一场说走就走的旅行吧！',
					'经营好自己，珍惜当下时光，一切该来的总会到。',
					'世界那么大，唯有美食美景与所爱之人不可辜负，不如一起出去走走吃吃喝喝玩玩乐乐~',
					'做一个热爱生活的人吧，从一顿美食，一趟小旅行开始！',
					'携子之手，与子周边游！',
					'生活不易，工作亦是辛苦，不如抽空吃喝玩乐一把！',
					'七月的风，八月的雨，不如一起游玩去~',
					'周边美食，景区等你来选~'
				],
				goodList:[],
				beloading:false,
				pages:1, // 总页数
				params:{
					"isHot": 0,
					"isScareBuy": 0,
					"pageNum": 1,
					"pageSize": 10,
					"qryType":'',
					"areaName":''
				},
				fixtop:false,
				productList:[],
				banner:[
					/* {
						img:'http://img.gzymtech.com/10088/1/hd/02c6d2a7-bf08-4519-bdd2-febd3a864fc3.jpg',
						link:'/pages/product/detail?id=114789666640625664'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/eb99a230-58d2-4f1d-98d5-cc6096970285.jpg',
						link:'/pages/product/detail?id=114821245257646080'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/c8494cf7-52f3-45f2-8ea1-f161271bb61a.jpg',
						link:'/pages/product/detail?id=114789258773921792'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/a55ab8a6-b64f-422c-a59a-275dbf229116.jpg',
						link:'/pages/product/detail?id=114795324538617856'
					}, */
				],
				tabList:[{label:'热门',id:'1'},{label:'正在开抢',id:'2'},{label:'即将开抢',id:'3'}],
				menuList: [],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		computed:{
			shopName(){
				if(this.$store.state.shopName){
					console.log('this.$store.state.shopName',this.$store.state.shopName)
					return this.$store.state.shopName;
				}
				return '';
			},
			city(){
				return this.$store.state.city;
			},
			inviteCode(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.userAccount){
					return this.$store.state.login.user.userAccount.inviteCode
				}
				return ''
			},
			isToken() {
			    return this.$store.state.login ? this.$store.state.login.token :''
			},
			isFans(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
					if(this.$store.state.login.user.member.isFans===1){
						return true;
					}
				}
				return false;
			}
		},
		watch:{
			shopName(){
				if(this.shopName){
					console.log('w:setTitle',this.shopName)
					this.setTitle(this.shopName)
				}
			},
			city(){
				if(this.city){
					this.params.areaName = this.city;
					this.getSpuByPageFun()
					this.queryAdByCodeFun()
				}
			},
			inviteCode(){
				console.log('this.$store.state.login',this.$store.state.login)
				this.toShare();
			},
			isToken(){
				if(this.isToken){
					setTimeout(()=>{wxsdk.getPosition()},600)
				}
			}
		},
		onLoad(){
			if(this.shopName){
				console.log('load:',this.shopName)
				this.setTitle(this.shopName);
			}
			//this.init()
			this.$nextTick(()=>{
				this.setHeight();
				window.setTimeout(()=>{
					if(this.isToken){
						this.queryPopAdByCodeFun()
					}
					this.getCityListFun()
				},400)
			})
			
		},
		onHide(){
			this.fixTop = false;
		},
		onShow(){
			this.top = Number(uni.getStorageSync('fixtop') || 0)
			this.init()
			uni.removeStorageSync('order');
			console.log(' uni', uni)
		},
		onPageScroll(e) {
			/* console.log('e.scrollTop',e.scrollTop)
			console.log('this.top',this.top) */
			if (e.scrollTop >= this.top) {
			  this.fixtop = true;
			} else {
			  this.fixtop = false;
			}
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum += 1;
			if(this.pages>=this.params.pageNum){
				this.getSpuByPageFun();
			}
			
		},
		
		methods: {
			//地图定位start
			/* getPosition(){
				wx.ready(function () {
					wx.getLocation({
						type: 'wgs84',
						success: (res) => {
							geocoderF({lat:res.latitude,lng:res.longitude}).then(data=>{
								console.log('city:=>',data)
								alert(JSON.stringify(data))
							}).catch()
						  
						}
				  })
				})
			}, */
			//end
			setTitle(title){
				console.log('title',title)
				uni.setNavigationBarTitle({  
					title: title  
				})
			},
			getCityListFun(){
				getCityList({shopId:this.$store.state.shopId}).then(data=>{
					if(data.data.retCode===0){
						this.cityList = data.data.result;
					}
				}).catch()
			},
			switchCity(city){
				this.$store.commit('setCity',city)
				this.hideCity()
			},
			qrR(e){
				console.log('qrC:',e)
			},
			createQrcodeFun(){
				console.log('createQrcodeFun')
				this.followUrl = '';
				var url = window.location.origin
				var linkurl = url+'/#/?shopId='+this.$store.state.shopId
				let inviteCode = ''
				if(this.$root.$mp.query.inviteCode){
					inviteCode = this.$root.$mp.query.inviteCode
				}
				if(this.$store.state.shopType===0 && inviteCode){
					linkurl = linkurl+'&inviteCode='+inviteCode; //分享链接
				}
				let params = {
					inviteCode:inviteCode,
					shopId:this.$store.state.shopId,
					url:linkurl
				}
				createQrcode(params).then(data=>{
					if(data.data.retCode===0){
						this.followUrl = data.data.result;
						
						//this.$refs.qrcode._makeCode()
						console.log('this.followUrl',this.followUrl)
						this.$refs.popupTopTips.open();
					}else{
						
					}
				}).catch(e=>{
					
				})
			},
			showTopTips(){
				this.createQrcodeFun()
				
			},
			hideTopTips(){
				this.$refs.popupTopTips.close();
			},
			showCity(){
				this.$refs.popupCity.open();
				
			},
			hideCity(){
				this.$refs.popupCity.close();
			},
			checkTime(val){
				let ifOk = false;
				let nowTime = new Date()
				nowTime = nowTime.getTime()
				let lastTime = uni.getStorageSync('startAdvTime');
				console.log('lastTime',lastTime)
				console.log('nowTime',nowTime)
				console.log('---checkTime :',nowTime -Number(lastTime) - 1000*60*60*24*val)
				if(lastTime){
					ifOk = (nowTime -Number(lastTime) - 1000*60*60*24*val) > 0
					if(ifOk){
						uni.setStorageSync('startAdvTime',nowTime);
					}
				}else{
					ifOk = true
					uni.setStorageSync('startAdvTime',nowTime);
				}
				return ifOk;
			},
			showMenu1(){
				this.$refs.popup1.open();
			},
			hideMenu1(){
				console.log('----->')
				this.$refs.popup1.close();
			},
			
			queryPopAdByCodeFun(){
				queryPopAdByCode({code:'indexStart',shopId:this.$store.state.shopId}).then(data=>{
					if(data.data.retCode===0){
						this.startAdvObj = data.data.result
						if(this.startAdvObj){
							if(this.startAdvObj.showType===0 && this.startAdvObj.popUpFlag){
								this.showMenu1()
							}else if(this.startAdvObj.showType===1 && this.startAdvObj.gapTime){
								if(this.checkTime(this.startAdvObj.gapTime)){
									this.showMenu1()
								}
							}
						}
					}
				}).catch()
			},
			goPage(link){
				window.location.href = link;
			},
			queryAdByCodeFun(){
				let areaName = this.city || '广州市'
				queryAdByCode({code:'homeBanner',shopId:this.$store.state.shopId,'areaName':areaName}).then(data=>{
					if(data.data.retCode===0 && data.data.result &&data.data.result.list){
						this.banner = data.data.result.list.map(item=>{
							return {
								img:this.$imgHost+item.image,
								link:item.url
							}
						})
					}
				}).catch();
			},
			getExcellentFun(){
				getExcellent({count:5,shopId:this.$store.state.shopId}).then(data=>{
					if(data.data.retCode===0){
						this.goodList = data.data.result.map(item=>{
							if(item.name.length>16){
								item.sortName = item.name.substr(0,14)+'...'
							}else{
								item.sortName = item.name
							}
							return item
						});
					}
					this.$nextTick(()=>{
						this.setHeight();
					})
				}).catch()
			},
			getFirstPageCategorysFun(){
				getFirstPageCategorys({shopId:this.$store.state.shopId}).then(data=>{
					if(data.data.retCode===0){
						this.menuList = data.data.result.map(item=>{
							return {
								image: this.$imgHost+item.pictureUrl,
								text: item.name,
								url:'/pages/product/list?shopId='+this.$store.state.shopId,
								categoryId:item.id
							};
						})
						//console.log('homethis.menuList',this.menuList)
					}
					this.$nextTick(()=>{
						this.setHeight();
					})
					
				}).catch()
			},
			toShare(){
				var url = window.location.href.split('#')[0]
				console.log('home-toshare:',window.location.href+'?inviteCode='+this.inviteCode)
				var linkurl = webSite+'?shopId='+this.$store.state.shopId
				if(this.$store.state.shopType===0){
					linkurl = linkurl+'&inviteCode='+this.inviteCode; //分享链接
				}
				let desc = this.words[Math.floor(Math.random()*10)]
				console.log('desc',desc)
				var obj = {
				  title: '亿麦周边游',		//分享标题
				  desc: desc || '快来跟我们一起亿麦周边游吧！',						//分享内容
				  linkurl: linkurl,//分享链接
				  img: 'http://img.ymzby.com/10088/1/129603212297633792/co/66f76062-b193-498c-986d-ab97964856a1.png',				//分享内容显示的图片
				}
				wxsdk.getJSSDK(url, obj)
			},
			changTab(index){ // 切换tab 
				this.params.pageNum = 1;
				this.pages = 1;
				let _this=this;
				// #ifdef MP-WEIXIN
					_this = this.$parent;
				// #endif
				if(index===0){
					_this.params.isHot = 0;
					_this.params.qryType = '';
					_this.getSpuByPageFun()
				}else if(index===1){
					_this.params.isHot = '';
					_this.params.qryType = 1;
					_this.getSpuByPageFun()
				}else if(index===2){
					_this.params.isHot = '';
					_this.params.qryType = 2;
					_this.getSpuByPageFun()
				}
			},
			setHeight(){
				console.log('fixtop:',this.fixtop)
				let that = this;
				const query = uni.createSelectorQuery();
				query.select("#fixTop").boundingClientRect();
				query.exec(function(res) {
					console.log('res',res)
					if(res[0].top !=0){
						that.top = res[0].top;
						uni.setStorageSync('fixtop', that.top)
					}
				});
				// #ifdef MP-WEIXIN
				// #endif
			},
			init(){
				this.getSpuByPageFun();
				this.getFirstPageCategorysFun();
				this.getExcellentFun();
				this.queryAdByCodeFun()
				/* this.banner.forEach(item=>{
					item.link = item.link+'?shopId='+this.$store.state.shopId;
				}) */
				if(this.isToken){
					setTimeout(()=>{wxsdk.getPosition()},600)
				}
				// #ifdef H5
					//this.toShare()
				// #endif
			},
			getSpuByPageFun(){
				console.log('this.params.pageNum---',this.params.pageNum)
				console.log('this.params.pageNum===1---',this.params.pageNum===1)
				if(this.params.pageNum===1){
					this.productList = [];
				}
				console.log('this.productList0->',this.productList)
				this.beloading = true;
				this.params.shopId=this.$store.state.shopId;
				getSpuByPage(this.params).then(data=>{
					this.beloading = false;
					console.log('data---',data)
					if(data.data.retCode===0){
						
						let productList = data.data.result.list.map(item=>{
							if(item.name.length>26){
								item.sortName = item.name.substr(0,25)+'...'
							}else{
								item.sortName = item.name
							}
							return item
						});
						console.log('this.productList->',this.productList)
						this.productList = [...this.productList,...productList]
						console.log('this.productList1->',this.productList)
						this.pages = data.data.result.pages;
						this.params.pageNum = data.data.result.pageNum;
						console.log('data.data.result.pageNum',data.data.result.pageNum)
					}
					//this.setHeight();
				}).catch(e=>{
					this.beloading = false;
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.til{
		line-height: 60upx;
		font-size: 32upx;
		font-weight: bold;
	}
	.tag{
		padding:5upx 20upx;
		background-color:$uni-bg-color-grey;
		color:333;
		margin: 5upx;
		border-radius: 30upx;
		&.nowCity{
			color:$uni-color-primary;
		}
	}
	.followBtn{
		border-radius: 10upx;
		padding:10upx 15upx;
		background-color: $uni-color-primary;
		color: #fff;
		margin-left: 10upx;
	}
	.top-tips{
		padding: 20upx 40upx;
		color: #333;
		font-size: 24upx;
		background-color:#fff5f5;
		margin:-20upx 0 20upx;
		text-align: center;
		
	}
	.share-img{
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
		line-height: 60upx;
		font-size: 60upx;
		color: #fff;
		margin:20upx auto;
		display: block;
	}
	.good-box{
		margin:20upx;
		margin-bottom: 0;
		
	}
	.good-til{
		background-color: $uni-color-primary;
		line-height: 80upx;
		color: #fff;
		padding:10upx 20upx 50upx;
		border-radius: 15upx 15upx 0 0;
		.tral-jiantouyou{
			color:#fff;
			font-size: 22upx;
			margin-left: 4upx;
		}
	}
	.good-list{
		margin: 0 10upx;
		margin-top: -45upx;
		overflow: hidden;
		overflow-x:scroll;
		position: relative;
		
		.line-r{
			position: absolute;
			right:0;
			top:0;
			width:1px;
			height:100%;
			box-shadow:rgb(11, 234, 235) 0px 0px 10px;
		}
		
		.good-list-box{
			width:auto;
		}
		
		.good-item{
			background-color: #fff;
			margin:5upx;
			border:1px solid #f1f1f1;
			border-radius: 15upx;
			padding:10upx;
			width:250upx;
			box-sizing:border-box;
			box-shadow: 0 0 5upx #ddd;
			.img{
				width:230upx;
				height:230upx;
			}
			.buy-btn{
				padding:0 30upx;
				background-color:$uni-color-primary;
				color:#fff;
				border-radius: 20upx;
			}
			.buy-btn2{
				padding:0 10upx;
				background-color:$uni-color-primary;
				color:#fff;
				border-radius: 20upx;
			}
		}
	}
	.couponBanner{
		width: 100%;
		height:185upx;
		border-radius:15upx;
		img{
			width:100%;
			height: auto;
			border-radius:15upx;
		}
	}
	.warp{
		background: #fff;
		padding-top: 20upx;
	}
	.fixTop{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		z-index: 2;
		background-color:#fff;
	}
	.search-box{
		height:60upx;
		width:520upx;
		margin:0 30upx 10upx 200upx;
		border-radius:30upx;
		position:relative;
		background-color:$uni-bg-color-grey;
		box-sizing:border-box;
		padding:0 80upx 0 20upx;
		position: relative;
		.city{
			position: absolute;
			top:0;
			left:-180upx;
			width:170upx;
			height: 60upx;
			line-height: 60upx;
			border-radius:30upx;
			background-color:$uni-bg-color-grey;
			text-align: center;
		}
		.input{
			width:100%;
			font-size: 28upx;
			padding:10upx;
			box-sizing: border-box;
			height:60upx;
			color:$uni-text-color-grey;
		}
		.search-btn{
			width:70upx;
			height:60upx;
			line-height: 60upx;
			font-size: 40upx;
			position:absolute;
			top:0;
			right:0;
			color:$uni-text-color;
			text-align: center;
			vertical-align: middle;
		}
	}
	.swiper {
		height: 300upx;
	}
	.swiper-item {
		display: block;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		border-radius:20upx;
		overflow:hidden;
		.img{
			width:100%;
			height:300upx;
			border-radius:20upx;
		}
	}
	.swiper2 {
		height: 750upx;
	}
	.swiper-item2 {
		display: block;
		height: 750upx;
		line-height: 750upx;
		text-align: center;
		border-radius:20upx;
		overflow:hidden;
		.img{
			width:100%;
			height:750upx;
			border-radius:20upx;
		}
	}
	
	.swiper-list {
		margin-top: 40upx;
		margin-bottom: 0;
	}
	page {
		height: auto;
		min-height: 100%;
	}

	.uni-card {
		box-shadow: none;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-list:before {
		height: 0;
	}
</style>
