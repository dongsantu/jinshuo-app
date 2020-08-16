<template>
	<view>
		<view class="text-c font-32 l-h80">{{message.title}}</view>
		<view class="text-c f-c-g2 font-24">{{message.time}}</view>
		<view class="pad_lr10 pad_t15 t-b">
			{{message.content}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				message:{
					title:'标题',
					content:'详情详情详情详情详情',
					time:'2019-07-29 15:20:20'
				}
			}
		}
	}
</script>

<style>
</style>
