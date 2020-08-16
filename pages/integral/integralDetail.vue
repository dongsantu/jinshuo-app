<template>
	<view>
		<view class="top-part">
			<view class="text-c pad_t40 font-60 l-h80">￥0.00</view>
		</view>
		<view class="b-c-w">
			<view class="">
				<text class=" menu-1 l-h80">
					积分明细
				</text>
			</view>
			
		</view>
		<empty></empty>
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
		margin-left: 20upx;
		border-left: 1px solid #f60837;
		color:#f60837;
		padding-left: 20upx;
	}
</style>
