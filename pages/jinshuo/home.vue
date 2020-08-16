<template>
	<view class="warp">
		<spu-list :list="spuList" :beloading="beloading"></spu-list>
	</view>
</template>

<script>
	import {
		queryGdsSpuPage
	} from '@/http/jinshuo_gds'
	import spuList from '@/components/spu-list'
	export default {
		components:{spuList},
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
					this.spuList = [];
				}
				console.log('this.spuList>',this.spuList)
				this.beloading = true;
				//this.params.shopId=this.$store.state.shopId;
				queryGdsSpuPage(this.params).then(data=>{
					this.beloading = false;
					console.log('data---',data)
					if(data.data.retCode===0){
						console.log('data.data.retCode',data.data.retCode)
						let spuList = data.data.result.list;
						console.log('this.productList->',this.spuList)
						this.spuList = [...this.spuList,...spuList]
						console.log('this.spuList>',this.spuList)
						this.pages = data.data.result.pages;
						this.params.pageNum = data.data.result.pageNum;
						console.log('data.data.result.pageNum',data.data.result.pageNum)
						console.log('end ======= data.data.result.pageNum',data.data.result.pageNum)
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
