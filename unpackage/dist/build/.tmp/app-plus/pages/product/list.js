(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/product/list"],{3376:function(t,e,n){"use strict";n.r(e);var a=n("c314"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=r.a},4775:function(t,e,n){"use strict";(function(t){n("20e7"),n("921b");a(n("66fd"));var e=a(n("ea90"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"73fd":function(t,e,n){"use strict";var a=n("862e"),r=n.n(a);r.a},"862e":function(t,e,n){},c314:function(t,e,n){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("b78d");function o(t){return s(t)||u(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function s(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var c=function(){return n.e("components/product-list").then(n.bind(null,"9c23"))},d=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"f7b9"))},p={components:{uniGrid:d,productList:c},onReachBottom:function(){this.params.pageNum+=1,this.pages>=this.params.pageNum&&this.getSpuByPageFun()},onLoad:function(t){},onShow:function(){this.$root.$mp.query.categoryId?this.params.categoryId=this.$root.$mp.query.categoryId:this.params.categoryId="",this.init()},data:function(){return{act:"",beloading:!1,pages:1,params:{isHot:"",isScareBuy:"",pageNum:1,pageSize:10,qryType:"",categoryId:""},menuList:[],productList:[]}},methods:{getFirstPageCategorysFun:function(){var t=this;(0,r.getFirstPageCategorys)({shopId:this.$store.state.shopId}).then(function(e){0===e.data.retCode&&(t.menuList=e.data.result.map(function(e){return{image:t.$imgHost+e.pictureUrl,text:e.name,url:"/pages/product/list?shopId="+t.$store.state.shopId,categoryId:e.id}}))}).catch()},changMenu:function(t){this.pages=1,this.params.pageNum=1,this.params.categoryId=t,this.getSpuByPageFun()},init:function(){this.getSpuByPageFun(),this.getFirstPageCategorysFun(),t.removeStorageSync("order")},getSpuByPageFun:function(){var t=this;1===this.params.pageNum&&(this.productList=[]),this.beloading=!0,this.params.shopId=this.$store.state.shopId,(0,r.getSpuByPage)(this.params).then(function(e){if(t.beloading=!1,console.log(a("data---",e," at pages\\product\\list.vue:110")),0===e.data.retCode){var n=e.data.result.list.map(function(t){return t.name.length>26?t.sortName=t.name.substr(0,25)+"...":t.sortName=t.name,t});t.productList=[].concat(o(t.productList),o(n)),t.pages=e.data.result.pages,t.params.pageNum=e.data.result.pageNum}}).catch(function(e){t.beloading=!1})}}};e.default=p}).call(this,n("6e42")["default"],n("0de9")["default"])},c5af:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return a})},ea90:function(t,e,n){"use strict";n.r(e);var a=n("c5af"),r=n("3376");for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);n("73fd");var i,u=n("f0c5"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"2215d01f",null,!1,a["a"],i);e["default"]=s.exports}},[["4775","common/runtime","common/vendor"]]]);