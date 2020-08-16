<template>
	<view class="b-c-w pad_t20 min-h100">
		<view class="mrg_lr15">
			<view class="btn f-c-primary b-all" @click="addAddress">添加收货地址</view>
		</view>
		<view v-if="addressList.length>0">
			<view class="address-li f-between-c mrg_tb10 b-b" :class="{act:item.checked,sel:ifSelect}" v-for="(item,i) in addressList" :key="i" @click="changeCheck(item)">
				<view>
					<view class="flex-box">
						<view class="font-32 l-h60">{{item.receiver}}</view>
						<view class="mrg_l10 font-28 l-h60">{{item.phone}}</view>
						<view v-if="item.ifDefault===0" class="defaultTag">默认</view>
					</view>
					<view>
					{{item.province ? item.province :''}}
					{{item.city ? item.city :''}}
					{{item.districts ? item.districts :''}}
					{{item.address ? item.address :''}}</view>
				</view>
				<view class="f-r-c action-box">
					<view class="tralfont tral-shanchu font-40 mrg_r20" @click.stop="deleteFun(item.id)"></view>
					<view class="tralfont tral-edit font-40 " @click.stop="editFun(item.id)"></view>
				</view>
			</view>
		</view>
		<view v-else>
			<empty v-if="!beloading" text="您还没有收货地址~" emptyType="7"></empty>
		</view>
		<view class="f-c-c mrg_tb10" v-if="beloading">
			<loading></loading>
		</view>
		<view class="mrg20" v-if="ifSelect">
			<view class="btn b-c-primary f-c-w" @click="submit">确定</view>
		</view>
	</view>
</template>

<script>
	import {getAddressList} from '@/http/product.js'
	import loading from '@/components/loading2.vue'
	export default {
		components: {
			loading
		},
		data(){
			return {
				cartItemIds:'',
				beloading:false,
				id:'',
				pages:1,
				params:{
					"pageNum": 1,
					"pageSize": 10
				},
				checkObj:'',
				ifSelect:false,
				addressList:[
					/* {
						name:'小米',
						id:'1',
						ifDefault: true,
						area:'广东省|广州市|天河区',
						address:'天河公园',
						checked: true
					},
					{
						name:'克里斯',
						id:'2',
						ifDefault: false,
						area:'广东省|广州市|天河区',
						address:'天河公园心园新村北师大街1巷6号',
						checked: false
					} */
				]
			}
		},
		onShow(){
			this.init();
		},
		onLoad(params){
			
			//this.init();
		},
		onReachBottom(){
			//加载下一页
			this.params.pageNum += 1;
			if(this.pages>=this.params.pageNum){
				this.getAddressListFun();
			}
			
		},
		methods:{
			init(){
				if(this.$root.$mp.query.ifSelect){
					this.ifSelect=true;
				}else{
					this.ifSelect=false;
				}
				if(this.$root.$mp.query.id){
					this.id = this.$root.$mp.query.id;
				}else{
					this.id =''
				}
				if(this.$root.$mp.query.cartItemIds){
					this.cartItemIds = this.$root.$mp.query.cartItemIds;
				}else{
					this.cartItemIds = '';
				}
				this.checkObj = '';
				this.getAddressListFun();
			},
			getAddressListFun(){
				this.beloading = true;
				//this.addressList=[];
				if(this.params.pageNum===1){
					this.addressList = [];
				}
				getAddressList(this.params).then(data=>{
					this.beloading = false;
					if(data.data.retCode===0){
						this.pages = data.data.result.pages
						let addressList = data.data.result.list.map(item=>{
							item.checked = false;
							return item;
						});
						this.addressList = [...this.addressList,...addressList]
					}
				}).catch(e=>{
					this.beloading = false;
				})
			},
			submit(){
				if(!this.checkObj){
					uni.showToast({
						title: '请选择地址',
						duration: 2000,
						icon:'none'
					});
				}
				let obj = {
					userName: this.checkObj.receiver,
					userPhone: this.checkObj.phone,
					userAddress: this.checkObj.province + this.checkObj.city + this.checkObj.districts + this.checkObj.address
				}
				console.log('=======>this.id:',this.id)
				if(this.id){
					uni.navigateTo({
						url: '/pages/product/order?id='+ this.id +'&address='+JSON.stringify(obj)+'&shopId='+this.$store.state.shopId
					});
				}else{
					uni.navigateTo({
						url: '/pages/product/order?cartItemIds='+ this.cartItemIds +'&address='+JSON.stringify(obj)+'&shopId='+this.$store.state.shopId
					});
				}
				
			},
			deleteFun(id){
				uni.showModal({
					title: '确认框',
					content: '是否确认删除？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			editFun(id){
				let url = '/pages/my/editAddress?id='+id+'&shopId='+this.$store.state.shopId;
				if(this.ifSelect){
					url = url+'&ifSelect=1'
					if(this.id){
						url = url+'&productId='+this.id;
					}else{
						url = url+'&cartItemIds='+this.cartItemIds;
					}
				}else if(this.id){
					url = url+'&productId='+this.id;
				}else if(this.cartItemIds){
					url = url+'&cartItemIds='+this.cartItemIds;
				}
				uni.navigateTo({
					url: url
				});
			},
			addAddress(){
				let url = '/pages/my/editAddress'+'?shopId='+this.$store.state.shopId;
				if(this.ifSelect){
					url = url+'&ifSelect=1'
					if(this.id){
						url = url+'&productId='+this.id;
					}else{
						url = url+'&cartItemIds='+this.cartItemIds;
					}
				}else if(this.id){
					url = url+'&productId='+this.id;
				}else if(this.cartItemIds){
					url = url+'&cartItemIds='+this.cartItemIds;
				}
				uni.navigateTo({
					url: url
				});
				
			},
			changeCheck(item){
				this.checkObj = item;
				this.addressList.forEach(it=>{
					if(it.id === item.id){
						it.checked = true;
					}else{
						it.checked = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.b-all{
		border:1px solid $uni-color-primary;
		
	}
	.defaultTag{
		padding:0 15upx;
		border:1px solid $uni-color-orange1;
		border-radius: 8upx;
		color:$uni-color-orange1;
		margin-left: 20upx;
		font-size: 24upx;
	}
	.address-li{
		padding-left: 30upx;
		padding-right: 30upx;
		padding-bottom: 10upx;
		box-sizing: border-box;
		border-bottom:1px solid $uni-bg-color-grey;
		&.sel{
			padding-left: 80upx;
			background:url(~@/static/uncheck.png) no-repeat 20upx center;
			background-size:50upx;
			&.act{
				background:url(~@/static/checked.png) no-repeat 20upx center;
				background-size:50upx;
			}
		}
		
	}
	.action-box{
		width:140upx;
	}
</style>
