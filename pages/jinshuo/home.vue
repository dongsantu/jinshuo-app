<template>
	<view class="warp">
		
		<view class="uni-padding-wrap" v-if="banner && banner.length>0">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,i) in banner" :key="i">
							<view @click="goPage(item.link)">
							<view class="swiper-item">
								<image class="img" :src="item.img"/>
							</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<product-list :list="productList" :beloading="beloading"></product-list>
		
	</view>
</template>

<script>
	import productList from '@/components/product-list'
	import {queryGdsSpuPage} from '@/http/jinshuo_gds.js'
	
	export default {
		data() {
			return {
				beloading: false,
				productList:[],
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				banner:[
					 {
						img:'http://img.gzymtech.com/10088/1/hd/02c6d2a7-bf08-4519-bdd2-febd3a864fc3.jpg',
						link:'/pages/product/detail?id=114789666640625664'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/eb99a230-58d2-4f1d-98d5-cc6096970285.jpg',
						link:'/pages/product/detail?id=114821245257646080'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/c8494cf7-52f3-45f2-8ea1-f161271bb61a.jpg',
						link:'/pages/product/detail?id=114789258773921792'
					},
					{
						img:'http://img.gzymtech.com/10088/1/hd/a55ab8a6-b64f-422c-a59a-275dbf229116.jpg',
						link:'/pages/product/detail?id=114795324538617856'
					}, 
				]
				
			}
		},
		onLoad() {
			this.queryGdsSpuPageFun();
		},
		methods: {
			
			queryGdsSpuPageFun(){
				console.log('this.params.pageNum---',this.params.pageNum)
				console.log('this.params.pageNum===1---',this.params.pageNum===1)
				if(this.params.pageNum===1){
					this.productList = [];
				}
				console.log('this.productList0->',this.productList)
				this.beloading = true;
				this.params.shopId=this.$store.state.shopId;
				queryGdsSpuPage(this.params).then(data=>{
					this.beloading = false;
					console.log('data---',data)
					if(data.data.retCode===0){
						
						let productList = data.data.result.list.map(item=>{
							if(item.name.length>26){
								item.sortName = item.name.substr(0,25)+'...'
							}else{
								item.sortName = item.name
							}
							return item
						});
						console.log('this.productList->',this.productList)
						this.productList = [...this.productList,...productList]
						console.log('this.productList1->',this.productList)
						this.pages = data.data.result.pages;
						this.params.pageNum = data.data.result.pageNum;
						console.log('data.data.result.pageNum',data.data.result.pageNum)
					}
					//this.setHeight();
				}).catch(e=>{
					this.beloading = false;
				})
			}
			
		}
	}
</script>

<style>
	.warp{
		background: #fff;
		padding-top: 20upx;
	}

</style>
