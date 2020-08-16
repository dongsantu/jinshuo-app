<template>
	<view class="b-c-w">
		<view class="list" v-if="list.length>0">
			<navigator :url="'/pages/product/detail?id='+item.spuId+'&shopId='+$store.state.shopId" class="li-item b-b" v-for="(item,i) in list" :key="i">
				<view class="img">
					<image class="img-img" :src="$imgHost+item.pictureUrl"></image>
					
				</view>
				<view class="content">
					<view class="title f-c-b1">{{item.name}}</view>
					<view class="h30">
						
					</view>
					<view class="">
						<view class="discountPrice">￥{{item.price}}</view>
						<view class="price mrg_l10 f-c-g2">￥{{item.marketPrice}}</view>
						<!-- <view class="discount-tag mrg_l10 f-c-warning">{{item.price / item.marketPrice * 10}}折</view> -->
					</view>
					<view class="f-between-c">
						<view class="cancel-btn mrg_r10" @click.stop="delCollectFun(item.spuId)">取消收藏</view>
						<view class="buy-btn mrg_r10" @click.stop="goBook(item.spuId)">立即抢购</view>
					</view>
						
				</view>
			</navigator> 
		</view>
		<view v-else>
			<empty v-if="!beloading" text="您还没有收藏记录~" emptyType="2"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {getCollectList, delCollect} from '@/http/product.js';
	import loading from '@/components/loading2.vue'
	export default {
		data(){
			return {
				beloading:false,
				list:[],
				pages:1, // 总页数
				params:{
					"memId":111,
					"pageNum": 1,
					"pageSize": 10
				},
			}
		},
		components: {
			loading
		},
		onLoad(params){
			//this.init();
		},
		onShow(){
			this.init();
		},
		onReachBottom(){
			//加载下一页
			if(!this.isOver){
				this.params.pageNum += 1;
				this.getCollectListFun();
			}
		},
		computed:{
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
			init(){
				if(this.isToken){
					this.getCollectListFun();
				}
			},
			delCollectFun(id){
				let _this =this;
				uni.showModal({
					title: '确认框',
					content: '确认取消收藏吗?',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							delCollect({id}).then(data=>{
								if(data.data.retCode===0){
									_this.getCollectListFun();
								}else{
									uni.showToast({
										title: data.data.retMsg,
										duration: 2000
									});
								}
							}).catch()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			getCollectListFun(){
				this.beloading = true;
				if(this.params.pageNum===1){
					this.list = [];
				}
				getCollectList().then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						if(data.data.result.list){
							let list = data.data.result.list;
							this.list = [...this.list,...list]
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
				border-radius: 15upx 0 0 15upx;
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
				line-height: 40upx;
				height: 80upx;
			}
			.discountPrice{
				display:inline-block;
				font-size: 36upx;
				color:$uni-color-primary;
				font-weight: bold;
			}
			.price{
				display:inline-block;
				font-size: 24upx;
				text-decoration: line-through;
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
	.cancel-btn{
		padding:0 25upx;
		line-height: 50upx;
		display:inline-block;
		background-color:$uni-text-color-grey;
		color:#fff;
		text-align: center;
		border-radius:8upx;
	}
</style>
