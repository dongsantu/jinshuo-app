<template>
	<view class="">
		<view class="b-b l-h80 b-c-w pad_lr20 f-between-c pad_tb10">
			<view>
				可提现金额：<text class="mrg_l10">￥{{myInfo.usableWithdrawAmount? myInfo.usableWithdrawAmount:0}}</text>
			</view>
			<view class="all-btn" @click="allWithdraw">全部提现</view>
		</view>
		<view class="f-l-c font-40 b-c-w pad_lr20">
			<text class="f-c-primary">￥</text>
			<input type="number" class="font-32" v-model="obj.totalAmount"  placeholder="输入提现金额" @blur="blurFun2" />
		</view>
		<view class="l-h80 pad_lr10">
			说明：佣金满50元可以提现，申请成功后1-3个工作日可到账
		</view>
		<view class=" b-c-w ">
			<view class="l-h80 f-b pad_l20">提现方式</view>
			<view class="flex-box f-con-t pad10">
				<view class="pay-item f-c-c" :class="{checked: obj.payChannel==1}" @click="checkFun(1)">
					<view class="icon1 icon"></view>
					<view>微信</view>
				</view>
				<!-- <view class="pay-item f-c-c" :class="{checked: obj.payChannel==2}" @click="checkFun(2)">
					<view class="icon3 icon"></view>
					<view>线下转账</view>
				</view> -->
				<view class="pay-item f-c-c" :class="{checked: obj.payChannel==3}" @click="checkFun(3)">
					<view class="icon2 icon"></view>
					<view>支付宝</view>
				</view>
				
			</view>
		</view>
		<view class="b-c-w mrg_t10">
			<view class="flex-box pad10 b-b">
				<view class="lab l-h64">本人姓名:</view>
				<view class="f-l-c">
					<input class="font-28" v-model="obj.bankCardHolder" placeholder="请填写姓名" @blur="blurFun" />
				</view>
			</view>
			<view class="flex-box pad10 b-b" v-if="obj.payChannel===1">
				<view class="lab l-h64">微信账号:</view>
				<view class="f-l-c">
					<input class="font-28" v-model="obj.payNo" placeholder="请填写账号名" @blur="blurFun" />
				</view>
			</view>
			<view class="flex-box pad10 b-b" v-if="obj.payChannel===3">
				<view class="lab l-h64">支付宝账号:</view>
				<view class="f-l-c">
					<input class="font-28" v-model="obj.payNo" placeholder="请填写账号名" @blur="blurFun" />
				</view>
			</view>
			<view class="flex-box pad10" v-if="obj.payChannel===2">
				<view class="lab l-h64">银行卡账号:</view>
				<view class="f-l-c">
					<input class="font-28" type="number" v-model="obj.bankCardNo" placeholder="请填写银行卡账号" @blur="blurFun" />
				</view>
			</view>
			<view class="flex-box pad10" v-if="obj.payChannel===2">
				<view class="lab l-h64">银行卡支行名称:</view>
				<view class="f-l-c">
					<input class="font-28" type="number" v-model="obj.bankName" placeholder="请填写支行名称" @blur="blurFun" />
				</view>
			</view>
			
		</view>
		<view class="f-c-c pad_t20">
			<view class="btn-1" @click="withdrawCreateFun">提交申请</view>
		</view>
	</view>
</template>

