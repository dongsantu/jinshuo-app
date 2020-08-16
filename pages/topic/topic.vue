<template>
	<view class="pos-r" :style="cssObj">
		<navigator open-type="reLaunch" :url="'/pages/home/home?shopId='+$store.state.shopId" class="tralfont tral-tubiao- goHome">
		</navigator>
		<view class="top-banner mrg_b10" v-if="topicObj && topicObj.mainPicture">
			<image class="img" :src="$imgHost+ topicObj.mainPicture"></image>
		</view>
		<view v-if="topicObj && topicObj.list">
			<view v-for="(item,i) in topicObj.list" :key="i">
				<view class="li-til" v-if="item.headingShowFlag===0" :style="'color:'+item.headingColor">{{item.name}}</view>
				<view class="li-til" v-if="item.headingShowFlag===1">
					<image class="li-til-img" :src="$imgHost+item.mainPicture"></image>
				</view>
				<view v-if="item.products">
					<product-list :list="item.products" :beloading="item.beloading"></product-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import productList from '@/components/product-list2'
	import {getThemeByCode,getProductByTopic} from '@/http/product.js'
	export default {
		components: {
			productList
		},
		data(){
			return {
				topicObj:'',
				beloading:false,
				cssObj:'',
				topicCode:''
			}
		},
		onShow(){
			this.init()
		},
		methods:{
			setTitle(title){
				console.log('title',title)
				uni.setNavigationBarTitle({  
					title: title  
				})
			},
			init(){
				if(this.$root.$mp.query.topicCode){
					this.topicCode = this.$root.$mp.query.topicCode;
				}
				this.getThemeByCodeFun()
			},
			getProductByTopicFun(topicId,i){
				this.topicObj.list[i].products = []
				getProductByTopic({topicId}).then(data=>{
					this.topicObj.list[i].beloading = false;
					if(data.data.retCode===0){
						console.log('i:',i)
						console.log('data.data.result:',data.data.result)
						this.topicObj.list[i].products = data.data.result.map(item=>{
							if(item.name.length>18){
								item.sortName = item.name.substr(0,16)+'...'
							}else{
								item.sortName = item.name
							}
							return item;
						});
						
					}
				}).catch(e=>{
					this.topicObj.list[i].beloading = false;
				})
			},
			getThemeByCodeFun(){
				this.topicObj = ''
				this.beloading = true
				getThemeByCode({code:this.topicCode,shopId:this.$store.state.shopId}).then(data=>{
					this.beloading = false
					if(data.data.retCode===0){
						this.topicObj = data.data.result
						this.setTitle(this.topicObj.name)
						if(this.topicObj.color){
							this.cssObj = 'background-color:'+this.topicObj.color
						}
						if(this.topicObj.list){
							this.topicObj.list.forEach((item,i)=>{
								item.beloading = true
								item.products = []
								this.getProductByTopicFun(item.id,i)
							})
							this.topicObj = JSON.parse(JSON.stringify(this.topicObj))
						}
					}else{
						uni.showToast({
							title: data.data.retMsg,
							duration: 2000,
							icon:'none'
						});
					}
				}).catch(e=>{
					this.beloading = false
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
	uni-image{
		height: auto;
		div{
			height:auto;
		}
		img{
			position: relative;
			height: auto;
		}
	}
	.pos-r{
		position: relative;
	}
	.goHome{
		position: absolute;
		top:25upx;
		right:25upx;
		width:50upx;
		height: 50upx;
		font-size: 50upx;
		color: #fff;
		line-height: 50upx;
		font-weight: normal;
		z-index: 2;
	}
	.top-banner{
		width:750upx;
		height: 400upx;
		.img{
			width:750upx;
			height: 400upx;
		}
	}
	.li-til{
		line-height: 40upx;
		padding: 20upx;
		font-weight: bold;
		font-size: 36upx;
		text-align: center;
		.li-til-img{
			max-width: 100%;
		}
	}
</style>
