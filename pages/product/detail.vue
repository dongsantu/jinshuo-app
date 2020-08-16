<template>
	<scroll-view v-if="product" :scroll-into-view="intoView" :style="{'height':winHeight+'px'}" :scroll-top="0" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
                @scroll="scroll">
	
	<view class="fixHead f-between-c" v-if="showFixHead">
		<view :class="{act:topAct==='prod'}" @click="scrollToId('prod')">商品</view>
		<view :class="{act:topAct==='instruction'}" @click="scrollToId('instruction')">须知</view>
		<view :class="{act:topAct==='desc'}" @click="scrollToId('desc')">详情</view>
	</view>
	<view v-if="!isFans" class="top-tips" @click="showTopTips">关注亿麦周边游公众号，每月不定期<text class="f-b">送优惠券</text>哦！<text class="f-b followBtn">点击关注</text></view>
	<view>
		<view class="pro-img" id="prod">
			<!-- <image class="img" :src="$imgHost+product.pictureUrl" /> -->
			
			<view class="page-section swiper" v-if="product">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,i) in product.urls" :key="i">
							<view class="swiper-item">
								<image class="img" :src="$imgHost+item"/>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
		</view>
		<view class="pro-til f-between-c">
			<view class="flex-box">
				<view class="discountPrice" v-if="checkSkuObj">￥{{checkSkuObj.price}}</view>
				<view class="price mrg_l10" v-if="checkSkuObj">￥{{checkSkuObj.marketPrice}}</view>
			</view>
			<view v-if="product.spuOtherDto && product.spuOtherDto.isScareBuy===0">
				<view class="text-r mrg_r5">距结束还剩</view>
				<view class="f-c-w">
					<uni-countdown v-if="endTime.d || endTime.h || endTime.m|| endTime.s"
						color="#f60837" 
						background-color="#ffffff" 
						border-color="#ffffff" 
						splitorColor="#ffffff"
						:day="endTime.d" 
						:hour="endTime.h" 
						:minute="endTime.m" 
						:second="endTime.s">
					</uni-countdown>
				</view>
			</view>
			<view v-else></view>
		</view>
		<view class="pro-name pad10 b-c-w" v-if="product.name">
			<view>{{product.name}}</view>
			<view class="oth">
				<view class="oth-box" @click="showMenu"><image class="share-btn" src="/static/share-btn.png"></image><view class="lh-24">分享</view></view>
				<view class="f-c-primary l-h60 money" v-if="checkSkuObj.disMoney">赚:{{checkSkuObj.disMoney}}元</view>
			</view>
		</view>
		<view class="pad_lr10 pad_b10 b-c-w" v-if="product.tagDto">
			<uni-tag v-for="(item,i) in product.tagDto" :key="i" :text="item.tagName" inverted size="small" type="warning" circle></uni-tag>
			
		</view>
		<view class="b-c-w pad_lr10 pad_b10">
			<view class="f-between-c">
				<view>已购买 {{product.virtualSales}} 人</view>
				<view>还剩 {{product.stock}} {{product.unit}}</view>
			</view>
			<view class="p-line">
				<view class="b-c-primary h5" :style="per"></view>
			</view>
		</view>
		<view class="d-box" v-if="couponList && couponList.length>0">
			<view class="flex-box pad_tb5 couponBox" @click="showMenu3">
				<view class="couponLab w90">领券：</view>
				<view class="couponListBoxIns">
					<view class=" couponsList">
						<uni-tag v-for="(item,i) in couponList" :key="i" :text="item.name" inverted size="small" type="error" ></uni-tag>
					</view>
				</view>
				<view class="right-icon tralfont tral-jiantouyou font-22"></view>
			</view>
		</view>
		<view class="d-box" v-if="product && product.spuOtherDto">
			<view class="pad_tb10 b-b" v-if="product.spuOtherDto.activityAddress">
				<view class="tralfont tral-zuobiao font-36 mrg_r10"></view>
				活动地址： {{product.spuOtherDto.activityAddress}}
			</view>
			<view class="pad_tb10" v-if="product.spuOtherDto.activityDate">
				<view class="tralfont tral-shijianzhongbiao font-36 mrg_r10"></view>
				活动时间： {{product.spuOtherDto.activityDate}}
			</view>
		</view>
		<view class="d-box pad_lr10" v-if="product.skus && product.skus.length>1">
			<view class="d-til">
				可选规格
			</view>
			<view class="pad10">
				<view class="pad5 skuItem f-between-c" :class="{checked:item.id ===checkSkuObj.id}" v-for="(item,i) in product.skus" :key="i" @click="changeSku(item)">
				<text>{{item.name}}</text>
				<text>￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="d-box" id="instruction">
			<view class="d-til">
				抢购说明
			</view>
			<view v-if="product.spuDescDto">
				<rich-text v-if="product.spuDescDto.bookingNotes" :nodes="product.spuDescDto.bookingNotes"></rich-text>
			</view>
		</view>
		<view class="d-box" id="desc">
			<view class="d-til">
				产品详情
			</view>
			<view class="detail" v-if="product.spuDescDto">
				<rich-text v-if="product.spuDescDto.mobileDesc" :nodes="product.spuDescDto.mobileDesc"></rich-text>
			</view>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<book-foot :collect="switchCollect" :isCollect="isCollect" :goBuy="goBuy" :activeStatus="activeStatus"></book-foot>
		</view>
		
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
	<uni-popup ref="popup3" type="bottom" :maskClickCallback="hideMenu3">
		<view class="tralfont tral-guanbi2 close" @click="hideMenu3"></view>
		<view class="coupons-ul">
			<view class="l-h80 text-c font-36 f-b">优惠券</view>
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
					<view class="pad-lr46 c-g3 pad_tb20 text-l">
						<view v-if="item.validitType===1">有效日期：从领取之日起{{item.vaildityDays}}日内有效</view>
						<view v-else>有效日期：<text v-if="item.validityStartDate">{{item.validityStartDate.split(' ')[0]}}~{{item.vaildityEndDate.split(' ')[0]}}</text></view>
						<view>可用范围：{{item.scopeType===1 ? '全场通用' : '部分商品可用'}}</view>
					</view>
				</view>
			</view>
		</view>
		
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
	<v-loading></v-loading>
	</scroll-view>
