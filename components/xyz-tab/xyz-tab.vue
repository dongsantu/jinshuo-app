<template>
	<view class="tab">
		<scroll-view scroll-x style="white-space:nowrap;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="tab_main">
				<view :class="index == tabIdx ? 'tab_active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)">
					<view class="tab-text" style="display: inline-block;">{{ item.label }}
						<view class="b-border"></view>
					</view>
					
				</view>
			</view>
			<!-- 		
			<view class="tab_main" style="display: inline-block;" :class="index == tabIdx ? 'tab_active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)" :data-id="index">
				<view class="relative">
					<view class="name">{{ item.label }}</view>
					<view class="absolute bottomLine"></view>
				</view>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
export default {
	props: {
		tabList: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		tabActiveIdx: {
			type: Number,
			default: 0
		},
		isScroll: {
			type: Boolean,
			default: false
		},
		callback:{
			type: Function
		}
	},
	data() {
		return {
			tabIdx: 0,
			scrollLeft: 0
		};
	},
	watch: {
		tabActiveIdx(newValue, oldValue) {
			console.log('newValue', newValue);
			this.tabSelect(newValue);
		}
	},
	methods: {
		tabSelect(idx) {
			console.log('idx:::',idx)
			this.tabIdx = idx;
			this.scrollLeft = idx * 30;
			//this.$emit('tabSelect', idx);
			if(this.callback){
				this.callback(idx)
			}
		}
	}
};
</script>
<style lang="less" scoped>
.tab {
	min-width: 100%;
	.tab_main {	
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 34upx;
		text-align: center;
		>view{
			padding:0 20upx;
			height: 80upx;
			line-height: 80upx;
			flex:1;
			.tab-text{
				display: inline-block;
				position: relative;
				}
			&.tab_active {
				//font-size: 36upx;
				font-weight: bold;
				color: red;
				//border-bottom:2upx solid red;
				.tab-text{
					.b-border{
						width:100%;
						position: absolute;
						bottom: -16upx;
						height: 8upx;
						border-radius: 5upx;
						background-color: red;
						left: 0;
					}
				}
			}
		}
		
	}
	
}

</style>
