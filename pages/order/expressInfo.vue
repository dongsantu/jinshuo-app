<template>
	<view class="b-c-w">
		<view v-if="expressObj.Traces && expressObj.Traces.length>0">
			<uni-steps :options="expressObj.Traces" direction="column" :active="expressObj.Traces.length-1"></uni-steps>
		</view>
		
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"
	import {schedule} from '@/http/product.js'
	export default {
		components: {uniSteps},
		data(){
			return {
				id:'',
				expressObj:{},
				list:[{title:'买家下单',desc:'2018-11-11'},{title:'卖家发货',desc:'2018-11-12'},{title:'买家签收',desc:'2018-11-13'},{title:'交易完成',desc:'2018-11-14'}]
			}
		},
		methods:{
			init(){
				this.scheduleFun()
			},
			scheduleFun(){
				schedule({id:this.id}).then(data=>{
					if(data.data.retCode===0){
						this.expressObj = data.data.result;
						if(this.expressObj.Traces){
							this.expressObj.Traces.forEach(item=>{
								item.title = item.AcceptStation;
								item.desc = item.AcceptTime;
							})
						}
					}
				}).catch(e=>{
					
				})
			}
		},
		onShow(){
			if(this.$root.$mp.query.id){
				this.id=this.$root.$mp.query.id;
			}
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
</style>
