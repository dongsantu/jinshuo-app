<template>
	<view class="pad_t5">
		<view class="l-h80 pad_lr10 pad_tb5 f-c-g2 f-b f-between-c">
			<view>个人真实信息</view>
			<navigator :url="'/pages/maiCenter/withdrawApply?shopId='+$store.state.shopId" class="go-btn">去提现</navigator>
		</view>
		<view>
			<view class=" b-c-w">
				<view class="l-h80 f-between-c pad10 font-28">
					<view class="l-h80">微信号</view>
					<input class="uni-input" focus placeholder="请输入微信号" v-model="obj.wxNo" />
				</view>
				<view class="l-h80 f-between-c pad10 font-28">
					<view>真实姓名</view>
					<input class="uni-input" focus placeholder="请输入真实姓名" v-model="obj.surname" />
				</view>
				<view class="l-h80 f-between-c pad10 font-28">
					<view>身份证号</view>
					<input class="uni-input" focus placeholder="请输入身份证号" v-model="obj.idCard" />
				</view>
				<!-- <view class="l-h80 f-between-c pad10 font-28">
					<view>手机号码</view>
					<input class="uni-input" focus placeholder="请输入手机号码" v-model="obj.phone" />
				</view> -->
			</view>
		</view>
		<view class="l-h80 pad_lr10 f-c-g2 f-b">收款账户</view>
		<view>
			<view class=" b-c-w">
				<view class="l-h80 f-between-c pad10 font-28">
					<view>收款方式</view>
					<view>
						<picker @change="changType" :value="index" :range="payTypeList">
							<text>{{payTypeList[index]}}</text><view class="tralfont tral-jiantouyou mrg_l10"></view>
						</picker>
					</view>
				</view>
				<view class="l-h80 f-between-c pad10 font-28" v-if="index===0">
					<view>微信号</view>
					<input class="uni-input" focus placeholder="请输入微信号" v-model="obj.wxNo"  />
				</view>
				<view class="l-h80 f-between-c pad10 font-28" v-if="index===1">
					<view>支付宝号</view>
					<input class="uni-input" focus placeholder="请输入支付宝号" v-model="obj.payNo" />
				</view>
				<view class="l-h80 f-between-c pad10 font-28">
					<view>真实姓名</view>
					<input class="uni-input" focus placeholder="请输入真实姓名" v-model="obj.surname" />
				</view>
			</view>
		</view>
		<view class="mrg20">
			<view class="btn b-c-primary f-c-w" @click="save">保存</view>
		</view>
	</view>
</template>

<script>
	import {memberInfo,comUserInfo} from '@/http/user'
	export default{
		data(){
			return {
				index:0, //0 微信，1 支付宝
				payTypeList:['微信','支付宝'],
				payType:'微信',
				obj:{
				  "idCard": "",
				  "payNo": "",
				  "phone": "",
				  "surname": "",
				  "wxNo": ""
				}
			}
		},
		onShow(){
			this.init()
		},
		methods:{
			changType(e){
				console.log('e',e)
				this.index =e.detail.value
			},
			init(){
				this.memberInfoFun()
			},
			comUserInfoFun(){
				comUserInfo(this.obj).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
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
			memberInfoFun(){
				memberInfo().then(data=>{
					if(data.data.retCode===0){
						this.obj = data.data.result
						console.log('obj:-->',this.obj)
						if(!this.obj.wxNo){
							this.obj.wxNo=''
						}
						if(!this.obj.idCard){
							this.obj.idCard=''
						}
						if(!this.obj.payNo){
							this.obj.payNo=''
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
			save(){
				this.comUserInfoFun()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.go-btn{
		padding: 2upx 20upx;
		font-weight: normal;
		background: $uni-color-primary;
		line-height: 50upx;
		color: #fff;
		border-radius: 30upx;
		
	}
	.tral-jiantouyou{
		line-height: 60upx;
	}
	.uni-input{
		padding-top: 0;
		padding-bottom: 0;
	}
</style>
