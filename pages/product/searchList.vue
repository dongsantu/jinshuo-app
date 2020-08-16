<template>
	<view class="b-c-w">
		<product-list :list="productList" :beloading="beloading"></product-list>
	</view>
</template>

<script>
	import productList from '@/components/product-list'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import {getSpuByPage} from '@/http/product'
	export default {
		components: {
			uniGrid,
			productList
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum += 1;
			if(this.pages>=this.params.pageNum){
				this.getSpuByPageFun();
			}
			
		},
		onShow(){
			
			if(this.$root.$mp.query.keyword){
				this.params.name=this.$root.$mp.query.keyword;
			}
			this.init();
		},
		onLoad(params){
			/* if(params.keyword){
				this.params.name=params.keyword;
			}
			this.init() */
		},
		data(){
			return {
				beloading:false,
				pages:1, // 总页数
				params:{
					"isHot": 0,
					"isScareBuy": 0,
					"pageNum": 1,
					"pageSize": 10,
					"qryType":'',
					"name":''
				},
				menuList: [{
						image: '/static/c1.png',
						text: '酒店',
						url:'/pages/product/list'
					},
					{
						image: '/static/c2.png',
						text: '海边',
						url:'/pages/product/list'
					},
					{
						image: '/static/c3.png',
						text: '亲子',
						url:'/pages/product/list'
					},
					{
						image: '/static/c4.png',
						text: '温泉',
						url:'/pages/product/list'
					},
					{
						image: '/static/c5.png',
						text: '别墅',
						url:'/pages/product/list'
					}
				],
				productList:[]
			}
		},
		methods:{
			init(){
				this.getSpuByPageFun();
			},
			getSpuByPageFun(){
				if(this.params.pageNum===1){
					this.productList = [];
				}
				this.beloading = true;
				this.params.shopId=this.$store.state.shopId;
				getSpuByPage(this.params).then(data=>{
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
						this.productList = [...this.productList,...productList]
						this.pages = data.data.result.pages;
						this.params.pageNum = data.data.result.pageNum;
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
</style>
