<template>
	<view class="b-c-w">
		<view class="fixHead f-between-c b-b">
			<view :class="{act:params.withdrawStatus===''}" @click="changeAct('')">全部</view>
			<view :class="{act:params.withdrawStatus===-1}" @click="changeAct(-1)">待审核</view>
			<view :class="{act:params.withdrawStatus===0}" @click="changeAct(0)">待打款</view>
			<view :class="{act:params.withdrawStatus===1}" @click="changeAct(1)">已打款</view>
			<view :class="{act:params.withdrawStatus===2}" @click="changeAct(2)">已驳回</view>
		</view>
		<view class="h50"></view>
		<view v-if="withdrawLog.length>0">
			<view class="f-between-c b-b pad10" v-for="(item,i) in withdrawLog" :key="i">
				<view>
					<view class="font-30 f-b">提现至余额
					<text class="tag" v-if="item.withdrawStatus===-1">待审核</text>
					<text class="tag" v-if="item.withdrawStatus===0">待打款</text>
					<text class="tag" v-if="item.withdrawStatus===1">提现成功</text>
					<text class="tag" v-if="item.withdrawStatus===2">审核拒绝</text>
					</view>
					<view class="f-c-g2">提现账户： 
						<text v-if="item.payChannel===1">微信:{{item.payNo}}</text>
						<text v-if="item.payChannel===2">银行卡:{{item.bankCardNo}}</text>
						<text v-if="item.payChannel===3">支付宝:{{item.payNo}}</text>
					</view>
					<view class="f-c-g2">提现时间： {{item.withdrawTime}}</view>
				</view>
				<view class="text-r">
					<view class="f-b font-30">￥{{item.totalAmount}}</view>
					<view class="f-c-g2">手续费￥{{item.feeAmount}}</view>
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
	import loading from '@/components/loading2.vue'
	
	import {getWithdrawLog} from '@/http/commission.js'
	export default{
		data(){
			return {
				beloading:false,
				pages:1,
				withdrawLog:[],
				params:{
					"withdrawStatus":'',
					"pageNum": 1,
					"pageSize": 10
				}
			}
		},
		components: {
			loading
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
				this.getWithdrawLogFun();
			}
			
		},
		methods:{
			init(){
				console.log('this.isToken',this.isToken)
				if(this.isToken){
					this.getWithdrawLogFun();
				}
			},
			getWithdrawLogFun(){
				if(this.params.pageNum===1){
					this.withdrawLog = [];
				}
				this.beloading = true;
				getWithdrawLog(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						let withdrawLog = data.data.result.list;
						this.withdrawLog = [...this.withdrawLog,...withdrawLog]
						this.pages = data.data.result.pages;
					}
				}).catch(e=>{
					this.beloading = false;
				})
			},
			changeAct(val){
				this.params.withdrawStatus = val;
				this.params.pageNum = 1;
				this.getWithdrawLogFun();
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
	.tag{
		line-height: 40upx;
		color:$uni-color-primary;
		border:1px solid $uni-color-primary;
		border-radius: 20upx;
		padding:0 10upx;
		margin-left:15upx;
		font-weight: normal;
	}
</style>
