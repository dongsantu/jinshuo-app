(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/maiCenter/spreadProduct"],{"0db5":function(t,e,o){"use strict";var n=o("4e3d"),i=o.n(n);i.a},"1a2b":function(t,e,o){"use strict";o.r(e);var n=o("f017"),i=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);e["default"]=i.a},"1cf3":function(t,e,o){"use strict";o.r(e);var n=o("3217"),i=o("1a2b");for(var s in i)"default"!==s&&function(t){o.d(e,t,function(){return i[t]})}(s);o("0db5");var a,r=o("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"33076789",null,!1,n["a"],a);e["default"]=u.exports},3217:function(t,e,o){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];o.d(e,"b",function(){return i}),o.d(e,"c",function(){return s}),o.d(e,"a",function(){return n})},"4e3d":function(t,e,o){},"897b":function(t,e,o){"use strict";(function(t){o("20e7"),o("921b");n(o("66fd"));var e=n(o("1cf3"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("6e42")["createPage"])},f017:function(t,e,o){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o("b78d"),s=o("1022"),a=r(o("1668"));function r(t){return t&&t.__esModule?t:{default:t}}function u(t){return h(t)||d(t)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function h(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}var p=function(){return o.e("components/uni-popup/uni-popup").then(o.bind(null,"66ca"))},l=function(){return o.e("components/loading2").then(o.bind(null,"49d2"))},f=window.location.origin,g={data:function(){return{shareText:"",nowObj:"",shareQrcode:"",beloading:!1,list:[],pages:1,params:{pageNum:1,pageSize:10}}},components:{loading:l,uniPopup:p},onLoad:function(t){},onShow:function(){this.init()},onReachBottom:function(){this.params.pageNum+=1,this.pages>=this.params.pageNum&&this.queryDisProductFun()},computed:{avatar:function(){return this.$store.state.login&&this.$store.state.login.user?this.$store.state.login.user.avatar:""},nickname:function(){return this.$store.state.login&&this.$store.state.login.user?this.$store.state.login.user.nickname:""},inviteCode:function(){return this.$store.state.login&&this.$store.state.login.user&&this.$store.state.login.user.userAccount?this.$store.state.login.user.userAccount.inviteCode:""},isOver:function(){return!this.pages||!this.params.pageNum||this.pages>this.params.pageNum},isToken:function(){return this.$store.state.login?this.$store.state.login.token:""}},watch:{isToken:function(){this.init()}},methods:{copyFun:function(){t.setClipboardData({data:this.shareText,success:function(e){t.showToast({title:"复制成功，快去分享给朋友吧！",duration:2e3,icon:"none"})},fail:function(e){t.showToast({title:"复制失败，请手动复制",duration:2e3,icon:"none"})},complete:function(t){}})},shortUrlFun:function(){var e=this,o=f+"/#/pages/product/detail?id="+this.nowObj.productId+"&shopId="+this.$store.state.shopId;0===this.$store.state.shopType&&(o=o+"&inviteCode="+this.inviteCode),(0,i.shortUrl)({url:o}).then(function(o){o.data.success?e.shareText=e.nowObj.productName+" "+o.data.shortUrl:t.showToast({title:o.data.retMsg,duration:2e3,icon:"none"})}).catch(function(e){t.showToast({title:e.data.retMsg,duration:2e3,icon:"none"})})},toShare:function(){var t=window.location.href.split("#")[0],e=this.nowObj.productName||"亿麦周边游商品",o=this.nowObj.sketch||"亿麦周边游商品...",n=f+"/#/pages/product/detail?id="+this.nowObj.productId+"&shopId="+this.$store.state.shopId;0===this.$store.state.shopType&&(n=n+"&inviteCode="+this.inviteCode);var i={title:e,desc:o,linkurl:n,img:this.$imgHost+this.nowObj.pictureUrl};a.default.getJSSDK(t,i)},showShareWX:function(){this.toShare(),this.$refs.popup2.open()},hideShareWX:function(){this.$refs.popup2.close()},createSharePicFun:function(e){var o=this,n=f+"/#/pages/product/detail?id="+this.nowObj.productId+"&shopId="+this.$store.state.shopId;0===this.$store.state.shopType&&(n=n+"&inviteCode="+this.inviteCode);var i={inviteCode:this.inviteCode,headImgUrl:this.avatar,productId:e.productId,referrerName:this.nickname,shareUrl:n};(0,s.createSharePic)(i).then(function(t){0===t.data.retCode&&(o.shareQrcode=o.$imgHost+t.data.result)}).catch(function(e){t.showToast({title:e.data.retMsg,duration:2e3,icon:"none"})})},createShareProductFun:function(e){var o=this,n=f+"/#/pages/product/detail?id="+this.nowObj.productId+"&shopId="+this.$store.state.shopId;0===this.$store.state.shopType&&(n=n+"&inviteCode="+this.inviteCode);var i={headImgUrl:this.avatar,productId:e.productId,referrerName:this.nickname,shareUrl:n};(0,s.createShareProduct)(i).then(function(t){0===t.data.retCode&&(o.shareQrcode=o.$imgHost+t.data.result)}).catch(function(e){t.showToast({title:e.data.retMsg,duration:2e3,icon:"none"})})},queryDisProductFun:function(){var t=this;this.beloading=!0,(0,s.queryDisProduct)(this.params).then(function(e){if(t.beloading=!1,1===t.params.pageNum&&(t.list=[]),0===e.data.retCode&&e.data.result.list){var o=e.data.result.list.map(function(t){return t.sortName=t.productName,t.productName&&t.productName.length>26&&(t.sortName=t.productName.substr(0,25)+"..."),t});t.list=[].concat(u(t.list),u(o)),t.pages=e.data.result.pages,t.params.pageNum=e.data.result.pageNum}}).catch(function(e){t.beloading=!1})},init:function(){this.isToken&&this.queryDisProductFun()},showCode1:function(){this.shortUrlFun(),this.$refs.popup4.open()},showCode2:function(){this.createShareProductFun(this.nowObj),this.$refs.popup1.open()},showMenu:function(t){this.nowObj=t,this.$refs.popup.open()},hideMenu:function(){this.$refs.popup.close(),this.shareQrcode=""},showMenu1:function(){this.$refs.popup1.open()},hideMenu1:function(){console.log(n("-----\x3e"," at pages\\maiCenter\\spreadProduct.vue:313")),this.$refs.popup1.close(),this.shareQrcode=""},hideMenu4:function(){console.log(n("-----\x3e"," at pages\\maiCenter\\spreadProduct.vue:318")),this.$refs.popup4.close(),this.shareText=""},getCollectListFun:function(){var t=this;this.beloading=!0,(0,i.getCollectList)().then(function(e){t.beloading=!1,0===e.data.retCode&&e.data.result.list&&(t.list=e.data.result.list,t.pages=e.data.result.pages,t.params.pageNum=e.data.result.pageNum)}).catch(function(e){t.beloading=!1})},goProduct:function(e){t.navigateTo({url:"/pages/product/detail?id="+e+"&shopId="+this.$store.state.shopId})}}};e.default=g}).call(this,o("6e42")["default"],o("0de9")["default"])}},[["897b","common/runtime","common/vendor"]]]);