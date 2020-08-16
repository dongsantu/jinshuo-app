<template>
	<view>
		<view class="list flex-box f-con-t" v-if="list.length>0">
			<view class="li-item-box" v-for="(item,i) in list" :key="i">
				<navigator :url="'/pages/product/detail?id='+item.spuId+ '&shopId='+$store.state.shopId" class="li-item b-b" >
					<view class="img">
						<image class="img-img" :src="$imgHost+item.pictureUrl"></image>
						<view class="endTime" v-if="item && item.buyEndDate"> {{item.buyEndDate.split(' ')[0]}} 截止
							
						</view>
					</view>
					<view class="content">
						<view class="title f-c-b1">{{item.sortName}}</view>
						<!-- <view class="h20 mrg_tb5">
							<view class="tag tag1" v-if="item.isHot===0"><view class="tralfont tral-huo"></view>超火爆</view>
						</view> -->
						<view class="">
							<view class="discountPrice l-h40">￥{{item.price}}</view>
							<view class="price mrg_l10 f-c-g2 l-h40">￥{{item.marketPrice}}</view>
							<!-- <view class="discount-tag mrg_l10 f-c-warning">{{item.price / item.marketPrice * 10}}折</view> -->
						</view>
						<view class="f-between-c">
							<view class="f-c-g2 address" v-if="item.typeId!='1' && item.activityAddress">
								<view class="tralfont tral-zuobiaofill"></view>
								{{item.activityAddress}}
							</view>
							<view v-else></view>
							<view v-if="item.disMoney" class="buy-btn2 ">赚{{item.disMoney}}元</view>
							<view v-else class="buy-btn" >立即抢购</view>
						</view>
							
					</view>
				</navigator>
			</view>
			
		</view>
		<view v-else>
			<empty v-if="!isload" text="暂时无货，努力补货中~" emptyType="5"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="isload">
			<loading></loading>
		</view>
		
	</view>
</template>

<script>
	import loading from '@/components/loading2.vue'
	export default {
		components:{
			loading
		},
		data(){
			return {
				//isload:false
			}
		},
		props: {
			beloading:{
				type: Boolean
			},
			list: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		computed:{
			isload(){
				console.log('couputed:',this.beloading)
				return this.beloading;
			}
		},
		
		methods:{
			goBook(id){
				uni.navigateTo({
					url: '/pages/product/order?id='+id+'&shopId='+this.$store.state.shopId
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.li-item-box{
		width:49.5%;
		box-sizing: border-box;
	}
	.tral-huo{
		line-height: 40upx;
	}
	.h20{
		height: 40upx;
	}
	.list{
		padding:10upx;
	}
	.li-item{
		
		padding:20upx;
		margin-bottom:30upx;
		position:relative;
		background-color:#fff;
		margin:8upx;
		border-radius: 10upx;
		box-shadow: 0 0 0 1px #f1f1f1;
		.img{
			width:100%;
			height:310upx;
			.img-img{
				width:100%;
				height:310upx;
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
				border-radius: 0 0 15upx 15upx;
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
				margin: 10upx 0;
			}
			.discountPrice{
				display:inline-block;
				font-size: 36upx;
				color:$uni-color-primary;
				font-weight: bold;
				font-family: mFont;
			}
			.price{
				display:inline-block;
				font-size: 24upx;
				text-decoration: line-through;
				font-family: mFont;
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
		background-color:#f9e9ec;
		padding:0 10upx;
		line-height: 26upx;
	}
	.buy-btn{
		padding:8upx 20upx;
		line-height: 50upx;
		display:inline-block;
		background-color:$uni-color-primary;
		color:#fff;
		text-align: center;
		border-radius:36upx;
	}
	.buy-btn2{
		padding:8upx;
		width:150upx;
		box-sizing: border-box;
		line-height: 50upx;
		display:inline-block;
		background-color:$uni-color-primary;
		color:#fff;
		text-align: center;
		border-radius:36upx;
	}
</style>
