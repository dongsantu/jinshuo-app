<template>
	<view>
		<view class="top-part">
			<navigator url="/pages/integral/integralDesc" class="interal-desc">积分说明</navigator>
			<view class="pad_t30 text-c">
				<text class="canuse-text">可用积分</text>
			</view>
			<view class="text-c font-60 l-h80">0</view>
		</view>
		<view class="flex-box b-c-w">
			<navigator url="/pages/integral/integralDetail" class="text-c flex-item">
				<text class=" menu-1 l-h80">
					积分明细
				</text>
			</navigator>
			<view class="text-c flex-item">
				<text class=" menu-2 l-h80">
					兑换记录
				</text>
			</view>
			
		</view>
		<empty text="暂无积分产品" emptyType="5"></empty>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-part{
		width:100%;
		height:240upx;
		background:url(/static/interal_banner.png) no-repeat center;
		background-size: 100%;
		position: relative;
		color:#fff;
		.interal-desc{
			padding:2upx 30upx;
			border:1px solid #fff;
			padding-left:50upx;
			background: url(~@/static/interal_icon4.png) no-repeat 15upx center;
			background-size: 23upx;
			position:absolute;
			top:20upx;
			right:20upx;
			border-radius: 30upx;
		}
		.canuse-text{
			padding-left:60upx;
			background: url(~@/static/interal_icon1.png) no-repeat 15upx center;
			background-size: 36upx;
		}
	}
	.menu-1{
		height: 80upx;
		padding-left:70upx;
		background: url(~@/static/interal_icon2.png) no-repeat 15upx center;
		background-size: 44upx;
		display: inline-block;
		color:#f60837;
	}
	.menu-2{
		height: 80upx;
		padding-left:70upx;
		background: url(~@/static/interal_icon3.png) no-repeat 15upx center;
		background-size: 44upx;
		display: inline-block;
		color:#f60837;
	}
</style>
