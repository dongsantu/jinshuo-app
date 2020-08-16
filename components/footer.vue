<style lang="scss" scoped>
.foot-item{
  color: #515151;
  text-align: center;
  &.act{
    color: $uni-color-primary;
  }
}
.foot-icon{
  font-size: 50rpx;
  line-height: 60rpx;
}
.foot-text{
  line-height: 40rpx;
  font-size: 28rpx;
}
</style>
<template>
  <view>
    <view class="f-c flex-box">
      <navigator open-type="reLaunch" :url="'/pages/home/home?shopId='+$store.state.shopId" hover-class="act" class="foot-item" :class="{act: selected =='pages/home/home'}">
        <view class="foot-icon-item">
          <view class="tralfont foot-icon tral-tubiao-"></view>
        </view>
        <view class="foot-text">首页</view>
      </navigator>
      
	  <navigator open-type="reLaunch" :url="'/pages/order/list?shopId='+$store.state.shopId" hover-class="act" class="foot-item" :class="{act: selected =='pages/order/list'}">
	    <view class="foot-icon-item">
	      <view class="tralfont foot-icon tral-dingdan1"></view>
	    </view>
	    <view class="foot-text">订单</view>
	  </navigator>
	  <template v-if="$store.state.shopType===0">
		<navigator v-if="isDis===0 || isDis===1" open-type="reLaunch" :url="'/pages/maiCenter/center?shopId='+$store.state.shopId" hover-class="act" class="foot-item" :class="{act: selected =='pages/maiCenter/center'}">
		  <view class="foot-icon-item">
		    <view class="tralfont foot-icon tral-RectangleCopy"></view>
		  </view>
		  <view class="foot-text">麦客</view>
		</navigator>
		<navigator v-else open-type="reLaunch" :url="'/pages/maiCenter/intro?shopId='+$store.state.shopId" hover-class="act" class="foot-item" :class="{act: selected =='pages/maiCenter/intro'}">
		  <view class="foot-icon-item">
		    <view class="tralfont foot-icon tral-RectangleCopy"></view>
		  </view>
		  <view class="foot-text">麦客</view>
		</navigator>
	  </template>
      <navigator open-type="reLaunch" :url="'/pages/my/my?shopId='+$store.state.shopId" hover-class="act" class="foot-item" :class="{act: selected =='pages/my/my'}">
        <view class="foot-icon-item">
          <view class="tralfont foot-icon tral-wode"></view>
        </view>
        <view class="foot-text">我的</view>
      </navigator>
     
    </view>
  </view>
</template>
<script>
export default {
    methods: {
      matchUrl(){
        let currentPages = getCurrentPages();
        this.selected = currentPages[currentPages.length-1].route;
		console.log('selected',this.selected)
      }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        selected: ''
      }
    },
	computed:{
		isDis(){
			if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.member){
				return this.$store.state.login.user.member.isDis
			}
			return ''
		},
	},
    onLoad(){
		console.log('load')
      this.matchUrl();
    },
    onShow () {
		console.log('show')
      this.matchUrl();
      //this.changeMenuActive();
    },
	onReady(){
		console.log('ready')
		this.matchUrl();
	},
    created(){
		console.log('created')
      this.matchUrl();
    }

}
</script>
