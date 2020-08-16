(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/xyz-tab/xyz-tab"],{"029e":function(t,e,n){"use strict";var a,c=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",function(){return c}),n.d(e,"c",function(){return u}),n.d(e,"a",function(){return a})},2116:function(t,e,n){"use strict";n.r(e);var a=n("4e41"),c=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=c.a},"4e41":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{tabList:{type:Array,default:function(){return[]}},tabActiveIdx:{type:Number,default:0},isScroll:{type:Boolean,default:!1},callback:{type:Function}},data:function(){return{tabIdx:0,scrollLeft:0}},watch:{tabActiveIdx:function(e,n){console.log(t("newValue",e," at components\\xyz-tab\\xyz-tab.vue:52")),this.tabSelect(e)}},methods:{tabSelect:function(e){console.log(t("idx:::",e," at components\\xyz-tab\\xyz-tab.vue:58")),this.tabIdx=e,this.scrollLeft=30*e,this.callback&&this.callback(e)}}};e.default=n}).call(this,n("0de9")["default"])},d75c:function(t,e,n){"use strict";var a=n("ef2b"),c=n.n(a);c.a},e4a0:function(t,e,n){"use strict";n.r(e);var a=n("029e"),c=n("2116");for(var u in c)"default"!==u&&function(t){n.d(e,t,function(){return c[t]})}(u);n("d75c");var o,l=n("f0c5"),r=Object(l["a"])(c["default"],a["b"],a["c"],!1,null,"42e7d55f",null,!1,a["a"],o);e["default"]=r.exports},ef2b:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/xyz-tab/xyz-tab-create-component',
    {
        'components/xyz-tab/xyz-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("e4a0"))
        })
    },
    [['components/xyz-tab/xyz-tab-create-component']]
]);