</template>

<script>
	import yimailogo from '@/static/yimailogo.png'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {createQrcode} from '@/http/user'
	import Loading from '@/components/_loading';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import bookFoot from "@/components/book-foot.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"
	import {getSpuInfoBySpuId,addCollect,getIfCollect,delCollect,getCoupons, shortUrl,receiveCoupon} from "@/http/product.js"
	import {createShareProduct,createSharePic} from '@/http/commission.js'
	import {dateUtils} from "@/common/util.js"
	import wxsdk from '@/common/wxsdk'
	//import {webSite} from '@/http/config'
	let webSite = window.location.origin;
	export default {
		components: {uniCountdown, uniTag, bookFoot,uniPopup,'v-loading':Loading,tkiQrcode},
		data(){
			return {
				followUrl:'',
				yimaiIcon: yimailogo,
				params:{
					"useStatus":0,
					"pageNum": 1,
					"pageSize": 20,
					"id":''
				},
				couponList:[],
				beloading:false,
				shareQrcode:'',
				shareText:'',
				checkSkuObj:'',
				ifShare:false,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				endTime:{
					d:0,
					h:0,
					m:0,
					s:0
				},
				showFixHead:false,
				product:{
					id:''
				},
				isCollect: false, //是否收藏
				winHeight:320,
				intoView:'',
				topAct:'prod',
				prodTop:0,
				intructionTop:0,
				descTop:0
			}
		},
		computed:{
			isFans(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
					if(this.$store.state.login.user.member.isFans===1){
						return true;
					}
				}
				return false;
			},
			inviteCode(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.userAccount){
					return this.$store.state.login.user.userAccount.inviteCode
				}
				return ''
			},
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
			per(){
				let obj={}
				if(this.product.virtualSales && this.product.stock){
					/* console.log('www',this.product.virtualSales)
					console.log('www', Number(this.product.virtualSales) +Number(this.product.stock))
					console.log('www',(this.product.virtualSales / ( Number(this.product.virtualSales) +Number(this.product.stock)))) */
					obj.width = (this.product.virtualSales / ( Number(this.product.virtualSales) +Number(this.product.stock)) * 100)+'%'
				}else{
					obj.width = 0
				}
				return obj
			},
			activeStatus(){
				let nowD = new Date()
				let nowDStr = nowD.getTime()
				let status = 2;
				if(this.product.spuOtherDto && this.product.spuOtherDto.buyStartDate && this.product.spuOtherDto.buyEndDate){
					let buyStartDate = new Date(Date.parse(this.product.spuOtherDto.buyStartDate.replace(/-/g,   "/")))
					let buyEndDate = new Date(Date.parse(this.product.spuOtherDto.buyEndDate.replace(/-/g,   "/")))
					if(nowDStr<buyStartDate){
						status = 1 //未开始
					}else if(nowDStr>buyEndDate){
						status = 3 //已结束
					}else{
						status = 2 //进行中
					}
				}
				if(!this.product.stock || this.product.stock<=0){
					status = 4 //已售罄
				}
				return status;
			}
		},
		methods:{
			qrR(e){
				console.log('qrC:',e)
			},
			createQrcodeFun(){
				console.log('createQrcodeFun')
				this.followUrl = '';
				var url = window.location.origin+'/#/pages/product/detail?id='+this.product.id
				var linkurl = url+'&shopId='+this.$store.state.shopId
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
			shortUrlFun(){
				var url = webSite+'/#/pages/product/detail?id='+this.product.id+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					url = url+'&inviteCode='+this.inviteCode; //分享链接
				}
				shortUrl({url}).then(data=>{
					if(data.data.success){
						this.shareText = this.product.name +' '+ data.data.shortUrl
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
			getCouponsFun(){
				this.params.id = this.product.id;
				this.beloading = true;
				this.couponList =[];
				getCoupons(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						this.couponList = data.data.result.list;
						this.pages= data.data.result.pages;
					}else{
						/* uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						}); */
					}
				}).catch(e=>{
					this.beloading = false;
					/* uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					}); */
				})
			},
			showShareWX(){
				this.toShare()
				this.$refs.popup2.open();
			},
			hideShareWX(){
				this.$refs.popup2.close();
			},
			createSharePicFun(item){ //生成推广产品二维码
				var shareUrl = webSite+'/#/pages/product/detail?id='+this.product.id+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					shareUrl = shareUrl+'&inviteCode='+this.inviteCode; //分享链接
				}
				let params={
					"inviteCode":this.inviteCode,
					"headImgUrl": this.avatar,
					 "productId": item.id,
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
				var shareUrl = webSite+'/#/pages/product/detail?id='+this.product.id+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					shareUrl = shareUrl+'&inviteCode='+this.inviteCode; //分享链接
				}
				let params={
					"headImgUrl": this.avatar,
					 "productId": item.id,
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
			showCode1(){
				//this.createSharePicFun(this.product)
				this.shortUrlFun()
				this.$refs.popup4.open();
			},
			showCode2(){
				this.createShareProductFun(this.product)
				this.$refs.popup1.open();
			},
			showMenu(item){
				//this.nowObj = item;
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
			showMenu3(){
				this.$refs.popup3.open();
			},
			hideMenu3(){
				this.$refs.popup3.close();
			},
			changeSku(item){
				this.checkSkuObj = item;
				//this.order.goodsOrderDetailCmdList = JSON.parse(JSON.stringify(this.order.goodsOrderDetailCmdList))
			},
			getIfCollectFun(){
				getIfCollect({targetId:this.product.id,type:1}).then(data=>{
					if(data.data.retCode ===0){
						this.isCollect = data.data.result ===0;
					}else{
						this.isCollect = false;
					}
				}).catch(e=>{
					this.isCollect = false;
				});
			},
			delCollectFun(id){
				delCollect({id}).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '已取消收藏',
							duration: 2000,
							icon:'none'
						});
					}
				}).catch()
			},
			addCollectFun(id){
				addCollect({targetId:id,type:1}).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '收藏成功',
							duration: 2000,
							icon:'none'
						});
					}else{
						
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				});
			},
			getSpuInfoBySpuIdFun(){
				console.log('this.product',this.product)
				getSpuInfoBySpuId({id:this.product.id}).then(data=>{
					if(data.data.retCode ===0){
						this.product = data.data.result;
						if(this.product.spuOtherDto && this.product.spuOtherDto.buyEndDate && this.product.spuOtherDto.buyStartDate){
							
							this.endTime =dateUtils.getTimeF(this.product.spuOtherDto.buyEndDate);
							console.log('this.endTime',this.endTime);
						}
						//针对小程序对详情的富文本标签转换
						
						if(this.product.spuDescDto && this.product.spuDescDto.mobileDesc){
							this.product.spuDescDto.mobileDesc = this.product.spuDescDto.mobileDesc.replace(/<img/g, '<img style="max-width:100%;"').replace(/<section/g,'<div').replace(/<\/section/g,'</div').replace(/&quot;/g,"'");
							//console.log('this.product.spuDescDto.mobileDesc',this.product.spuDescDto.mobileDesc)
						}
						if(this.product.spuDescDto && this.product.spuDescDto.bookingNotes){
							this.product.spuDescDto.bookingNotes = this.product.spuDescDto.bookingNotes.replace(/<img/g, '<img style="max-width:100%;"').replace(/<section/g,'<div').replace(/<\/section/g,'</div').replace(/&quot;/g,"'");
						}
						this.checkSkuObj = this.product.skus[0]
						
						//console.log('this.product.spuDescDto.mobileDesc',this.product.spuDescDto.mobileDesc)
						// #ifdef H5
							this.toShare()
						// #endif
						// #ifdef MP-WEIXIN
						// #endif
					}
					this.setHeight();
				}).catch()
			},
			goBuy(){
				let _this=this;
				// #ifdef MP-WEIXIN
					_this = this.$parent;
				// #endif
				let url = '/pages/product/order?id='+_this.product.id+'&shopId='+this.$store.state.shopId;
				if(this.product.skus && this.product.skus.length>1 && this.checkSkuObj){
					url = url +'&skuId='+ this.checkSkuObj.id+'&skuPrice='+ this.checkSkuObj.price
				}
				uni.navigateTo({
					url: url
				});
			},
			switchCollect(val){ //收藏回调
				let _this=this;
				// #ifdef MP-WEIXIN
					_this = this.$parent;
				// #endif
				_this.isCollect = val;
				if(_this.isCollect){
					_this.addCollectFun(_this.product.id)
				}else{
					_this.delCollectFun(_this.product.id)
				}
			},
			scrollToId(val){
				this.intoView = val;
			},
			scrollTopF(){
				return 0;
			},
			upper(){ // 滚到顶
			},
			lower(){ // 滚到底
			},
			scroll(e){
				//console.log('e',e)
				if(e.detail.scrollTop>150){
					this.showFixHead = true;
				}else{
					this.showFixHead = false;
				}
				if(this.descTop && e.detail.scrollTop>=this.descTop){
					this.topAct = 'desc';
				}else if(this.instructionTop && e.detail.scrollTop>=this.instructionTop){
					this.topAct = 'instruction';
				}else{
					this.topAct = 'prod';
				}
			},
			setHeight(){
				
				let that = this;
				const query = uni.createSelectorQuery();
				query.select("#prod").boundingClientRect();
				query.exec(function(res) {
					//console.log('res',res)
				  that.prodTop = res[0].top;
				});
				query.select("#instruction").boundingClientRect();
				query.exec(function(res) {
					//console.log('res',res)
				  that.instructionTop = res[1].top-30;
				});
				query.select("#desc").boundingClientRect();
				query.exec(function(res) {
					//console.log('res',res)
				  that.descTop = res[2].top-30;
				});
				/* console.log('that.prodTop',that.prodTop)
				console.log('that.instructionTop',that.instructionTop)
				console.log('that.descTop',that.descTop) */
				// #ifdef MP-WEIXIN
				// #endif
			},
			init(){
				this.getSpuInfoBySpuIdFun();
				this.getIfCollectFun();
				this.getCouponsFun();
				uni.removeStorageSync('order');
			},
			toShare(){
				console.log('img',this.$imgHost+this.product.pictureUrl)
				var url = window.location.href.split('#')[0]
				var linkurl = webSite+'/#/pages/product/detail?id='+this.product.id+'&shopId='+this.$store.state.shopId;
				if(this.$store.state.shopType===0){
					linkurl = linkurl+'&inviteCode='+this.inviteCode; //分享链接
				}
				var obj = {
				  title: this.product.name,		//分享标题
				  desc: this.product.sketch,						//分享内容
				  linkurl: linkurl,//分享链接
				  img: this.$imgHost+this.product.pictureUrl,				//分享内容显示的图片
				}
				wxsdk.getJSSDK(url, obj)
			}
		},
		onShow(){
			console.log('show参数2',this.$root.$mp.query)
			if(this.$root.$mp.query.id){
				this.product.id=this.$root.$mp.query.id;
			}
			console.log('jinlai',this.product)
			this.init();
		},
		onLoad(params){
			/* console.log('参数1',params)
			if(params.id){
				this.product.id=params.id;
			}
			this.init(); */
			
		},
		onReady(){
			let _this = this;
			uni.getSystemInfo({
				success(e) {
					_this.winHeight = e.windowHeight;
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
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
		margin:0;
		text-align: center;
		
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
	.coupons-ul{
		width:100%;
		margin:0 auto;
		padding:10upx 0;
		border-radius: 10upx;
		background-color: #fff;
	}
	.w90{
		width:90upx;
	}
	.couponBox{
		position: relative;
		padding-right: 50upx;
		padding-left: 90upx;
		box-sizing: border-box;
		
		.right-icon{
			position: absolute;
			right: 0;
			top:10upx;
			background-color: #fff;
		}
		.couponLab{
			position: absolute;
			left: 0;
			top:10upx;
			background-color: #fff;
		}
	}
	.couponListBoxIns{
		width:100%;
		overflow: hidden;
		overflow-x:scroll;
	}
	.couponsList{
		white-space: nowrap;
		width:auto;
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
		line-height: 60upx;
		font-size: 60upx;
		color: #fff;
		margin:0 auto 20upx;
		display: block;
	}
	.lh-24{
		line-height: 24upx;
	}
	.lh-30{
		line-height: 30upx;
	}
	.share-btn{
		width: 50upx;
		height: 50upx;
		line-height: 52upx;
	}
	.skuItem{
		//display: inline-block;
		background-color: #f1f1f1;
		line-height: 60upx;
		padding:0 30upx;
		border-radius: 10upx;
		margin-bottom:10upx;
		border:1px solid #f1f1f1;
		&.checked{
			border:1px solid $uni-color-primary;
			color:$uni-color-primary;
			background-color: #f9e9ec;
		}
	}
	.p-line{
		margin-top: 10upx;
		width:100%;
		height: 6upx;
		background-color: #ccc;
	}
	.h5{
		height: 6upx;
		border-radius: 3upx;
	}
	.fixHead{
		width:100%;
		height: 80upx;
		line-height: 80upx;
		background-color: #fff;
		position: fixed;
		z-index: 3;
		border-bottom: 1px solid #ccc;
		padding:0 60upx;
		box-sizing: border-box;
		.act{
			color: $uni-color-primary;
		}
	}
	.detail{
		image{
			width:100%;
		}
		img{
			max-width:100%;
		}
	}
	.d-box{
		border-top: 10upx solid #f5f5f5;
		padding: 0 20upx;
		box-sizing: border-box;
		background-color:#fff;
		.d-til{
			font-size: 36upx;
			font-weight: bold;
			line-height: 80upx;
			margin-bottom: 10upx;
		}
	}
	.pro-img{
		width:750upx;
		height:500upx;
		/* .img{
			width:100%;
			height:100%;
		} */
	}
	.pro-til{
		height: 120upx;
		background-color:$uni-color-primary;
		color:#fff;
		box-sizing: border-box;
		padding: 0 30upx;
		.discountPrice{
			font-size: 44upx;
			font-weight: bold;
		}
		.price{
			font-size: 26upx;
			line-height: 84upx;
			text-decoration: line-through;
		}
	}
	.pro-name{
		font-size: 36upx;
		font-weight: bold;
		line-height: 44upx;
		position: relative;
		padding-right: 150upx;
		min-height: 132upx;
		.oth{
			font-weight: normal;
			width:170upx;
			position: absolute;
			right: 0;
			top:20upx;
			font-size: 22upx;
			line-height: 24upx;
			color: #999;
			text-align: center;
			.oth-box{
				margin-left: 45upx;
				margin-right: 20upx;
				/* background-color: #fbf1f3;
				border-radius: 10upx; */
				
			}
			.money{
				background-color: #fff1f1;
				margin-top: 18upx;
				line-height: 46upx;
				border-radius: 30upx 0 0 30upx;
			}
		}
	}
	.act-li{
		border-bottom: 1px solid #ccc;
		line-height: 60upx;
	}
	.swiper {
		height: 500upx;
	}
	.swiper-item {
		display: block;
		width:750upx;
		height:500upx;
		line-height: 500upx;
		text-align: center;
		overflow:hidden;
		.img{
			width:100%;
			height:500upx;
		}
	}
	
	.swiper-list {
		margin-top: 40upx;
		margin-bottom: 0;
	}
</style>
