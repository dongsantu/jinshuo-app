(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-home~pages-order-detail~pages-product-detail"],{"0066":function(t,e,o){"use strict";var n=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("f499"));o("c5f6");var r,u=n(o("a89c")),a={name:"tki-qrcode",props:{cid:{type:String,default:"tki-qrcode-canvas"},size:{type:Number,default:200},unit:{type:String,default:"upx"},show:{type:Boolean,default:!0},val:{type:String,default:""},background:{type:String,default:"#ffffff"},foreground:{type:String,default:"#000000"},pdground:{type:String,default:"#000000"},icon:{type:String,default:""},iconSize:{type:Number,default:40},lv:{type:Number,default:3},onval:{type:Boolean,default:!1},loadMake:{type:Boolean,default:!1},usingComponents:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},loadingText:{type:String,default:"二维码生成中"}},data:function(){return{result:""}},methods:{_makeCode:function(){var t=this;console.log("valmakecode",this.val),this._empty(this.val)?uni.showToast({title:"二维码内容不能为空",icon:"none",duration:2e3}):r=new u.default({context:t,canvasId:t.cid,usingComponents:t.usingComponents,showLoading:t.showLoading,loadingText:t.loadingText,text:t.val,size:t.cpSize,background:t.background,foreground:t.foreground,pdground:t.pdground,correctLevel:t.lv,image:t.icon,imageSize:t.iconSize,cbResult:function(e){t._result(e)}})},_clearCode:function(){this._result(""),r.clear()},_saveCode:function(){var t=this;""!=this.result&&uni.saveImageToPhotosAlbum({filePath:t.result,success:function(){uni.showToast({title:"二维码保存成功",icon:"success",duration:2e3})}})},_result:function(t){this.result=t,this.$emit("result",t)},_empty:function(t){var e=typeof t,o=!1;return"number"==e&&""==String(t)?o=!0:"undefined"==e?o=!0:"object"==e?"{}"!=(0,i.default)(t)&&"[]"!=(0,i.default)(t)&&null!=t||(o=!0):"string"==e?""!=t&&"undefined"!=t&&"null"!=t&&"{}"!=t&&"[]"!=t||(o=!0):"function"==e&&(o=!1),o}},watch:{size:function(t,e){var o=this;t==e||this._empty(t)||(this.cSize=t,this._empty(this.val)||setTimeout(function(){o._makeCode()},100))},val:function(t,e){var o=this;console.log("进n：",t),console.log("进o：",e),this.onval&&(console.log("进来生成"),t==e||this._empty(t)||(console.log("开始生成"),setTimeout(function(){o._makeCode()},0)))}},computed:{cpSize:function(){return"upx"==this.unit?uni.upx2px(this.size):this.size}},mounted:function(){var t=this;console.log("jjj"),this.loadMake&&(this._empty(this.val)||(console.log("this.val",this.val),setTimeout(function(){t._makeCode()},0)))}};e.default=a},"079a":function(t,e,o){"use strict";o.r(e);var n=o("62f6"),i=o("783d");for(var r in i)"default"!==r&&function(t){o.d(e,t,function(){return i[t]})}(r);o("ee5d");var u=o("2877"),a=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"1e5d184f",null);e["default"]=a.exports},"0f60":function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-popup[data-v-71509e1c]{position:fixed;top:0;bottom:0;left:0;right:0;z-index:99999;overflow:hidden}.uni-popup__mask[data-v-71509e1c]{position:absolute;top:0;bottom:0;left:0;right:0;z-index:998;background:rgba(0,0,0,.4);opacity:0}.uni-popup__mask.ani[data-v-71509e1c]{-webkit-transition:all .3s;transition:all .3s}.uni-popup__mask.uni-bottom[data-v-71509e1c],.uni-popup__mask.uni-center[data-v-71509e1c],.uni-popup__mask.uni-top[data-v-71509e1c]{opacity:1}.uni-popup__wrapper[data-v-71509e1c]{position:absolute;z-index:999;box-sizing:border-box}.uni-popup__wrapper.ani[data-v-71509e1c]{-webkit-transition:all .3s;transition:all .3s}.uni-popup__wrapper.top[data-v-71509e1c]{top:0;left:0;width:100%;-webkit-transform:translateY(-100%);transform:translateY(-100%)}.uni-popup__wrapper.bottom[data-v-71509e1c]{bottom:0;left:0;width:100%;-webkit-transform:translateY(100%);transform:translateY(100%)}.uni-popup__wrapper.center[data-v-71509e1c]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-71509e1c]{position:relative;box-sizing:border-box}.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box[data-v-71509e1c]{position:relative;max-width:98%;max-height:98%;overflow-y:scroll}.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box[data-v-71509e1c],.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box[data-v-71509e1c]{width:100%;max-height:500px;overflow-y:scroll}.uni-popup__wrapper.uni-bottom[data-v-71509e1c],.uni-popup__wrapper.uni-top[data-v-71509e1c]{-webkit-transform:translateY(0);transform:translateY(0)}.uni-popup__wrapper.uni-center[data-v-71509e1c]{-webkit-transform:scale(1);transform:scale(1);opacity:1}',""])},"1ef1":function(t,e,o){var n=o("0f60");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("4f06").default;i("24db433a",n,!0,{sourceMap:!1,shadowMode:!1})},"54b9":function(t,e,o){e=t.exports=o("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-image[data-v-1e5d184f]{height:auto}uni-image div[data-v-1e5d184f]{height:auto}uni-image img[data-v-1e5d184f]{position:relative;height:auto}.tki-qrcode[data-v-1e5d184f]{position:relative}.tki-qrcode-canvas[data-v-1e5d184f]{position:fixed;top:%?-99999?%;left:%?-99999?%;z-index:-99999}',""])},"55f8":function(t,e,o){var n=o("54b9");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=o("4f06").default;i("30d97697",n,!0,{sourceMap:!1,shadowMode:!1})},"62f6":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"tki-qrcode"},[o("v-uni-canvas",{staticClass:"tki-qrcode-canvas",style:{width:t.cpSize+"px",height:t.cpSize+"px"},attrs:{"canvas-id":t.cid}}),o("v-uni-image",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],style:{width:t.cpSize+"px"},attrs:{src:t.result}})],1)},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},"66ca":function(t,e,o){"use strict";o.r(e);var n=o("8a09"),i=o("884c");for(var r in i)"default"!==r&&function(t){o.d(e,t,function(){return i[t]})}(r);o("b091");var u=o("2877"),a=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"71509e1c",null);e["default"]=a.exports},"6c7b":function(t,e,o){var n=o("5ca1");n(n.P,"Array",{fill:o("36bd")}),o("9c6c")("fill")},"783d":function(t,e,o){"use strict";o.r(e);var n=o("0066"),i=o.n(n);for(var r in n)"default"!==r&&function(t){o.d(e,t,function(){return n[t]})}(r);e["default"]=i.a},"884c":function(t,e,o){"use strict";o.r(e);var n=o("bb67"),i=o.n(n);for(var r in n)"default"!==r&&function(t){o.d(e,t,function(){return n[t]})}(r);e["default"]=i.a},"8a09":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.showPopup?o("v-uni-view",{staticClass:"uni-popup"},[o("v-uni-view",{staticClass:"uni-popup__mask",class:[t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.maskClickFun.apply(void 0,arguments)}}}),o("v-uni-view",{staticClass:"uni-popup__wrapper",class:[t.type,t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close(!0)}}},[o("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1):t._e()},i=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i})},a842:function(t,e,o){t.exports=o.p+"static/img/yimailogo.111549ec.png"},a89c:function(t,e,o){"use strict";var n=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("f499"));o("6c7b"),o("c5f6");var r={};(function(){function t(t){var e,o,n;return t<128?[t]:t<2048?(e=192+(t>>6),o=128+(63&t),[e,o]):(e=224+(t>>12),o=128+(t>>6&63),n=128+(63&t),[e,o,n])}function e(e){for(var o=[],n=0;n<e.length;n++)for(var i=e.charCodeAt(n),r=t(i),u=0;u<r.length;u++)o.push(r[u]);return o}function o(t,o){this.typeNumber=-1,this.errorCorrectLevel=o,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=t,this.utf8bytes=e(t),this.make()}o.prototype={constructor:o,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var o=-1;o<=7;o++)if(!(t+o<=-1||this.moduleCount<=t+o))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+o][e+n]=0<=o&&o<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==o||6==o)||2<=o&&o<=4&&2<=n&&n<=4)},createQrcode:function(){for(var t=0,e=0,o=null,n=0;n<8;n++){this.makeImpl(n);var i=a.getLostPoint(this);(0==n||t>i)&&(t=i,e=n,o=this.modules)}this.modules=o,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var o=0;o<t.length;o++){var n=t[e],i=t[o];if(null==this.modules[n][i])for(var r=-2;r<=2;r++)for(var u=-2;u<=2;u++)this.modules[n+r][i+u]=-2==r||2==r||-2==u||2==u||0==r&&0==u}},setupTypeNumber:function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),o=0;o<18;o++){var n=!t&&1==(e>>o&1);this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=n,this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=n}},setupTypeInfo:function(t,e){for(var o=n[this.errorCorrectLevel]<<3|e,i=a.getBCHTypeInfo(o),r=0;r<15;r++){var u=!t&&1==(i>>r&1);r<6?this.modules[r][8]=u:r<8?this.modules[r+1][8]=u:this.modules[this.moduleCount-15+r][8]=u;u=!t&&1==(i>>r&1);r<8?this.modules[8][this.moduleCount-r-1]=u:r<9?this.modules[8][15-r-1+1]=u:this.modules[8][15-r-1]=u}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new d,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var n=0,i=this.utf8bytes.length;n<i;n++)t.put(this.utf8bytes[n],8);t.length+4<=8*this.totalDataCount&&t.put(0,4);while(t.length%8!=0)t.putBit(!1);while(1){if(t.length>=8*this.totalDataCount)break;if(t.put(o.PAD0,8),t.length>=8*this.totalDataCount)break;t.put(o.PAD1,8)}return this.createBytes(t)},createBytes:function(t){for(var e=0,o=0,n=0,i=this.rsBlock.length/3,r=new Array,u=0;u<i;u++)for(var s=this.rsBlock[3*u+0],l=this.rsBlock[3*u+1],p=this.rsBlock[3*u+2],d=0;d<s;d++)r.push([p,l]);for(var f=new Array(r.length),h=new Array(r.length),g=0;g<r.length;g++){var m=r[g][0],v=r[g][1]-m;o=Math.max(o,m),n=Math.max(n,v),f[g]=new Array(m);for(u=0;u<f[g].length;u++)f[g][u]=255&t.buffer[u+e];e+=m;var w=a.getErrorCorrectPolynomial(v),y=new c(f[g],w.getLength()-1),b=y.mod(w);h[g]=new Array(w.getLength()-1);for(u=0;u<h[g].length;u++){var C=u+b.getLength()-h[g].length;h[g][u]=C>=0?b.get(C):0}}var x=new Array(this.totalDataCount),A=0;for(u=0;u<o;u++)for(g=0;g<r.length;g++)u<f[g].length&&(x[A++]=f[g][u]);for(u=0;u<n;u++)for(g=0;g<r.length;g++)u<h[g].length&&(x[A++]=h[g][u]);return x},mapData:function(t,e){for(var o=-1,n=this.moduleCount-1,i=7,r=0,u=this.moduleCount-1;u>0;u-=2){6==u&&u--;while(1){for(var s=0;s<2;s++)if(null==this.modules[n][u-s]){var l=!1;r<t.length&&(l=1==(t[r]>>>i&1));var c=a.getMask(e,n,u-s);c&&(l=!l),this.modules[n][u-s]=l,i--,-1==i&&(r++,i=7)}if(n+=o,n<0||this.moduleCount<=n){n-=o,o=-o;break}}}}},o.PAD0=236,o.PAD1=17;for(var n=[1,0,3,2],u={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){var e=t<<10;while(a.getBCHDigit(e)-a.getBCHDigit(a.G15)>=0)e^=a.G15<<a.getBCHDigit(e)-a.getBCHDigit(a.G15);return(t<<10|e)^a.G15_MASK},getBCHTypeNumber:function(t){var e=t<<12;while(a.getBCHDigit(e)-a.getBCHDigit(a.G18)>=0)e^=a.G18<<a.getBCHDigit(e)-a.getBCHDigit(a.G18);return t<<12|e},getBCHDigit:function(t){var e=0;while(0!=t)e++,t>>>=1;return e},getPatternPosition:function(t){return a.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,o){switch(t){case u.PATTERN000:return(e+o)%2==0;case u.PATTERN001:return e%2==0;case u.PATTERN010:return o%3==0;case u.PATTERN011:return(e+o)%3==0;case u.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2==0;case u.PATTERN101:return e*o%2+e*o%3==0;case u.PATTERN110:return(e*o%2+e*o%3)%2==0;case u.PATTERN111:return(e*o%3+(e+o)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new c([1],0),o=0;o<t;o++)e=e.multiply(new c([1,s.gexp(o)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),o=0,n=0,i=0;i<e;i++)for(var r=0,u=t.modules[i][0],a=0;a<e;a++){var s=t.modules[i][a];if(a<e-6&&s&&!t.modules[i][a+1]&&t.modules[i][a+2]&&t.modules[i][a+3]&&t.modules[i][a+4]&&!t.modules[i][a+5]&&t.modules[i][a+6]&&(a<e-10?t.modules[i][a+7]&&t.modules[i][a+8]&&t.modules[i][a+9]&&t.modules[i][a+10]&&(o+=40):a>3&&t.modules[i][a-1]&&t.modules[i][a-2]&&t.modules[i][a-3]&&t.modules[i][a-4]&&(o+=40)),i<e-1&&a<e-1){var l=0;s&&l++,t.modules[i+1][a]&&l++,t.modules[i][a+1]&&l++,t.modules[i+1][a+1]&&l++,0!=l&&4!=l||(o+=3)}u^s?r++:(u=s,r>=5&&(o+=3+r-5),r=1),s&&n++}for(a=0;a<e;a++)for(r=0,u=t.modules[0][a],i=0;i<e;i++){s=t.modules[i][a];i<e-6&&s&&!t.modules[i+1][a]&&t.modules[i+2][a]&&t.modules[i+3][a]&&t.modules[i+4][a]&&!t.modules[i+5][a]&&t.modules[i+6][a]&&(i<e-10?t.modules[i+7][a]&&t.modules[i+8][a]&&t.modules[i+9][a]&&t.modules[i+10][a]&&(o+=40):i>3&&t.modules[i-1][a]&&t.modules[i-2][a]&&t.modules[i-3][a]&&t.modules[i-4][a]&&(o+=40)),u^s?r++:(u=s,r>=5&&(o+=3+r-5),r=1)}var c=Math.abs(100*n/e/e-50)/5;return o+=10*c,o}},s={glog:function(t){if(t<1)throw new Error("glog("+t+")");return s.LOG_TABLE[t]},gexp:function(t){while(t<0)t+=255;while(t>=256)t-=255;return s.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},l=0;l<8;l++)s.EXP_TABLE[l]=1<<l;for(l=8;l<256;l++)s.EXP_TABLE[l]=s.EXP_TABLE[l-4]^s.EXP_TABLE[l-5]^s.EXP_TABLE[l-6]^s.EXP_TABLE[l-8];for(l=0;l<255;l++)s.LOG_TABLE[s.EXP_TABLE[l]]=l;function c(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);var o=0;while(o<t.length&&0==t[o])o++;this.num=new Array(t.length-o+e);for(var n=0;n<t.length-o;n++)this.num[n]=t[n+o]}c.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),o=0;o<this.getLength();o++)for(var n=0;n<t.getLength();n++)e[o+n]^=s.gexp(s.glog(this.get(o))+s.glog(t.get(n)));return new c(e,0)},mod:function(t){var e=this.getLength(),o=t.getLength();if(e-o<0)return this;for(var n=new Array(e),i=0;i<e;i++)n[i]=this.get(i);while(n.length>=o){var r=s.glog(n[0])-s.glog(t.get(0));for(i=0;i<t.getLength();i++)n[i]^=s.gexp(s.glog(t.get(i))+r);while(0==n[0])n.shift()}return new c(n,0)}};var p=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];function d(){this.buffer=new Array,this.length=0}o.prototype.getRightType=function(){for(var t=1;t<41;t++){var e=p[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var o=e.length/3,n=0,i=0;i<o;i++){var r=e[3*i+0],u=e[3*i+2];n+=u*r}var a=t>9?2:1;if(this.utf8bytes.length+a<n||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=n;break}}},d.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var o=0;o<e;o++)this.putBit(t>>>e-o-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var f=[];r=function(t){if(this.options={text:"",size:256,correctLevel:3,background:"#ffffff",foreground:"#000000",pdground:"#000000",image:"",imageSize:30,canvasId:t.canvasId,context:t.context,usingComponents:t.usingComponents,showLoading:t.showLoading,loadingText:t.loadingText},"string"===typeof t&&(t={text:t}),t)for(var e in t)this.options[e]=t[e];for(var n=null,r=(e=0,f.length);e<r;e++)if(f[e].text==this.options.text&&f[e].text.correctLevel==this.options.correctLevel){n=f[e].obj;break}e==r&&(n=new o(this.options.text,this.options.correctLevel),f.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:n}));var u=function(t){var e=t.options;return e.pdground&&(t.row>1&&t.row<5&&t.col>1&&t.col<5||t.row>t.count-6&&t.row<t.count-2&&t.col>1&&t.col<5||t.row>1&&t.row<5&&t.col>t.count-6&&t.col<t.count-2)?e.pdground:e.foreground},a=function(t){t.showLoading&&uni.showLoading({title:t.loadingText,mask:!0});for(var e=uni.createCanvasContext(t.canvasId,t.context),o=n.getModuleCount(),i=t.size,r=t.imageSize,a=(i/o).toPrecision(4),l=(i/o).toPrecision(4),c=0;c<o;c++)for(var p=0;p<o;p++){var d=Math.ceil((p+1)*a)-Math.floor(p*a),f=Math.ceil((c+1)*a)-Math.floor(c*a),h=u({row:c,col:p,count:o,options:t});e.setFillStyle(n.modules[c][p]?h:t.background),e.fillRect(Math.round(p*a),Math.round(c*l),d,f)}if(t.image){var g=function(e,o,n,i,r,u,a,s,l){e.setLineWidth(a),e.setFillStyle(t.background),e.setStrokeStyle(t.background),e.beginPath(),e.moveTo(o+u,n),e.arcTo(o+i,n,o+i,n+u,u),e.arcTo(o+i,n+r,o+i-u,n+r,u),e.arcTo(o,n+r,o,n+r-u,u),e.arcTo(o,n,o+u,n,u),e.closePath(),s&&e.fill(),l&&e.stroke()},m=Number(((i-r)/2).toFixed(2)),v=Number(((i-r)/2).toFixed(2));g(e,m,v,r,r,2,6,!0,!0),e.drawImage(t.image,m,v,r,r)}setTimeout(function(){e.draw(!0,function(){setTimeout(function(){uni.canvasToTempFilePath({width:t.width,height:t.height,destWidth:t.width,destHeight:t.height,canvasId:t.canvasId,quality:Number(1),success:function(e){t.cbResult&&(s(e.tempFilePath)?s(e.apFilePath)?t.cbResult(e.tempFilePath):t.cbResult(e.apFilePath):t.cbResult(e.tempFilePath))},fail:function(e){t.cbResult&&t.cbResult(e)},complete:function(){uni.hideLoading()}},t.context)},t.text.length+100)})},t.usingComponents?0:150)};a(this.options);var s=function(t){var e=typeof t,o=!1;return"number"==e&&""==String(t)?o=!0:"undefined"==e?o=!0:"object"==e?"{}"!=(0,i.default)(t)&&"[]"!=(0,i.default)(t)&&null!=t||(o=!0):"string"==e?""!=t&&"undefined"!=t&&"null"!=t&&"{}"!=t&&"[]"!=t||(o=!0):"function"==e&&(o=!1),o}},r.prototype.clear=function(t){var e=uni.createCanvasContext(this.options.canvasId,this.options.context);e.clearRect(0,0,this.options.size,this.options.size),e.draw(!1,function(){t&&t()})}})();var u=r;e.default=u},b091:function(t,e,o){"use strict";var n=o("1ef1"),i=o.n(n);i.a},b78d:function(t,e,o){"use strict";var n=o("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.getSpuByPage=r,e.getSpuInfoBySpuId=u,e.getFirstPageCategorys=a,e.getExcellent=s,e.createOrder=l,e.cancelOrder=c,e.queryOrderList=p,e.queryOrderDetail=d,e.wechatPay=f,e.getCollectList=h,e.addCollect=g,e.delCollect=m,e.getIfCollect=v,e.submitWXOrder=w,e.getCoupons=y,e.receiveCoupon=b,e.useCoupon=C,e.checkCoupon=x,e.getMyCoupons=A,e.getMyCouponDetail=T,e.getMyCouponsCount=P,e.getOrderCountWithStatus=_,e.getMyCouponByTargetId=k,e.getWXAuth=B,e.addAddress=L,e.updateAddress=E,e.getAddressList=N,e.getAddressByid=M,e.queryAdByCode=S,e.shortUrl=R,e.getThemeByCode=I,e.getProductByTopic=z,e.queryPopAdByCode=D,e.geocoderF=O,e.getCityList=F,e.schedule=j;var i=n(o("afbe"));function r(t){return i.default.post("/itemApi/v1/wx/spu/getSpuByPage",t)}function u(t){return i.default.post("/itemApi/v1/wx/spu/getSpuInfoBySpuId",t)}function a(t){return i.default.post("/itemApi/v1/wx/spu/getFirstPageCategorys",t)}function s(t){return i.default.post("/itemApi/v1/wx/spu/getExcellent",t)}function l(t){return i.default.post("/orderApi/v1/wx/gd/add",t)}function c(t){return i.default.post("/orderApi/v1/wx/gd/cancelOrder",t)}function p(t){return i.default.post("/orderApi/v1/wx/gd/query",t)}function d(t){return i.default.post("/orderApi/v1/wx/gd/queryDetail",t)}function f(t){return i.default.post("/orderApi/v1/wx/gd/pay/wechat",t)}function h(t){return i.default.post("/userApi/v1/wx/collect/getByPage",t)}function g(t){return i.default.post("/userApi/v1/wx/collect/create",t)}function m(t){return i.default.get("/userApi/v1/wx/collect/delete/"+t.id,t)}function v(t){return i.default.post("/userApi/v1/wx/collect/checkIsCollect",t)}function w(t){return i.default.post("/orderApi/v1/wx/gd/pay/wechat",t)}function y(t){return i.default.post("/itemApi/v1/wx/coupon/getCoupons",t)}function b(t){return i.default.post("/itemApi/v1/wx/coupon/receiveCoupon",t)}function C(t){return i.default.post("/itemApi/v1/api/coupon/useCoupon",t)}function x(t){return i.default.post("/itemApi/v1/api/coupon/checkCoupon",t)}function A(t){return i.default.post("/itemApi/v1/wx/coupon/getMyCoupons",t)}function T(t){return i.default.get("/itemApi/v1/wx/coupon/getById/"+t.id)}function P(t){return i.default.get("/itemApi/v1/wx/coupon/getMyCouponsCount")}function _(t){return i.default.get("/orderApi/v1/wx/gd/getOrderCountWithStatus")}function k(t){return i.default.post("/itemApi/v1/wx/coupon/getMyCouponByTargetId",t)}function B(t){return i.default.post("/userApi/v1/wx/login/sign",t)}function L(t){return i.default.post("/userApi/v1/wx/address/create",t)}function E(t){return i.default.post("/userApi/v1/wx/address/update",t)}function N(t){return i.default.post("/userApi/v1/wx/address/getByPage",t)}function M(t){return i.default.get("/userApi/v1/wx/address/getAddressByid/"+t.id)}function S(t){return i.default.post("/itemApi/v1/wx/ad/queryAdByCode",t)}function R(t){return i.default.post("http://t1.ymzby.com/v1/api/shortUrl/build",t)}function I(t){return i.default.post("/itemApi/v1/wx/topic/getThemeByCode",t)}function z(t){return i.default.post("/itemApi/v1/wx/topic/getProductByTopic",t)}function D(t){return i.default.post("/itemApi/v1/wx/ad/queryPopAdByCode",t)}function O(t){return i.default.post("/userApi/v1/api/map/geocoder",{location:t.lat+","+t.lng})}function F(t){return i.default.get("/itemApi/v1/manager/city/getCityList/"+t.shopId)}function j(t){return i.default.post("/orderApi/v1/wx/gd/express/schedule",t)}},bb67:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0},show:{type:Boolean,default:!0},maskClickCallback:{type:Function}},data:function(){return{ani:"",showPopup:!1}},watch:{show:function(t){t?this.open():this.close()}},created:function(){},methods:{clear:function(){},open:function(){var t=this;this.$emit("change",{show:!0}),this.showPopup=!0,this.$nextTick(function(){setTimeout(function(){t.ani="uni-"+t.type},30)})},maskClickFun:function(){this.close(!0),this.maskClickCallback&&this.maskClickCallback()},close:function(t){var e=this;!this.maskClick&&t||(this.$emit("change",{show:!1}),this.ani="",this.$nextTick(function(){setTimeout(function(){e.showPopup=!1},300)}))}}};e.default=n},ee5d:function(t,e,o){"use strict";var n=o("55f8"),i=o.n(n);i.a}}]);