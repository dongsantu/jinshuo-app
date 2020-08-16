<template>
	<view>
		<view class="b-c-w pad_tb10 b-b">
			<view class="search-box ">
				<input class="input" v-model="keyword" placeholder="搜索客户名"></input>
				<view class="search-btn tralfont tral-sousuo" @click="gotoSearch"></view>
			</view>
		</view>
		<view v-if="list&&list.length>0">
			<view class="li-item f-between-c" v-for="(item,i) in list" :key="i">
				<view class="flex-box">
					<image :src="item.avatar" class="item-img"></image>
					<view class="mrg_l10">
						<view class="f-b font-30">{{item.name}}</view>
						<view class="f-c-g2">成交额 <text class="mrg_l10 f-b font-30 f-c-g1">￥{{item.consumeAmount?item.consumeAmount:0}}</text></view>
						<view class="f-c-g2">贡献分红金额 <text class="mrg_l10 f-b font-30 f-c-g1">￥{{item.disAmount?item.disAmount:0}}</text></view>
					</view>
				</view>
				<navigator :url="'/pages/maiCenter/distributionOrder?userId='+item.id" class="f-c-g2">
					订单<text class="num">{{item.consumeOrder}}</text><text class="tralfont tral-jiantouyou mrg_l5"></text>
				</navigator>
			</view>
			
		</view>
		<view v-else>
			<empty v-if="!beloading"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {getMySubordinateInfo} from '@/http/commission.js'
	import loading from '@/components/loading2.vue'
	export default {
		components:{loading},
		data(){
			return {
				beloading:false,
				pages:1,
				keyword:'',
				list:[],
				params:{
					"qryType":1,
					"pageNum": 1,
					"pageSize": 10
				},
			}
		},
		computed: {
			isToken() {
			    return this.$store.state.login ? this.$store.state.login.token :''
			},
		},
		watch:{
			isToken(){
				this.init();
			}
		},
		onShow: function() {
			this.init();
		},
		onLoad: function() {
			//this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum += 1;
			if(this.pages>=this.params.pageNum){
				this.getMySubordinateInfoFun();
			}
			
		},
		methods:{
			init(){
				if(this.isToken){
					this.getMySubordinateInfoFun();
				}
			},
			getMySubordinateInfoFun(){
				if(this.params.pageNum===1){
					this.list = [];
				}
				this.beloading = true;
				getMySubordinateInfo(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						let list = data.data.result.list;
						this.list = [...this.list,...list]
						this.pages = data.data.result.pages;
					}
				}).catch(e=>{
					this.beloading = false;
				})
			},
			gotoSearch(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.li-item{
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		padding:20upx;
		.item-img{
			width:120upx;
			height:120upx;
			border-radius: 10upx;
			
		}
		.num{
			background-color: #f1f1f1;
			border-radius: 40upx;
			width:50upx;
			height: 50upx;
			color:#333;
		}
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
