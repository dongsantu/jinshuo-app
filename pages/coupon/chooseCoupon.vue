<template>
	<view>
		<view v-if="couponList.length>0">
			<view class="list-item f-between-c" :class="'status'+item.couponStatus" v-for="(item,i) in couponList" :key="i">
				<view class="l f-c-c f-con-c f-m">
					<view class="f-c-b">
						<view class="lh40 f-c-g2">￥</view>
						<view class="font-60 lh60">{{item.couponAmount}}</view>
					</view>
					<view class="font-24" v-if="item.type===1">现金券</view>
					<view class="font-24" v-if="item.type===2"><text v-if="item.amount==0">无门槛</text><text v-else>满 {{item.amount}}元可用</text></view>
					<view class="font-24" v-if="item.type===3">折扣券</view>
				</view>
				<view class="c f-l-c f-con-c ">
					<view class="font-32 w-f">{{item.name}}</view>
					<view class="font-20 w-f" v-if="item.validitType===2">{{item.validityStartDate.split(' ')[0]}}~{{item.vaildityEndDate.split(' ')[0]}}</view>
					<view class="font-20 w-f" v-else>有效天数{{item.vaildityDays}}</view>
					<navigator :url="'/pages/coupon/couponDetail?id='+item.id+'&shopId='+$store.state.shopId" class="font-20 w-f">详细说明<view class="tralfont tral-tishi mrg_l5 font-20"></view></navigator>
				</view>
				<view class="r f-c-c f-con-c" :class="{checked:item.id===checkObj.id}" @click="checkFun(item)">
					
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
			<view class="go-btn" @click="gotoOrder">确定</view>
		</view>
	</view>
</template>

<script>
	import {getMyCouponByTargetId} from '@/http/product';
	import loading from '@/components/loading2.vue'
	export default {
		components: {
			loading
		},
		data(){
			return {
				beloading:false,
				targetId:'',
				cartItemIds:'',
				checkObj:'',
				pages:1,
				params:{
					//"count":1,
					//"useStatus":0,
					"targetCmds":[],
					"pageNum": 1,
					"pageSize": 10,
					//"targetId":''
				},
				couponList:[
					/* {
						name:'优惠券名称',
						couponStatus:'0',
						price:50,
						require:200
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
			gotoOrder(){
				if(!this.checkObj){
					if(this.targetId){
						uni.redirectTo({
						    url: "/pages/product/order?id="+this.targetId+'&shopId='+this.$store.state.shopId
						});
					}else{
						uni.redirectTo({
						    url: "/pages/product/order?cartItemIds="+this.cartItemIds+'&shopId='+this.$store.state.shopId
						});
					}
				}else{
					if(this.targetId){
						uni.navigateTo({
						    url: "/pages/product/order?id="+this.targetId +"&couponReceiveId="+this.checkObj.id + '&couponAmount='+this.checkObj.couponAmount+'&shopId='+this.$store.state.shopId
						});
					}else{
						uni.navigateTo({
						    url: "/pages/product/order?cartItemIds="+this.cartItemIds +"&couponReceiveId="+this.checkObj.id + '&couponAmount='+this.checkObj.couponAmount+'&shopId='+this.$store.state.shopId
						});
					}
				}
				
			},
			checkFun(item){
				item.checked = true;
				this.checkObj = item;
				this.filterItem();
			},
			filterItem(){
				let id = this.checkObj.id;
				this.couponList.forEach(item=>{
					if(item.id !== id){
						item.checked = false;
					}
				})
			},
			init(){
				if(this.isToken){
					this.getMyCouponByTargetIdFun()
				}
			},
			getMyCouponByTargetIdFun(){
				this.beloading = true;
				if(this.params.pageNum===1){
					this.couponList = [];
				}
				getMyCouponByTargetId(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						let couponList = data.data.result.list.map(item=>{
							item.checked=false
							return item;
						});
						this.couponList = [...this.couponList,...couponList]
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
		onLoad(params){
			/* if(params.targetId){
				this.params.targetId=params.targetId;
			}
			if(params.count){
				this.params.count=params.count;
			} */
			/* if(params.targetId){
				this.targetId=params.targetId;
			}
			if(params.qry){
				this.params.targetCmds=JSON.parse(params.qry);
			}
			this.init(); */
		},
		onShow(){
			/* if(this.$root.$mp.query.targetId){
				this.params.targetId=this.$root.$mp.query.targetId;
			}
			if(this.$root.$mp.query.targetId){
				this.params.targetId=this.$root.$mp.query.targetId;
			} */
			if(this.$root.$mp.query.targetId){
				this.targetId=this.$root.$mp.query.targetId;
			}
			if(this.$root.$mp.query.cartItemIds){
				this.cartItemIds=this.$root.$mp.query.cartItemIds;
			}
			if(this.$root.$mp.query.qry){
				this.params.targetCmds= JSON.parse(this.$root.$mp.query.qry);
			}
			this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum +=1;
			if(this.pages>=this.params.pageNum){
				this.getMyCouponByTargetIdFun();
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
		background-image:url(~@/static/card/bg6.png);
		
		
		.l{
			width:210upx;
			height:189upx;
			color: $uni-color-primary;
		}
		.r{
			width:106upx;
			height:189upx;
			color: #fff;
			background: url(~@/static/card/gou2.png) no-repeat center;
			background-size: 55upx;
			&.checked{
				background: url(~@/static/card/gou1.png) no-repeat center;
				background-size: 55upx;
			}
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
