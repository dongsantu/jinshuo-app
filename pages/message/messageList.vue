<template>
	<view>
		<navigator url="/pages/message/messageDetail" v-for="(item,i) in list" :key="i" class="box box-shadow">
			<view class="l-h80 font-32 pad_lr10">{{item.title}}</view>
			<view class="pad_lr10">{{item.desc}}</view>
			<view class="f-between-c t-b l-h60 pad_lr10">
				<view>查看详情</view>
				<view class="tralfont tral-jiantouyou"></view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				list:[
					{
						title:'标题',
						desc:'简介',
						content:'详情',
						time:'2019-07-29 15:20:20'
					}
				]
			}
		},
		onReachBottom(){
			//加载下一页
		},
	}
</script>

<style>
</style>
