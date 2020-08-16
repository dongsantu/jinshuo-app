<template>
	<view>
		<view class="fixHead flex-box b-b">
			<view class="flex-item f-c-c" :class="{act:params.qryType===1}" @click="changeAct(1)">我的客户</view>
			<view class="flex-item f-c-c" :class="{act:params.qryType===2}" @click="changeAct(2)">我的团队</view>
		</view>
		<view class="h50"></view>
		<view v-if="list&&list.length>0">
			<view >
				<view class="li-item f-between-c" v-for="(item,i) in list" :key="i">
					<view class="flex-box">
						<image :src="item.avatar" class="item-img"></image>
						<view class="mrg_l10">
							<view class="f-b font-30">{{item.name}}</view>
							<view class="f-c-g2">成交额 <text class="mrg_l10 f-b font-30 f-c-g1">￥{{item.consumeAmount?item.consumeAmount:0}}</text></view>
							<view class="f-c-g2">贡献分红金额 <text class="mrg_l10 f-b font-30 f-c-g1">￥{{item.disAmount?item.disAmount:0}}</text></view>
							<view class="f-c-g2" v-if="params.qryType===2" >团队人数 <text class="mrg_l10 f-b font-30 f-c-g1">0</text></view>
						</view>
					</view>
					<view class="f-c-g2">
						订单<text class="num">{{item.consumeOrder}}</text><text class="tralfont tral-jiantouyou mrg_l5"></text>
					</view>
				</view>
			</view>
			<!-- <view v-else>
				<view class="b-c-w">
					<view class="flex-box pad10">
						<image class="item-img" src="/static/60x60.png"></image>
						<view class="mrg_l10 f-between-b flex-item">
							<view>
								<view class="f-b font-30">李四</view>
								<view class="f-c-g2">加入时间：2018-09-10 </view>
							</view>
							<view>团队详情 <text class="tralfont tral-jiantoushang"></text></view>
						</view>
					</view>
					<view class="flex-box pad10">
						<view class="flex-item text-c">
							<view class="f-c-g2">团队人数(人)</view>
							<view>3300</view>
						</view>
						<view class="flex-item text-c">
							<view class="f-c-g2">团队人数(人)</view>
							<view>3300</view>
						</view>
						<view class="flex-item text-c">
							<view class="f-c-g2">团队人数(人)</view>
							<view>3300</view>
						</view>
						<view class="flex-item text-c">
							<view class="f-c-g2">团队人数(人)</view>
							<view>3300</view>
						</view>
					</view>
				</view>
			</view> -->
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
				list:[],
				pages:1,
				params:{
					"qryType":1,
					"pageNum": 1,
					"pageSize": 10
				}
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
			changeAct(val){
				this.pages = 1;
				this.params.pageNum =1;
				this.params.qryType = val;
				this.getMySubordinateInfoFun();
			}
		}
	}
</script>

	
<style lang="scss" land="scoped">
	.item-img{
		width:120upx;
		height:120upx;
		border-radius: 10upx;
		
	}
	.li-item{
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		padding:20upx;
		
		.num{
			background-color: #f1f1f1;
			border-radius: 40upx;
			width:50upx;
			height: 50upx;
			color:#333;
		}
	}
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
</style>
