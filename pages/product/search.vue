<template>
	<view class="">
		<view class="b-c-w pad_tb15 b-b">
			<view class="search-box ">
				<input class="input" v-model="keyword"></input>
				<view class="search-btn tralfont tral-sousuo" @click="gotoSearch"></view>
			</view>
		</view>
		
		<view class=" pad_lr15 pad_tb10 b-c-w mrg_b10">
			<view class="til mrg_b5">热门搜索</view>
			<view class="flex-box mrg_b5">
				<view class="tag" @click="clickFun('门票')">门票</view>
				<view class="tag" @click="clickFun('酒店')">酒店</view>
			</view>
			
		</view>
		<view class=" pad_lr15 pad_tb10 b-c-w mrg_b10">
			
			<view class="til mrg_b5">搜索历史</view>
			<view class="flex-box mrg_b5">
				<view class="tag" v-for="(item,i) in history" :key="i" @click="clickFun(item)">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				keyword:'',
				history:[]
			}
		},
		onLoad(){
			this.init()
		},
		onShow(){
			this.init()
		},
		methods:{
			init(){
				this.keyword = ''
				let history = uni.getStorageSync('history');
				if(history){
					this.history = JSON.parse(history)
				}else{
					this.history = []
				}
			},
			clickFun(keyword){
				this.keyword = keyword;
				this.gotoSearch()
			},
			gotoSearch(){
				if(!this.keyword || this.keyword===''){
					uni.showToast({
						title: '请先输入搜索产品名',
						duration: 2000,
						icon:'none'
					});
					return;
				}
				if(this.history.indexOf(this.keyword)==-1){
					this.history.push(this.keyword)
					if(this.history.length>5){
						this.history.splice(0,1)
					}
					uni.setStorageSync('history', JSON.stringify(this.history));
				}
				
				uni.navigateTo({
					url:'/pages/product/searchList?keyword='+this.keyword+'&shopId='+this.$store.state.shopId
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
	}
	.warp{
		padding-top: 20upx;
	}
	.search-box{
		height:60upx;
		width:690upx;
		margin:0 30upx;
		border-radius:30upx;
		position:relative;
		background-color:$uni-bg-color-grey;
		box-sizing:border-box;
		padding:0 80upx 0 20upx;
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
</style>
