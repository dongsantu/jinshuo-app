(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-list"],{"118a":function(t,e,n){"use strict";var o=n("77b8"),u=n.n(o);u.a},3376:function(t,e,n){"use strict";n.r(e);var o=n("b956"),u=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=u.a},"77b8":function(t,e,n){var o=n("ffe7");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var u=n("4f06").default;u("f7f6ace0",o,!0,{sourceMap:!1,shadowMode:!1})},b78d:function(t,e,n){"use strict";var o=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getSpuByPage=r,e.getSpuInfoBySpuId=i,e.getFirstPageCategorys=a,e.getExcellent=s,e.createOrder=d,e.cancelOrder=c,e.queryOrderList=p,e.queryOrderDetail=l,e.wechatPay=f,e.getCollectList=g,e.addCollect=m,e.delCollect=v,e.getIfCollect=h,e.submitWXOrder=y,e.getCoupons=w,e.receiveCoupon=x,e.useCoupon=A,e.checkCoupon=C,e.getMyCoupons=b,e.getMyCouponDetail=I,e.getMyCouponsCount=B,e.getOrderCountWithStatus=P,e.getMyCouponByTargetId=S,e.getWXAuth=L,e.addAddress=F,e.updateAddress=M,e.getAddressList=_,e.getAddressByid=q,e.queryAdByCode=O,e.shortUrl=$,e.getThemeByCode=k,e.getProductByTopic=N,e.queryPopAdByCode=T,e.geocoderF=E,e.getCityList=H,e.schedule=U;var u=o(n("afbe"));function r(t){return u.default.post("/itemApi/v1/wx/spu/getSpuByPage",t)}function i(t){return u.default.post("/itemApi/v1/wx/spu/getSpuInfoBySpuId",t)}function a(t){return u.default.post("/itemApi/v1/wx/spu/getFirstPageCategorys",t)}function s(t){return u.default.post("/itemApi/v1/wx/spu/getExcellent",t)}function d(t){return u.default.post("/orderApi/v1/wx/gd/add",t)}function c(t){return u.default.post("/orderApi/v1/wx/gd/cancelOrder",t)}function p(t){return u.default.post("/orderApi/v1/wx/gd/query",t)}function l(t){return u.default.post("/orderApi/v1/wx/gd/queryDetail",t)}function f(t){return u.default.post("/orderApi/v1/wx/gd/pay/wechat",t)}function g(t){return u.default.post("/userApi/v1/wx/collect/getByPage",t)}function m(t){return u.default.post("/userApi/v1/wx/collect/create",t)}function v(t){return u.default.get("/userApi/v1/wx/collect/delete/"+t.id,t)}function h(t){return u.default.post("/userApi/v1/wx/collect/checkIsCollect",t)}function y(t){return u.default.post("/orderApi/v1/wx/gd/pay/wechat",t)}function w(t){return u.default.post("/itemApi/v1/wx/coupon/getCoupons",t)}function x(t){return u.default.post("/itemApi/v1/wx/coupon/receiveCoupon",t)}function A(t){return u.default.post("/itemApi/v1/api/coupon/useCoupon",t)}function C(t){return u.default.post("/itemApi/v1/api/coupon/checkCoupon",t)}function b(t){return u.default.post("/itemApi/v1/wx/coupon/getMyCoupons",t)}function I(t){return u.default.get("/itemApi/v1/wx/coupon/getById/"+t.id)}function B(t){return u.default.get("/itemApi/v1/wx/coupon/getMyCouponsCount")}function P(t){return u.default.get("/orderApi/v1/wx/gd/getOrderCountWithStatus")}function S(t){return u.default.post("/itemApi/v1/wx/coupon/getMyCouponByTargetId",t)}function L(t){return u.default.post("/userApi/v1/wx/login/sign",t)}function F(t){return u.default.post("/userApi/v1/wx/address/create",t)}function M(t){return u.default.post("/userApi/v1/wx/address/update",t)}function _(t){return u.default.post("/userApi/v1/wx/address/getByPage",t)}function q(t){return u.default.get("/userApi/v1/wx/address/getAddressByid/"+t.id)}function O(t){return u.default.post("/itemApi/v1/wx/ad/queryAdByCode",t)}function $(t){return u.default.post("http://t1.ymzby.com/v1/api/shortUrl/build",t)}function k(t){return u.default.post("/itemApi/v1/wx/topic/getThemeByCode",t)}function N(t){return u.default.post("/itemApi/v1/wx/topic/getProductByTopic",t)}function T(t){return u.default.post("/itemApi/v1/wx/ad/queryPopAdByCode",t)}function E(t){return u.default.post("/userApi/v1/api/map/geocoder",{location:t.lat+","+t.lng})}function H(t){return u.default.get("/itemApi/v1/manager/city/getCityList/"+t.shopId)}function U(t){return u.default.post("/orderApi/v1/wx/gd/express/schedule",t)}},b956:function(t,e,n){"use strict";var o=n("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=o(n("75fc")),r=o(n("9c23")),i=o(n("f7b9")),a=n("b78d"),s={components:{uniGrid:i.default,productList:r.default},onReachBottom:function(){this.params.pageNum+=1,this.pages>=this.params.pageNum&&this.getSpuByPageFun()},onLoad:function(t){},onShow:function(){this.$root.$mp.query.categoryId?this.params.categoryId=this.$root.$mp.query.categoryId:this.params.categoryId="",this.init()},data:function(){return{act:"",beloading:!1,pages:1,params:{isHot:"",isScareBuy:"",pageNum:1,pageSize:10,qryType:"",categoryId:""},menuList:[],productList:[]}},methods:{getFirstPageCategorysFun:function(){var t=this;(0,a.getFirstPageCategorys)({shopId:this.$store.state.shopId}).then(function(e){0===e.data.retCode&&(t.menuList=e.data.result.map(function(e){return{image:t.$imgHost+e.pictureUrl,text:e.name,url:"/pages/product/list?shopId="+t.$store.state.shopId,categoryId:e.id}}))}).catch()},changMenu:function(t){this.pages=1,this.params.pageNum=1,this.params.categoryId=t,this.getSpuByPageFun()},init:function(){this.getSpuByPageFun(),this.getFirstPageCategorysFun(),uni.removeStorageSync("order")},getSpuByPageFun:function(){var t=this;1===this.params.pageNum&&(this.productList=[]),this.beloading=!0,this.params.shopId=this.$store.state.shopId,(0,a.getSpuByPage)(this.params).then(function(e){if(t.beloading=!1,console.log("data---",e),0===e.data.retCode){var n=e.data.result.list.map(function(t){return t.name.length>26?t.sortName=t.name.substr(0,25)+"...":t.sortName=t.name,t});t.productList=[].concat((0,u.default)(t.productList),(0,u.default)(n)),t.pages=e.data.result.pages,t.params.pageNum=e.data.result.pageNum}}).catch(function(e){t.beloading=!1})}}};e.default=s},cc58:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"b-c-w"},[t.menuList.length>0?n("v-uni-view",{staticClass:"menu-box"},[n("v-uni-scroll-view",{staticClass:"b-b b-c-w pad10 scroll-view_H menu-box-list",attrs:{"scroll-x":!0,"scroll-into-view":"menu"+t.params.categoryId}},t._l(t.menuList,function(e,o){return n("v-uni-view",{key:o,staticClass:" menu-li scroll-view-item_H",class:{act:t.params.categoryId===e.categoryId},attrs:{id:"menu"+e.categoryId},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.changMenu(e.categoryId)}}},[n("v-uni-view",{staticClass:"f-m"},[n("v-uni-view",{staticClass:"m-img pad_t10"},[n("v-uni-image",{staticClass:"m-img-img",attrs:{src:e.image}})],1),n("v-uni-view",{},[t._v(t._s(e.text))])],1)],1)}),1)],1):t._e(),n("product-list",{attrs:{list:t.productList,beloading:t.beloading}})],1)},u=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u})},ea90:function(t,e,n){"use strict";n.r(e);var o=n("cc58"),u=n("3376");for(var r in u)"default"!==r&&function(t){n.d(e,t,function(){return u[t]})}(r);n("118a");var i=n("2877"),a=Object(i["a"])(u["default"],o["a"],o["b"],!1,null,"25020fa1",null);e["default"]=a.exports},ffe7:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.menu-box[data-v-25020fa1]{width:100%;overflow:hidden;overflow-x:scroll;position:relative}.menu-box .menu-box-list[data-v-25020fa1]{white-space:nowrap;width:auto}.m-img[data-v-25020fa1]{width:%?60?%;height:%?60?%;padding:%?10?% %?30?% 0}.m-img .m-img-img[data-v-25020fa1]{width:%?60?%;height:%?60?%}.menu-li[data-v-25020fa1]{width:%?120?%;margin:0 %?10?%;box-sizing:border-box;display:inline-block;border:1px solid #fff}.menu-li.act[data-v-25020fa1]{background-color:#fff0f5;border-radius:%?10?%;border:1px solid #f9cddc}',""])}}]);