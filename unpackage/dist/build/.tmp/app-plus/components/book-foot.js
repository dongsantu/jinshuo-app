(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/book-foot"],{"2f0f":function(t,e,i){"use strict";var o,n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return n}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return o})},"3f4c":function(t,e,i){"use strict";i.r(e);var o=i("2f0f"),n=i("4479");for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);i("5137");var c,u=i("f0c5"),r=Object(u["a"])(n["default"],o["b"],o["c"],!1,null,"00154048",null,!1,o["a"],c);e["default"]=r.exports},4479:function(t,e,i){"use strict";i.r(e);var o=i("add8"),n=i.n(o);for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);e["default"]=n.a},5137:function(t,e,i){"use strict";var o=i("61f3"),n=i.n(o);n.a},"61f3":function(t,e,i){},add8:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={props:["collect","goBuy","isCollect","activeStatus"],methods:{gotoChat:function(){window.location.href="https://xiaokefu.com.cn/s/942930vs?nickName="+this.nickname+"&weixin=1&mobile="+this.mobile+"&openid="+this.openid+"&avatarUrl="+this.avatar},gotoBuy:function(){this.gobuy()},changeCollect:function(){this.ifCollect=!this.ifCollect,this.collect(this.ifCollect)}},data:function(){return{selected:"",ifCollect:!1}},computed:{mobile:function(){return this.$store.state.login&&this.$store.state.login.user&&this.$store.state.login.user.userAccount?this.$store.state.login.user.userAccount.phone:""},openid:function(){return this.$store.state.login&&this.$store.state.login.user?this.$store.state.login.user.openid:""},avatar:function(){return this.$store.state.login&&this.$store.state.login.user?this.$store.state.login.user.avatar:""},nickname:function(){return this.$store.state.login&&this.$store.state.login.user?this.$store.state.login.user.nickname:""},activeStatus1:function(){return this.activeStatus?this.activeStatus:""}},watch:{isCollect:function(){this.ifCollect=this.isCollect}},onLoad:function(){this.ifCollect=this.isCollect},onShow:function(){this.ifCollect=this.isCollect}};e.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/book-foot-create-component',
    {
        'components/book-foot-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("3f4c"))
        })
    },
    [['components/book-foot-create-component']]
]);