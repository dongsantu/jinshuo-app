<template>
  <view class="wrap" v-if="fetchLoading">
    <view class="spinner">
      <view class="double-bounce1"></view>
      <view class="double-bounce2"></view>
    </view>
    <view class="load-tips">加载中...</view>
  </view>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  computed:{
    fetchLoading(){
      return this.$store.state.fetchLoading
    }
  },
  onLoad(){
    this.$store.commit('CLEARLOADING');
  }
}
</script>

<style lang="scss" scoped>

.wrap {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255,.4);
  border-radius: 2vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999999;
}

.load-tips {
  text-align: center;
  font-size: 30upx;
}

.spinner {
  width: 50px;
  height: 50px;
  position: relative;
  margin: 65% auto;
  margin-bottom: 30px;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #facd2d;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

</style>
