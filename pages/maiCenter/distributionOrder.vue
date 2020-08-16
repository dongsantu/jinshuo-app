<template>
	<view>
		<view class="fixHead flex-box b-b">
			<view class="flex-item f-c-c" :class="{act:params.settleStatus===1}" @click="changeAct(1)">未完成</view>
			<view class="flex-item f-c-c" :class="{act:params.settleStatus===0}" @click="changeAct(0)">已完成</view>
		</view>
		<view class="h50"></view>
		<view v-if="list.length>0">
			<view class="li-item" v-for="(item,i) in list" :key="i">
				<view class="f-between-c pad_b5 b-b mrg_b10">
					<view >订单号：{{item.orderNo}}</view>
					<view >客户：{{item.nickname}}</view>
				</view>
				<view v-if="item.detailDtos">
					<view class="f-between-c mrg_b10 b-b pad_b10" v-for="(item2,i2) in item.detailDtos" :key="i2">
						<view class="flex-box">
							<image :src="$imgHost+item2.spuUrl" class="item-img"></image>
							<view class="mrg_l10 f-l-c w250">
								<view class="f-b font-30">{{item2.skuName}}</view>
							</view>
						</view>
						<view class="f-c-g2">
							<view>商品金额： <text class="f-c-g1">￥{{item2.price}}</text></view>
							<view>分红金额： <text class="f-c-primary">￥{{item2.disAmountP}}</text></view>
						</view>
					</view>
				</view>
				
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
	import {getProfitrecord} from '@/http/commission.js'
	import loading from '@/components/loading2.vue'
	
	export default {
		components:{loading},
		data(){
			return {
				beloading:false,
				list:[],
				pages:1,
				params:{
					"settleStatus":1,
					"pageNum": 1,
					"pageSize": 10,
					"userId":''
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
				this.getProfitrecordFun();
			}
			
		},
		methods:{
			init(){
				if(this.$root.$mp.query.userId){
					this.params.userId=this.$root.$mp.query.userId;
				}else{
					this.params.userId=''
				}
				if(this.isToken){
					this.getProfitrecordFun();
				}
				
			},
			getProfitrecordFun(){
				if(this.params.pageNum===1){
					this.list = [];
				}
				this.beloading = true;
				getProfitrecord(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						let list = data.data.result.list;
						this.list = [...this.list,...list]
						this.pages = data.data.pages;
					}
				}).catch(e=>{
					this.beloading = false;
				});
			},
			changeAct(val){
				this.params.pageNum =1;
				this.params.settleStatus = val;
				this.getProfitrecordFun();
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
