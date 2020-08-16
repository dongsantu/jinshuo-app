<template>
	<view class="warp">
		
			<spu-list :list="productList" :beloading="beloading"></spu-list>

	</view>
</template>

<script>
	import {
		queryGdsSpuPage
	} from '@/http/jinshuo_gds'
	import spuList from '@/components/spu-list'
	export default {
		comments:{spuList},
		data() {
			return {				
				params:{
					"isHot": 0,
					"isScareBuy": 0,
					"pageNum": 1,
					"pageSize": 10,
					"qryType":'',
					"areaName":''
				},
				spuList:[]

			}
		},
		onLoad(){
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
						this.spuList = [...this.productList,...productList]
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
	.warp {
		background: #fff;
		padding-top: 20upx;
	}
</style>
