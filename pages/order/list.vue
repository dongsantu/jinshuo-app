<template>
	<view>
		<view class="fixHead f-between-c">
			<view :class="{act:params.orderStatus===''}" @click="changeAct('')">全部</view>
			<view :class="{act:params.orderStatus==='0'}" @click="changeAct('0')">待付款</view>
			<view :class="{act:params.orderStatus==='1'}" @click="changeAct('1')">已付款</view>
			<view :class="{act:params.orderStatus==='4'}" @click="changeAct('4')">已完成</view>
			<view :class="{act:params.orderStatus==='-4'}" @click="changeAct('-4')">已取消</view>
		</view>
		<view class="h50"></view>
		<view v-if="orderList.length>0">
			<view class="box-shadow box pad10" v-for="(item,i) in orderList" :key="i">	
				<view class="box-title f-between-c">
					<view>订单号：{{item.orderNo}}</view>
					<view v-if="item.orderStatus" :class="'status'+item.orderStatus.value">{{item.orderStatus.displayName}}</view>
				</view>
				<view v-for="(item2,i) in item.goodsOrderDetailList" :key="i" class="item-li">
					<view class="img">
						<image class="img-img" :src="$imgHost+item2.goodsImage"></image>
					</view>
					<view class="content">
						<view class="title f-c-b1">{{item2.goodsName}}</view>
						<view class="f-between-c">
							<view class="discountPrice" v-if="item2.isIntegral !==0">￥{{item2.goodsPrice}}</view>
							<view class="discountPrice" v-else>￥{{item2.integral}}</view>
							<view>×{{item2.number}}</view>
						</view>
					</view>
				</view>
				<view class="f-between-c mrg_t5">
					<view class="f-c-primary sumPrce">合计：￥{{item.orderAmountTotal}}</view>
					<view class="f-r-c">
						<view @click="cancelOrderF(item.id)" v-if="item.orderStatus && item.orderStatus.value===0" class="btn">取消订单</view>
						<navigator :url="'/pages/order/detail?id='+item.id+'&shopId='+$store.state.shopId" class="btn" >订单详情</navigator>
						<navigator v-if="item.orderStatus && item.orderStatus.value===0" :url="'/pages/order/detail?id='+item.id+'&shopId='+$store.state.shopId" class="btn2" >去付款</navigator>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty v-if="!beloading" text="您暂时还没有订单~" emptyType="5"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
	</view>
</template>

<script>
	import loading from '@/components/loading2.vue'
	import footerMenu from '@/components/footer'
	import {queryOrderList,cancelOrder} from '@/http/product.js'
	export default {
		data(){
			return {
				beloading:false,
				pages:1,
				topAct:'0',
				params:{
				    "orderStatus": '',
				    "pageNum": 1,
				    "pageSize": 10
				},
				orderList:[]
			}
		},
		components: {
			footerMenu,
			loading
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
			cancelOrderFun(id){
				cancelOrder({id}).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '取消成功',
							duration: 2000,
							icon:'none'
						});
						this.queryOrderListFun();
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
			cancelOrderF(id){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确定取消订单',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.cancelOrderFun(id);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			init(){
				if(this.isToken){
					this.queryOrderListFun();
				}
				
			},
			queryOrderListFun(){
				this.beloading = true;
				//this.orderList = [];
				if(this.params.pageNum===1){
					this.orderList = [];
				}
				queryOrderList(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode ===0){
						console.log('list-->',data.data.result)
						this.pages = data.data.result.pages;
						this.params.pageNum = data.data.result.pageNum;
						let orderList = data.data.result.list;
						this.orderList = [...this.orderList,...orderList]
					}
				}).catch(e=>{
						this.beloading = false;
				})
			},
			changeAct(val){
				this.params.pageNum = 1;
				this.params.orderStatus = val;
				this.queryOrderListFun();
			}
		},
		onLoad(params){
			/* if(params.status){
				this.params.orderStatus = params.status;
			}else{
				this.params.orderStatus =''
			}
			this.init(); */
		},
		onShow(){
			if(this.$root.$mp.query.status){
				this.params.orderStatus = this.$root.$mp.query.status;
			}else{
				this.params.orderStatus =''
			}
			this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum +=1;
			if(this.pages>=this.params.pageNum){
				this.queryOrderListFun();
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
		.act{
			color: $uni-color-primary;
		}
	}
	.btn{
		border: 1px solid #ccc;
		border-radius: 10upx;
		padding: 10upx 18upx;
		margin-left: 15upx;
	}
	.btn2{
		border-radius: 10upx;
		padding: 11upx 18upx;
		margin-left: 15upx;
		background-color: $uni-color-primary;
		color:#fff;
	}
	.status0{
		color:#fe8636;
	}
	.status1{
		color:#fe8636;
	}
	.status2{
		color:#47b0fb;
	}
	.status3{
		color:#61e9a3;
	}
	.status4{
		color:#ccc;
	}
	.status-1{
		color:#ccc;
	}
	.status-2{
		color:#ccc;
	}
	.status-3{
		color:#ccc;
	}
	.status-4{
		color:#ccc;
	}
	.status-5{
		color:#ccc;
	}
	.item-li{
		padding-left:200upx;
		padding-bottom: 10upx;
		padding-top:20upx;
		margin-bottom:10upx;
		position:relative;
		background-color:#fff;
		.img{
			width:180upx;
			height:180upx;
			position:absolute;
			top: 20upx;
			left: 0;
			.img-img{
				width:180upx;
				height:180upx;
				border-radius: 15upx;
			}
		}
		.content{
			.title{
				font-weight: bold;
				font-size: 32upx;
				line-height: 40upx;
				height: 120upx;
				overflow: hidden;
			}
			.discountPrice{
				display:inline-block;
				font-size: 36upx;
				color:$uni-color-primary;
				font-weight: bold;
				font-family: mFont;
			}
		}
	}
	.sumPrce{
		font-family: mFont;
	}
</style>
