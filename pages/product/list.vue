<template>
	<view class="b-c-w">
		<!-- <view class="b-b b-c-w"><uni-grid :options="menuList" :show-border="false" :column-num="5" :needAct="true" :act="params.categoryId" /></view> -->
		<view class="menu-box" v-if="menuList.length>0">
			<scroll-view :scroll-x="true" class="b-b b-c-w pad10 scroll-view_H menu-box-list" :scroll-into-view="'menu'+params.categoryId">
				<view :id="'menu'+item.categoryId" class=" menu-li scroll-view-item_H" v-for="(item,i) in menuList" :key="i" @click="changMenu(item.categoryId)" :class="{act:params.categoryId===item.categoryId}">
					<view class="f-m">
						<view class="m-img pad_t10">
							<image class="m-img-img" :src="item.image"></image>
						</view>
						<view class="">{{item.text}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<product-list :list="productList" :beloading="beloading"></product-list>
	</view>
</template>

<script>
	import productList from '@/components/product-list'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import {getSpuByPage,getFirstPageCategorys} from '@/http/product'
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
		onLoad(params){
			/* if(params.categoryId){
				this.params.categoryId=params.categoryId;
			}else{
				this.params.categoryId=''
			}
			this.init() */
		},
		onShow(){
			if(this.$root.$mp.query.categoryId){
				this.params.categoryId=this.$root.$mp.query.categoryId;
			}else{
				this.params.categoryId=''
			}
			this.init()
		},
		data(){
			return {
				act:'',
				beloading:false,
				pages:1, // 总页数
				params:{
					"isHot": '',
					"isScareBuy": '',
					"pageNum": 1,
					"pageSize": 10,
					"qryType":'',
					"categoryId":''
				},
				menuList: [],
				productList:[]
			}
		},
		/* onShow(){
			this.init()
			},
		onLoad(){
			this.init()
			}, */
		methods:{
			getFirstPageCategorysFun(){
				getFirstPageCategorys({shopId:this.$store.state.shopId}).then(data=>{
					if(data.data.retCode===0){
						this.menuList = data.data.result.map(item=>{
							return {
								image: this.$imgHost+item.pictureUrl,
								text: item.name,
								url:'/pages/product/list?shopId='+this.$store.state.shopId,
								categoryId:item.id
							};
						})
					}
				}).catch()
			},
			changMenu(categoryId){
				this.pages = 1;
				this.params.pageNum = 1;
				this.params.categoryId = categoryId;
				this.getSpuByPageFun();
			},
			init(){
				this.getSpuByPageFun();
				this.getFirstPageCategorysFun();
				uni.removeStorageSync('order');
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

<style lang="scss" scoped>
	.menu-box{
		width: 100%;
		overflow: hidden;
		overflow-x:scroll;
		position:relative;
		.menu-box-list{
			white-space: nowrap;
			width:auto;
		}
	}
	.m-img{
		width:60upx;
		height: 60upx;
		padding:10upx 30upx 0;
		.m-img-img{
			width:60upx;
			height: 60upx;
		}
	}
	.menu-li{
		width:120upx;
		margin:0 10upx;
		box-sizing:border-box;
		display:inline-block;
		border:1px solid #fff;
		&.act{
			background-color:#FFF0F5;
			border-radius: 10upx;
			border:1px solid #f9cddc;
		}
	}
</style>
