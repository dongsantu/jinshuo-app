(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-product-search"],{1070:function(t,i,n){"use strict";n.r(i);var e=n("f495"),a=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(i,t,function(){return e[t]})}(o);i["default"]=a.a},2141:function(t,i,n){i=t.exports=n("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.til[data-v-8effcd1a]{line-height:%?60?%;font-size:%?32?%;font-weight:700}.tag[data-v-8effcd1a]{padding:%?5?% %?20?%;background-color:#f5f5f5;color:333;margin:%?5?%;border-radius:%?30?%}.warp[data-v-8effcd1a]{padding-top:%?20?%}.search-box[data-v-8effcd1a]{height:%?60?%;width:%?690?%;margin:0 %?30?%;border-radius:%?30?%;position:relative;background-color:#f5f5f5;box-sizing:border-box;padding:0 %?80?% 0 %?20?%}.search-box .input[data-v-8effcd1a]{width:100%;font-size:%?28?%;padding:%?10?%;box-sizing:border-box;height:%?60?%;color:#999}.search-box .search-btn[data-v-8effcd1a]{width:%?70?%;height:%?60?%;line-height:%?60?%;font-size:%?40?%;position:absolute;top:0;right:0;color:#333;text-align:center;vertical-align:middle}',""])},"3db8":function(t,i,n){"use strict";n.r(i);var e=n("5998"),a=n("1070");for(var o in a)"default"!==o&&function(t){n.d(i,t,function(){return a[t]})}(o);n("7f7e");var s,r=n("f0c5"),c=Object(r["a"])(a["default"],e["b"],e["c"],!1,null,"8effcd1a",null,!1,e["a"],s);i["default"]=c.exports},5998:function(t,i,n){"use strict";var e,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"b-c-w pad_tb15 b-b"},[n("v-uni-view",{staticClass:"search-box "},[n("v-uni-input",{staticClass:"input",model:{value:t.keyword,callback:function(i){t.keyword=i},expression:"keyword"}}),n("v-uni-view",{staticClass:"search-btn tralfont tral-sousuo",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.gotoSearch.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:" pad_lr15 pad_tb10 b-c-w mrg_b10"},[n("v-uni-view",{staticClass:"til mrg_b5"},[t._v("热门搜索")]),n("v-uni-view",{staticClass:"flex-box mrg_b5"},[n("v-uni-view",{staticClass:"tag",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickFun("门票")}}},[t._v("门票")]),n("v-uni-view",{staticClass:"tag",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clickFun("酒店")}}},[t._v("酒店")])],1)],1),n("v-uni-view",{staticClass:" pad_lr15 pad_tb10 b-c-w mrg_b10"},[n("v-uni-view",{staticClass:"til mrg_b5"},[t._v("搜索历史")]),n("v-uni-view",{staticClass:"flex-box mrg_b5"},t._l(t.history,function(i,e){return n("v-uni-view",{key:e,staticClass:"tag",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clickFun(i)}}},[t._v(t._s(i))])}),1)],1)],1)},o=[];n.d(i,"b",function(){return a}),n.d(i,"c",function(){return o}),n.d(i,"a",function(){return e})},"7f7e":function(t,i,n){"use strict";var e=n("a01f"),a=n.n(e);a.a},a01f:function(t,i,n){var e=n("2141");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("1d26e9f6",e,!0,{sourceMap:!1,shadowMode:!1})},f495:function(t,i,n){"use strict";var e=n("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("f499")),o={data:function(){return{keyword:"",history:[]}},onLoad:function(){this.init()},onShow:function(){this.init()},methods:{init:function(){this.keyword="";var t=uni.getStorageSync("history");this.history=t?JSON.parse(t):[]},clickFun:function(t){this.keyword=t,this.gotoSearch()},gotoSearch:function(){this.keyword&&""!==this.keyword?(-1==this.history.indexOf(this.keyword)&&(this.history.push(this.keyword),this.history.length>5&&this.history.splice(0,1),uni.setStorageSync("history",(0,a.default)(this.history))),uni.navigateTo({url:"/pages/product/searchList?keyword="+this.keyword+"&shopId="+this.$store.state.shopId})):uni.showToast({title:"请先输入搜索产品名",duration:2e3,icon:"none"})}}};i.default=o}}]);