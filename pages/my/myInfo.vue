<template>
	<view class="content">
		<view class="list">
			<!-- <view class="row">
				<view class="title">头像</view>
				<view class="right">
					<view class="tis"><image src="" mode="widthFix"/></view>
					
				</view>
			</view> -->
			<view class="row">
				<view class="title">昵称</view>
				<view class="right">
					<view class="tis">{{myInfo.name}}</view>
					<view class="icon "></view>
				</view>
			</view>
			
			<view class="row">
				<view class="title">手机</view>
				<view class="right" @click="showEditName">
					<view class="tis" v-if="params.phone">{{params.phone}}</view>
					<view class="tis f-c-primary" v-else>绑定手机</view>
					<view class="icon jiantou"></view>
				</view>
			</view>
			
			<view class="row">
				<view class="title">真实姓名</view>
				<view class="right">
					
					<navigator :url="'/pages/my/setCountInfo?shopId='+$store.state.shopId" class="l-h100 flex-box pad_r10">
						<!-- {{params.surname ? params.surname : '设置证实姓名'}} -->
						<view class="tis" v-if="params.surname">{{params.surname}}</view>
						<view class="tis f-c-primary" v-else>设置证实姓名</view>
					</navigator>
					<view class="icon jiantou"></view>
				</view>
			</view>
			
			<!-- <view class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					昵称
				</view>
				<view class="l-h100 flex-box pad_r10">
					{{myInfo.name}}<view class="tralfont tral-jiantouyou"></view>
				</view>
			</view> -->
			
			<!-- <view class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					手机号
				</view>
				<view class="l-h100 flex-box pad_r10 f-c-primary" @click="showEditName">
					{{params.phone ? params.phone : '绑定手机'}}
				</view>
			</view> -->
			<!-- <view class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					真实姓名
				</view>
				<navigator :url="'/pages/my/setCountInfo?shopId='+$store.state.shopId" class="l-h100 flex-box pad_r10">
					{{params.surname ? params.surname : '设置证实姓名'}}<view class="tralfont tral-jiantouyou"></view>
				</navigator>
			</view> -->
			
		</view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		<uni-popup ref="popup1" type="top">
			<view class="b-c-w pad10">
				<view class="uni-common-mt">
					<view class="uni-form-item uni-column b-b">
						<input class="uni-input" maxlength="20" v-model="params.phone" placeholder="请输入手机号码" />
					</view>
					<view class="uni-form-item uni-column b-b ">
						<view class="f-between-c">
							<input class="uni-input" maxlength="20" v-model="code" placeholder="请输入验证码" />
							<view class="send-code" @click="sendMsgFun">获取验证码</view>
						</view>
					</view>
					<view id="captchaBox"></view>
					
				</view>
				<view class="mrg20">
					<view class="btn b-c-primary f-c-w" @click="upPhoneFun">保存</view>
				</view>
				
			</view>
			
		</uni-popup>
		<uni-popup ref="popup2" type="top">
			<view class="b-c-w pad10">
				<view>
					<view>
						<radio-group @change="changeSex">
							<label class="radio"><radio :value="1" :checked="1 === myInfo.sex" />男</label>
							<label class="radio"><radio :value="2" :checked="2 === myInfo.sex" />女</label>
						</radio-group>
					</view>
				</view>
				<view class="uni-common-mt">
					<button type="default" @click="saveSex">保存</button>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import footerMenu from '@/components/footer'
	import {comUserInfo,memberInfo, geetest, sendMsg,upPhone} from '@/http/user'
	import {validator} from '@/common/util.js'
	let countTime = 60;
	export default {
		data(){
			return {
				code:'',
				captchaObj:'',
				ifShowEditName:false,
				ifShowEditSex:false,
				myInfo:{
					name:'游客',
					sex: 0,
					phone:''
				},
				params:{
				  "idCard": "",
				  "name": "",
				  "phone": "",
				  "surname": "",
				}
			}
		},
		computed:{
			userInfo(){
				return this.$store.state.login ? this.$store.state.login.user :''
			}
		},
		watch:{
			userInfo(){
				this.init();
			}
		},
		onLoad(){
			//this.init();
		console.log(1)
			
		},
		onShow(){
			//console.log(2)
			this.init();
			},
		methods:{
			upPhoneFun(){
				if(validator.ifEmpty(this.params.phone,'请输入手机号码')){return;}
				if(validator.ifEmpty(this.code,'请输入验证码')){return;}
				if(validator.ifPhone(this.params.phone,'手机格式或位数不正确')){return;}
				upPhone({code:this.code,phone:this.params.phone}).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
						this.$refs.popup1.close()
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
					this.retsetGee()
				}).catch(e=>{
					this.retsetGee()
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			sendMsgFun(){
				if(validator.ifEmpty(this.params.phone,'请输入手机号码')){return;}
				if(validator.ifPhone(this.params.phone,'手机格式或位数不正确')){return;}
				let result = this.captchaObj.getValidate();
				if(!result){
					uni.showToast({
						title: '请先点击下面按钮进行验证',
						duration: 2000,
						icon:'none'
					});
					return;
				}
				let params = {
					mobile: this.params.phone,
					gee: result
				}
				sendMsg(params).then(data=>{
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
			countTimeFun(){
				countTime = countTime-1
				setTimeout(()=>{
					if(countTime>0){
						this.countTimeFun()
					}else if(this.captchaObj){
						this.captchaObj.reset();
					}
				},1000)
			},
			retsetGee(){
				countTime =60
				this.countTimeFun()
			},
			setCaptchaObj(captchaObj){
				/* if(document.getElementById('captcha-box')){
					document.getElementById('captcha-box').innerHTML = "";
				} */
				console.log('captchaObj',captchaObj)
				
				//captcha-box
				//captchaObj.appendTo('#captcha-box');
				/* this.$nextTick(()=>{
					setTimeout(()=>{
						console.log('this.$refs.captchabox',this.$refs.captchabox)
						console.log('this.$refs.captchabox2',uni.createSelectorQuery().select('#captcha-box'))
						
					},200)
					
				}) */
				console.log('#captchaBox',document.getElementById('captchaBox'))
				
				this.captchaObj = captchaObj;
				
			},
			geetestFun(){
				geetest().then(data=>{
					if(data.data.retCode===0){
						//this.captchaObj = data.data.result
						let data2 = data.data.result;
						console.log('data--',data2)
						initGeetest({
						    gt: data2.gt,
						    challenge: data2.challenge,
						    new_captcha: data2.new_captcha, // 用于宕机时表示是新验证码的宕机
						    offline: !data2.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
						    product: "float", // 产品形式，包括：float，popup
						    width: "100%"
						}, this.setCaptchaObj)
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
				memberInfo({}).then(data=>{
					if(data.data.retCode===0){
						this.params = data.data.result
						this.params.surname = this.params.surname || ''
						this.params.phone = this.params.phone || ''
					}else{
						uni.showToast({
							title: data,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch()
			},
			init(){
				console.log('this.refs',this.refs)
				if(this.userInfo){
					this.myInfo.name = this.userInfo.nickname
					if(this.userInfo.sex){
						this.myInfo.sex = this.userInfo.sex.code
					}
					if(this.userInfo.userAccount){
						this.myInfo.phone = this.userInfo.userAccount.phone
					}
					this.memberInfoFun()
					this.$nextTick(()=>{
						this.geetestFun()
					})
					
				}
			},
			saveName(){
				comUserInfo(this.params).then(data=>{
					if(data.data.retCode===0){
						uni.showToast({
							title: '保存成功',
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
				this.$refs.popup1.close()
			},
			saveSex(){
				this.$refs.popup2.close()
			},
			changeSex(e){
				this.myInfo.sex = e.detail.value;
			},
			showEditName(){
				if(this.userInfo){
					if(this.userInfo.userAccount){
						this.params.phone = this.userInfo.userAccount.phone
					}
					this.params.name = this.userInfo.realName
					this.params.idCard = this.userInfo.idCard
				}
				//this.ifShowEditName = true;
				this.$refs.popup1.open();
				let _this = this;
				this.$nextTick(()=>{
					_this.captchaObj.appendTo('#captchaBox');
					console.log('dom1:',document.getElementById('captchaBox'))
				})
				//this.captchaObj.appendTo('#captchaBox');
				console.log('dom2:',document.getElementById('captchaBox'))
			},
			showEditSex(){
				//this.ifShowEditSex = true;
				this.$refs.popup2.open()
			}
		},
		components: {
			footerMenu,
			uniPopup
		},
	}
</script>

<style lang="scss" scoped>
	.send-code{
		width:200upx;
		text-align: center;
		background: $uni-color-primary;
		color: #fff;
		border-radius: 40upx;
		padding:10upx 0;
	}
	
	
	
	page {
		background-color: #f3f3f3;
	}
	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKQAAsAAAAABjwAAAJFAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApIXAE2AiQDCAsGAAQgBYRtBy4bgAUR1Ys/sq+wcQ0AKCMxzO7s4dbxlywA4w2+QAIrUAAAAABA8Hzt9zt3d9//+00Taomhi1gSkUZTzUynEiJMh45HsUimByZ4/unc4gMVRqR1SoYZi0pw3aFbm/4hO4VNh2bJ2umnZ+Q3hAuhQ3jVPHGMDgCfuHf6W0CBzAeU4160xqAuoC4OpEDHGhRZCWXcMHaBSzgOAbykUYLUXFp6sBiscQLIvJsaweacGAyLWARXzVKDnCsHqw6SWzgLvy/fpWJB4WisnI7J2nEq3tgxrP/X+31CuUBAqx1AAyWAAempDbahEUbXeIOGLNhXpsCb9w3IXrUI++usdD8AKZB3T3x3LAKAAritnkSA5KjrQSJz++JfybXOMS/f0eF7B4itVLl1SnvltSIO9qACqdWN/RMBBLqPPHZo3Z8lA8D9FYUS09MNdg8mgT/BR01GF1p6ZVR+bbsicoYKL17gH1ujvI5VJU4bFSyJEWY3qSk0lhySoZXAwUcZXFjK4aWY+tU+YqyiEeMBitgBEMJcQRHkGpowdyRDe4FDkl+4CIuGlz5xSx95YrnZkbESbKH+gWuo145RZlHmDc0UK84KQ8YLeXQeKNK8GLlijzzHjPFtShENmqmDCzgNYyQYmDw2klqR4ZBluu5NaUOdmlHNWAm2UP/ANdRrv7PMSp+/oZlixS0NNe4X8uj6hyLNe5Cusr5Xw728Mr5NKaJBM3VwAYMwRoKhfpDHRlI7wj8cMruV7itL11d0X7cLpWZY6kTsQo1Zo6lQCgA=')
			format('woff2');
	}
	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 35upx;
		font-style: normal;
		color: #000000;
		&.jiantou {
			&:before {
				content: '\e627';
			}
		}
	}
	.content {
		padding-bottom: 20upx;
		.list {
			width: 96%;
			padding-left: 4%;
			background-color: #fff;
			margin-bottom: 20upx;
			.row {
				widows: 100%;
				min-height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1upx #eee;
				&:last-child {
					border-bottom: none;
				}
				.title {
					font-size: 28upx;
					color: #333;
				}
				.right {
					display: flex;
					align-items: center;
					color: #999;
					.tis {
						font-size: 28upx;
						margin-right: 5upx;
						max-height: 120upx;
						image {
							width: 100upx;
							height: 100upx;
							border-radius: 100%;
							margin: 10upx 0;
						}
					}
					.icon {
						width: 40upx;
						color: #cecece;
					}
				}
			}
		}
	}
</style>
