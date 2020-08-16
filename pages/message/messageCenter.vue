<template>
	<view>
		<view>
			<navigator url="/pages/message/messageList" class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					<view class="tralfont tral-xiaoxi-kong mrg_r5 f-c-primary font-40"></view>
					系统消息
				</view>
				<view class="l-h100 flex-box pad_r10" @click="showEditName">
					<view class="tralfont tral-jiantouyou"></view>
				</view>
			</navigator>
			<navigator url="/pages/message/messageList" class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					<view class="tralfont tral-xiaoxizhangdan mrg_r5 f-c-primary font-40"></view>
					订单通知
				</view>
				<view class="l-h100 flex-box pad_r10" @click="showEditSex">
					<view class="tralfont tral-jiantouyou"></view>
				</view>
			</navigator>
			<navigator url="/pages/message/messageList" class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					<view class="tralfont tral-yinzhang mrg_r5 f-c-primary font-40"></view>
					审批通知
				</view>
				<view class="l-h100 flex-box pad_r10">
					<view class="tralfont tral-jiantouyou"></view>
				</view>
			</navigator>
			<navigator url="/pages/message/messageList" class="f-between-c b-b">
				<view class="l-h100 flex-box pad_l10">
					<view class="tralfont tral-laba mrg_r5 f-c-primary font-40"></view>
					企业通知
				</view>
				<view class="l-h100 flex-box pad_r10">
					<view class="tralfont tral-jiantouyou"></view>
				</view>
			</navigator>
		</view>
		<view class="foot-menu">
			<footer-menu></footer-menu>
		</view>
		
	</view>
</template>

<script>
	import footerMenu from '@/components/footer'
	export default {
		data(){
			return {
				
			}
		},
		methods:{
		},
		components: {
			footerMenu
		},
	}
</script>

<style>
</style>
