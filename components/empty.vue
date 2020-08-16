<template>
	<view class="empty-box" :class="'empty-box'+eType">
		<view class="text">{{eText}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			emptyType: {
				type:String,
				default: '1'
			},
			text:{
				type:String,
				default: '暂无数据'
			}
		},
		computed:{
			eType(){
				return this.emptyType;
			},
			eText(){
				return this.text;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty-box{
		width:100%;
		height:340upx;
		box-sizing: border-box;
		padding-top: 220upx;
		.text{
			font-size: 30upx;
			text-align: center;
			color: $uni-text-color-grey;
		}
		&.empty-box1{
			background: url(~@/static/empty1.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box2{
			background: url(~@/static/empty2.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box3{
			background: url(~@/static/empty3.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box4{
			background: url(~@/static/empty4.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box5{
			background: url(~@/static/empty5.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box6{
			background: url(~@/static/empty6.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box7{
			background: url(~@/static/empty7.png) no-repeat center;
			background-size:auto 64upx;
		}
		&.empty-box8{
			background: url(~@/static/empty8.png) no-repeat center;
			background-size:auto 64upx;
		}
	}
</style>