<script>
	import {memberInfo} from '@/http/user'
	import {validator} from '@/common/util'
	import {getMyAccountDisInfo,withdrawCreate} from '@/http/commission.js'
	export default {
		data(){
			return {
				realObj:{},
				myInfo:{},
				obj:{
				  "bankCardHolder": "",
				  "bankCardNo": "",
				  "bankName": "",
				  "payChannel": 1,
				  "totalAmount": 0,
				  "payNo":''
				}
			}
		},
		computed: {
			isToken() {
			    return this.$store.state.login ? this.$store.state.login.token :''
			}
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
			this.init();
		},
		methods:{
			memberInfoFun(){
				memberInfo().then(data=>{
					if(data.data.retCode===0){
						this.realObj = data.data.result
						console.log('obj:-->',this.obj)
						if(!this.realObj.wxNo){
							this.realObj.wxNo=''
						}
						if(!this.realObj.idCard){
							this.realObj.idCard=''
						}
						if(!this.realObj.payNo){
							this.realObj.payNo=''
						}
						if(this.obj.payChannel===1 && !this.obj.payNo){
							this.obj.payNo = this.realObj.wxNo;
						}
						if(this.obj.payChannel===3 && !this.obj.payNo){
							this.obj.payNo = this.realObj.payNo;
						}
						if(!this.obj.bankCardHolder){
							this.obj.bankCardHolder = this.realObj.surname || '';
						}
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			allWithdraw(){
				if(this.myInfo.usableWithdrawAmount){
					this.obj.totalAmount = this.myInfo.usableWithdrawAmount;
				}
			},
			blurFun(){},
			blurFun2(){
				this.obj.totalAmount = Number(this.obj.totalAmount).toFixed(2)
				if(this.obj.totalAmount>this.myInfo.usableWithdrawAmount){
					this.obj.totalAmount = this.myInfo.usableWithdrawAmount;
					uni.showToast({
						title: '提现金额不能大于可提现金额',
						duration: 2000,
						icon:'none'
					});
				}
			},
			withdrawCreateFun(){
				if(!this.realObj.surname || !this.realObj.idCard){
					uni.showToast({
						title: '请先完善个人真实信息，姓名，身份证号！',
						duration: 2000,
						icon:'none'
					});
					setTimeout(()=> {
						uni.navigateTo({
							url:'/pages/my/setCountInfo?shopId='+this.$store.state.shopId
						})
					}, 2000);
					return;
				}
				if(!this.myInfo.usableWithdrawAmount || this.myInfo.usableWithdrawAmount===0){
					uni.showToast({
						title: '没有可提现金额',
						duration: 2000,
						icon:'none'
					});
					return;
				}
				if(this.obj.totalAmount<=0){
					uni.showToast({
						title: '提现金额必须在可提现金额范围内',
						duration: 2000,
						icon:'none'
					});
					return;
				}
				if(validator.ifEmpty(this.obj.bankCardHolder,'请输入姓名')){
					return;
				}
				if(this.obj.payChannel===1 || this.obj.payChannel===3){
					if(validator.ifEmpty(this.obj.payNo,'微信账号')){
						return;
					}
				}else{
					if(validator.ifEmpty(this.obj.bankCardNo,'请输入银行卡账号')){
						return;
					}
					if(validator.ifEmpty(this.obj.bankName,'请输入银行支行名称')){
						return;
					}
				}
				withdrawCreate(this.obj).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '提交申请成功',
							duration: 2000,
							icon:'none'
						});
						uni.navigateTo({
							url:'/pages/maiCenter/withdraw'
						})
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			init(){
				console.log('this.isToken',this.isToken)
				if(this.isToken){
					this.getMyAccountDisInfoFun()
					this.memberInfoFun()
				}
			},
			getMyAccountDisInfoFun(){
				getMyAccountDisInfo().then(data=>{
					if(data.data.retCode===0){
						this.myInfo = data.data.result;
						this.myInfo.usableWithdrawAmount = this.myInfo.usableWithdrawAmount ? this.myInfo.usableWithdrawAmount :0;
					}
				}).catch(e=>{
					this.myInfo.usableWithdrawAmount = this.myInfo.usableWithdrawAmount ? this.myInfo.usableWithdrawAmount :0;
				})
			},
			checkFun(i){
				this.obj.payChannel = i;
				if(i===1){
					this.obj.payNo = this.realObj.wxNo
				}
				if(i===3){
					this.obj.payNo = this.realObj.payNo
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all-btn{
		padding:2upx 20upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: 28upx;
		border-radius:30upx;
	}
	.lab{
		width:230upx;
		text-align: right;
		padding-right: 20upx;
	}
	.btn-1{
		background-color: $uni-color-primary;
		padding:8upx 50upx;
		border-radius: 50upx;
		color: #fff;
		line-height: 50upx;
	}
	.pay-item{
		padding:10upx 30upx;
		border-radius: 30upx;
		border:1px solid #f1f1f1;
		width:250upx;
		margin-right:20upx;
		margin-bottom:10upx;
		box-sizing: border-box;
		
		&.checked{
			border:1px solid $uni-color-primary;
		}
	}
	.icon{
		width:50upx;
		height:50upx;
		margin-right: 10upx;
	}
	.icon1{
		background:url(~@/static/pay-icon1.png) no-repeat center;
		background-size: 50upx;
	}
	.icon2{
		background:url(~@/static/pay-icon2.png) no-repeat center;
		background-size: 50upx;
	}
	.icon3{
		background:url(~@/static/pay-icon3.png) no-repeat center;
		background-size: 50upx;
	}
	.icon4{
		background:url(~@/static/wxpay.png) no-repeat center;
		background-size: 50upx;
	}
	.icon5{
		background:url(~@/static/wxpay.png) no-repeat center;
		background-size: 50upx;
	}
</style>
