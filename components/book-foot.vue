<style lang="scss" scoped>
.foot-item{
  color: #515151;
  text-align: center;
  width:130upx;
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
.f-c-w{
	color:#fff;
}
.f-b{
	font-weight: bold;
}
</style>
<template>
  <view>
    <view class="f-c flex-box">
      <navigator open-type="reLaunch" :url="'/pages/home/home?shopId='+$store.state.shopId" hover-class="act" class="foot-item" >
        <view class="foot-icon-item">
          <view class="tralfont foot-icon tral-tubiao-"></view>
        </view>
        <view class="foot-text">首页</view>
      </navigator>
      <view class="foot-item" @click="changeCollect"> 
		<view class="foot-icon-item" :class="{'f-c-orange1':ifCollect}">
          <view v-if="ifCollect" class="tralfont foot-icon tral-shoucang3"></view>
          <view v-else class="tralfont foot-icon tral-shoucang1"></view>
        </view>
        <view class="foot-text" :class="{'f-c-orange1':ifCollect}">收藏</view>
      </view>
	  <view @click="gotoChat" hover-class="act" class="foot-item" >
	    <view class="foot-icon-item">
	      <view class="tralfont foot-icon tral-kefu"></view>
	    </view>
	    <view class="foot-text">客服</view>
	  </view>
	  <view class="text-c flex-item b-c-primary f-b f-c-c f-c-w font-36 " @click="goBuy" v-if="activeStatus1===2">立即抢购</view>
	  <view class="text-c flex-item b-c-gr2 f-b f-c-c f-c-w font-36 " v-if="activeStatus1===1">未开始</view>
	  <view class="text-c flex-item b-c-gr2 f-b f-c-c f-c-w font-36 " v-if="activeStatus1===3">已结束</view>
	  <view class="text-c flex-item b-c-gr2 f-b f-c-c f-c-w font-36 " v-if="activeStatus1===4">已售罄</view>
     
    </view>
  </view>
</template>
<script>
export default {
	props:['collect','goBuy','isCollect','activeStatus'],
    methods: {
		gotoChat(){
			window.location.href = 'https://xiaokefu.com.cn/s/942930vs?nickName='+ this.nickname+'&weixin=1&mobile='+this.mobile+'&openid='+this.openid+'&avatarUrl='+this.avatar
		},
		gotoBuy(){
			this.gobuy();
		},
      changeCollect(){
		this.ifCollect = !this.ifCollect;
		this.collect(this.ifCollect);
	  }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        selected: '',
		ifCollect: false
      }
    },
	computed:{
		mobile(){
			if(this.$store.state.login && this.$store.state.login.user && this.$store.state.login.user.userAccount){
				return this.$store.state.login.user.userAccount.phone
			}
			return ''
		},
		openid(){
			if(this.$store.state.login && this.$store.state.login.user){
				return this.$store.state.login.user.openid
			}
			return ''
		},
		avatar(){
			if(this.$store.state.login && this.$store.state.login.user){
				return this.$store.state.login.user.avatar
			}
			return ''
		},
		nickname(){
			if(this.$store.state.login && this.$store.state.login.user){
				return this.$store.state.login.user.nickname
			}
			return ''
		},
		activeStatus1(){
			if(this.activeStatus){
				return this.activeStatus;
			}
			return ''
		}
	},
	watch:{
		isCollect(){
			this.ifCollect = this.isCollect;
		}
	},
	onLoad(){
		this.ifCollect = this.isCollect;
	},
	onShow(){
		this.ifCollect = this.isCollect;
	}
    
}
</script>
