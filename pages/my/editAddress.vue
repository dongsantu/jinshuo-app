<template>
	<view class="b-c-w min-h100">
		<view class="flex-box pad10 b-b">
			<view class="lab">收件人</view>
			<view class="f-c-c">
				<input class="font-28" type="text" placeholder="请输入收件人姓名" v-model="address.receiver" />
			</view>
		</view>
		<view class="flex-box pad10 b-b">
			<view class="lab">手机</view>
			<view class="f-c-c">
				<input type="number" class="font-28" placeholder="请输入手机号码" v-model="address.phone" />
			</view>
		</view>
		<view class="flex-box pad10 b-b">
			<view class="lab">所在地区</view>
			<view class="f-c-c">
				<!-- <input class="font-24" type="text" placeholder="请输入" v-model="address.name" /> -->
				<view class="font-28" @click="openPicker" v-if="address.province">{{address.province}} {{address.city}} {{address.districts}}</view>
				<view class="font-28" @click="openPicker" v-else>选择地区</view>
			</view>
		</view>
		<view class="flex-box pad10 b-b">
			<view class="lab">详细地址</view>
			<view class="flex-item">
				<!-- <input class="font-28" type="text" placeholder="请输入" v-model="address.address" /> -->
				<textarea class="font-28 textarea" v-model="address.address" placeholder="请输入详细地址(50个字以内)" @blur="cutStr"/>
			</view>
		</view>
		<view class="flex-box pad10 b-b">
			<view class="lab l-h80">设为默认</view>
			<view class="flex-item">
				<switch style="transform:scale(0.8)" color="#f60837" :checked="address.isDefault" @change="changeDefault" />
			</view>
		</view>
		<view class="mrg20">
			<view class="btn b-c-primary f-c-w" @click="saveAddress">保存</view>
		</view>
		<view class="h30"></view>
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import lotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	import {addAddress, updateAddress,getAddressByid} from '@/http/product.js'
	export default {
		components:{
			"lotus-address":lotusAddress
		},
		data(){
			return {
				cartItemIds:'',
				productId:'',
				ifSelect:false,
				 lotusAddressData:{
					visible:false,
					provinceName:'',
					cityName:'',
					townName:'',
				},
				address:{
					"address": "",
					"city": "",
					"districts": "",
					"id": '',
					"isDefault": true,
					"phone": "",
					"province": "",
					"receiver": ""
				}
			}
		},
		onLoad(params){
			/* if(params.id){
				this.address.id = params.id;
			} */
			//this.init();
		},
		onShow(){
			/* if(this.$root.$mp.query.id){
				this.address.id=this.$root.$mp.query.id;
			} */
			this.init();
		},
		methods:{
			cutStr(){
				this.address.address = this.address.address.substr(0,50)
			},
			gotoList(){
				let url = '/pages/my/addressList'
				if(this.ifSelect){
					url = url+'?ifSelect=1'
					if(this.productId){
						url = url+'&id='+this.productId;
					}else{
						url = url+'&cartItemIds='+this.cartItemIds;
					}
				}else if(this.productId){
					url = url+'?id='+this.productId;
				}else if(this.cartItemIds){
					url = url+'?cartItemIds='+this.cartItemIds;
				}
				setTimeout(()=>{
					uni.navigateTo({
						url: url
					})
				}, 2000);
			},
			addAddressFun(){
				let address  = JSON.parse(JSON.stringify(this.address))
				address.isDefault = address.isDefault ? 0 : 1
				addAddress(address).then(data=>{
					if(data.data.retCode ===0){
						uni.showToast({
							title: '添加成功',
							duration: 2000,
							icon:'none'
						});
						this.gotoList()
					}
				}).catch()
			},
			updateAddressFun(){
				let address  = JSON.parse(JSON.stringify(this.address))
				address.isDefault = address.isDefault ? 0 : 1
				updateAddress(address).then(data=>{
					if(data.data.retCode ===0){
						uni.showToast({
							title: '修改成功',
							duration: 2000,
							icon:'none'
						});
						this.gotoList()
					}
				}).catch()
			},
			init(){
				if(this.$root.$mp.query.id){
					this.address.id=this.$root.$mp.query.id;
				}
				if(this.$root.$mp.query.ifSelect){
					this.ifSelect=true;
				}else{
					this.ifSelect=false;
				}
				if(this.$root.$mp.query.productId){
					this.productId = this.$root.$mp.query.productId;
				}else{
					this.productId = ''
				}
				if(this.$root.$mp.query.cartItemIds){
					this.cartItemIds = this.$root.$mp.query.cartItemIds;
				}else{
					this.cartItemIds = ''
				}
				if(this.address.id){
					this.getAddressByidFun();
				}
			},
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
			},
			//回传已选的省市区的值
			choseValue(res){
				//res数据源包括已选省市区与省市区code
				console.log(res);
				this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if(res.isChose){
					this.lotusAddressData.provinceName = res.provice;//省
					this.lotusAddressData.cityName = res.city;//市
					this.lotusAddressData.townName = res.town;//区
					this.address.province = res.provice;//省
					this.address.city = res.city;//市
					this.address.districts = res.town;//区
					//this.region = `${res.provice} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
			getAddressByidFun(){
				getAddressByid({id:this.address.id}).then(data=>{
					if(data.data.retCode ===0){
						this.address = data.data.result
						this.lotusAddressData.provinceName = this.address.province;//省
						this.lotusAddressData.cityName = this.address.city;//市
						this.lotusAddressData.townName = this.address.districts;//区
						this.address.isDefault = this.address.isDefault===0
					}
				}).catch(e=>{
					uni.showToast({
						title: e.data.retMsg,
						duration: 2000,
						icon:'none'
					});
				})
			},
			saveAddress(){
				if(this.address.id){
					this.updateAddressFun()
				}else{
					this.addAddressFun()
				}
			},
			changeDefault(){
				this.address.ifDefault = !this.address.ifDefault;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.textarea{
		width:auto;
		height: 120upx;
	}
	.lab{
		width: 160upx;
	}
</style>
