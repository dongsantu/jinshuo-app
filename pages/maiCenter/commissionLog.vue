<template>
	<view class="b-c-w">
		<view class="fixHead flex-box b-b">
			<view class="flex-item f-c-c" :class="{act:params.type===''}" @click="changeAct('')">全部</view>
			<view class="flex-item f-c-c" :class="{act:params.type===1}" @click="changeAct(1)">个人</view>
			<view class="flex-item f-c-c" :class="{act:params.type===2}" @click="changeAct(2)">团队</view>
		</view>
		<view class="h50"></view>
		<view v-if="commissionLog.length>0">
			<view class="f-between-c pad10 b-b" @click="showDetail(item)" v-for="(item,i) in commissionLog" :key="i">
				<view>
					<view class="f-b font-30">
						佣金 <text class="mrg_l10">{{item.disPerP*100}}%</text>
						<text v-if="item.type===1" class="tag2">个人</text><text class="tag2" v-else>团队</text>
					</view>
					<view class="f-c-g2 font-24">{{item.orderTime}}</view>
				</view>
				<view class="text-r">
					<view>+ <text class="mrg_l10 f-b">￥{{item.disAmountP}}</text></view>
					<view>订单号：{{orderNo}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty v-if="!beloading"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		
		<uni-popup ref="popup1" type="center" :maskClickCallback="hideDetail">
			<view class="detail-box" v-if="detailObj">
				<view class="til">收入详情</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">收入</view>
					<view class="text-r">
						<view class="f-b">￥{{detailObj.disAmountP}}</view>
						<view class="f-c-g2">我的推广奖励</view>
					</view>
				</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">订单号</view>
					<view class="text-r">
						<view class="f-c-g2">{{detailObj.orderNo}}</view>
					</view>
				</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">订单状态</view>
					<view class="text-r">
						<view class="f-c-g2" v-if="detailObj.settleStatus===1">未完成</view>
						<view class="f-c-g2" v-if="detailObj.settleStatus===0">已完成</view>
					</view>
				</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">产品名称</view>
					<view class="text-r">
						<view class="f-c-g2">{{detailObj.skuName}}</view>
						<view class="f-b">￥{{detailObj.price}}</view>
					</view>
				</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">下单时间</view>
					<view class="text-r">
						<view class="f-c-g2">{{detailObj.orderTime}}</view>
					</view>
				</view>
				<view class="f-between-c pad10 b-b">
					<view class="f-c-g2">订单金额</view>
					<view class="text-r">
						<view class="f-b">￥{{detailObj.totalAmount}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import loading from '@/components/loading2.vue'
	
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import {getProfitDetailByPage} from '@/http/commission.js'
	export default {
		components:{uniPopup,loading},
		data(){
			return {
				pages:1,
				beloading:false,
				params:{
					"type":'',
					"pageNum": 1,
					"pageSize": 10
				},
				detailObj:'',
				commissionLog:[]
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
			changeAct(val){
				this.params.pageNum =1;
				this.params.type = val;
				this.getProfitrecordFun();
			},
			init(){
				console.log('this.isToken',this.isToken)
				if(this.isToken){
					this.getProfitrecordFun();
				}
			},
			getProfitrecordFun(){
				if(this.params.pageNum===1){
					this.commissionLog = [];
				}
				this.beloading = true;
				getProfitDetailByPage(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						let commissionLog = data.data.result.list;
						this.commissionLog = [...this.commissionLog,...commissionLog]
						this.pages = data.data.result.pages;
					}
				}).catch(e=>{
					this.beloading = false;
				});
			},
			hideDetail(){
				this.$refs.popup1.close();
			},
			showDetail(item){
				this.detailObj = item;
				this.$refs.popup1.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.detail-box{
		width:660upx;
		background-color: #fff;
		border-radius:10upx;
		.til{
			line-height: 80upx;
			text-align: center;
			font-size: 32upx;
		}
	}
	.tag2{
		padding:2upx 30upx;
		border-radius: 30upx;
		background-color: $uni-color-primary;
		color:#fff;
		margin-left:10upx;
	}
</style>
