<template>
	<view class="bg" @click="hideGift" v-if="showGift">
		<view class="giftBox">
			<view class="list">
				<view class="li-item flex-box" v-for="(item,i) in giftList" :key="i">
					<view class="l f-c-c f-c-w">{{item.price}}元</view>
					<view class="f-c-c f-c-pink flex-item">{{item.name}}</view>
				</view>
			</view>
			<view class="btn f-c-pink">一键领取</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				showGift:true,
				giftList:[
					{
						name:'新会员专享大礼包',
						couponStatus:'0',
						price:100,
						require:200
					},
					{
						name:'新会员专享大礼包',
						couponStatus:'0',
						price:100,
						require:200
					}
				]
			}
		},
		methods:{
			hideGift(){
				this.showGift = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
		background-color: rgba(255,255,255,0.5);
		position: fixed;
		width:100%;
		height: 100%;
		top:0;
		left:0;
		z-index: 99;
	}
	.giftBox{
		margin:120upx auto 0 52upx;
		width:646upx;
		height: 701upx;
		background: url(~@/static/card/bg1.png) no-repeat center;
		background-size: 100%;
		box-sizing: border-box;
		padding: 330upx 0 50upx 0;
	}
	.list{
		height: 184upx;
		overflow: hidden;
		overflow-y: scroll;
	}
	.li-item{
		width:375upx;
		height: 80upx;
		margin: 0 auto 20upx;
		background: url(~@/static/card/bg2.png) no-repeat center;
		background-size: 100%;
		.l{
			width:100upx;
		}
	}
	.btn{
		width:265upx;
		height: 66upx;
		text-align: center;
		background-color:#fdf6ce;
		font-size: 36upx;
		border-radius: 10upx;
		font-weight: bold;
		margin:60upx auto;
	}
</style>
