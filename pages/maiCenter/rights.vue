<template>
	<view class="page-bg">
		<view class="top-part">
			<view class="f-between-c mrg_t10">
				<view class="flex-box">
					<image class="my-photo box-shadow" :src="avatar"/>
					<view class="my-info mrg_l20 f-c-w f-m f-c-c">
						<view class="font-36 f-b">{{nickname}} </view>
					</view>
				</view>
			</view>
			<view class="f-between-c pad_lr10 pad_t15">
				<view class="dot f-m f-c-c" :class="{act:role===1}"><view class="d"></view></view>
				<view class="line flex-item"><view class="level" :class="{level2:role===0}"></view></view>
				<view class="dot f-m f-c-c" :class="{act:role===0}"><view class="d"></view></view>
			</view>
			<view class="f-between-c f-c-w">
				<view>小麦客</view>
				<view>大麦客</view>
			</view>
		</view>
		<view class="box pad_lr10 pad_b10" v-if="obj">
			<view class="box-title mrg_b10">
				满足以下规则升级为大麦客
			</view>
			<view v-if="obj.upgradeSalesSwitch===0">
				<view v-if="obj.isComAmount===0" class="f-c-g2">
					<text class="tag0 tag-ok">已达标</text>
					<text>订单金额达{{obj.upgradeSales}}元</text>
				</view>
				<view v-else class="f-c-g2">
					<text class="tag0" >未达标</text>
					<text>订单金额达{{obj.upgradeSales}}元(还差{{obj.gapAmount ? obj.gapAmount : ''}}元)</text>
				</view>
			</view>
			<view v-if="obj.upgradeNumberSwitch===0">
				<view v-if="obj.isComCount===0" class="f-c-g2 mrg_t10">
					<text class="tag0 tag-ok">已达标</text>
					<text>累计邀请小麦客达{{obj.upgradeNumber}}人</text>
				</view>
				<view v-else class="f-c-g2">
					<text class="tag0" >未达标</text>
					<text>累计邀请粉丝达{{obj.upgradeNumber}}人(还差{{obj.gapCount ? obj.gapCount : ''}}人)</text>
				</view>
			</view>
			<view v-if="obj.subordinateSwitch===0">
				<view v-if="obj.isComSubord===0" class="f-c-g2 mrg_t10">
					<text class="tag0 tag-ok">已达标</text>
					<text>累计邀请小麦客达{{obj.subordinateCount}}人</text>
				</view>
				<view v-else class="f-c-g2">
					<text class="tag0" >未达标</text>
					<text>累计邀请小麦客达{{obj.subordinateCount}}人(还差{{obj.gapSubordinateCount ? obj.gapSubordinateCount : ''}}人)</text>
				</view>
			</view>
			
			
		</view>
		<view class="box pad_lr10 pad_b10">
			<view class="box-title mrg_b10">
				等级规则
			</view>
			<text class="tag">小麦客</text>
			<view class="font-30 f-b">规则介绍</view>
			<view class="f-c-g2">邀请20个粉丝后即是该等级</view>
			<view class="font-30 f-b">权益介绍</view>
			<view class="f-c-g2 mrg_b10">粉丝下单，或是自购都可以获得顾客返佣</view>
			
			<text class="tag">大麦客</text>
			<view class="font-30 f-b">规则介绍</view>
			<view class="f-c-g2">邀请得粉丝中，有20个升级为小麦客，并且订单金额满5000元，自动升级后该等级</view>
			<view class="font-30 f-b">权益介绍</view>
			<view class="f-c-g2">粉丝下单，或是自购都可以获得顾客返佣</view>
			<view class="f-c-g2">下级小麦客得粉丝下单，可以获得团队佣金</view>
		</view>
		
		<view class="h50"></view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		
	</view>
</template>

<script>
		import footerMenu from '@/components/footer'
		import {getGap} from '@/http/commission.js'
	export default{
		components: {
			footerMenu
		},
		data(){
			return {
				obj:''
			}
		},
		computed: {
			isToken() {
			    return this.$store.state.login ? this.$store.state.login.token :''
			},
			role(){
				if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
					return this.$store.state.login.user.member.isDis
				}
				return 1
			},
			avatar(){
				if(this.$store.state.login && this.$store.state.login.user){
					return this.$store.state.login.user.avatar
				}
				return ''
			},
			nickname(){
				if(this.$store.state.login && this.$store.state.login.user){
					return this.$store.state.login.user.nickname
				}
				return ''
			}
		},
		watch:{
			isToken(){
				this.init();
			}
		},
		onLoad(params){
			this.init();
		},
		onShow(){
			this.init();
		},
		methods:{
			init(){
				if(this.isToken){
					this.getGapFun();
				}
			},
			getGapFun(){
				getGap().then(data=>{
					if(data.data.retCode===0){
						this.obj = data.data.result
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag0{
		padding:2upx 10upx;
		line-height: 40upx;
		border:1px solid $uni-text-color-grey;
		border-radius: 10upx;
		margin-right: 20upx;
		&.tag-ok{
			color:$uni-color-primary;
			border:1px solid $uni-color-primary;
		}
	}
	.tag{
		padding:5upx 20upx;
		font-size: 32upx;
		border-radius: 10upx;
		background-color: $uni-color-primary;
		line-height: 40upx;
		color: #fff;
		margin: 5upx 0;
	}
	.page-bg{
		//background-color:$uni-color-primary;
		background-size: 100% 400upx;
		overflow:hidden;
		background-attachment:fixed;
	}
	.my-photo{
		width:110upx;
		height:110upx;
		border-radius: 50%;
	}
	.top-part{
		padding:50upx 40upx 70upx 40upx;
		background-color: $uni-color-primary;
		height:320upx;
		box-sizing: border-box;
	}
	.line{
		height: 6upx;
		background-color: rgba(0,0,0,0.2);
		.level{
			width: 50%;
			height: 6upx;
			background-color: #f1f1f1;
			&.level2{
				width: 100%;
			}
		}
	}
	.dot{
		width:30upx;
		height: 30upx;
		border-radius: 50%;
		margin:5upx;
		&.act{
			background-color: rgba(255,255,255,0.4);
		}
		.d{
			height: 10upx;
			width:10upx;
			border-radius: 50%;
			background: #fff;
		}
	}
</style>
