import api from '@/js_sdk/luch-request/index';


//用户端 
//获取产品列表
export function getSpuByPage (parameter) {
  return api.post('/itemApi/v1/wx/spu/getSpuByPage',parameter)
}

//获取产品详情 
export function getSpuInfoBySpuId (parameter) {
  return api.post('/itemApi/v1/wx/spu/getSpuInfoBySpuId',parameter)
}

//获取首页产品分类
export function getFirstPageCategorys (parameter) {
  return api.post('/itemApi/v1/wx/spu/getFirstPageCategorys',parameter)
}

//获取首页优品产品 
export function getExcellent (parameter) {
  return api.post('/itemApi/v1/wx/spu/getExcellent',parameter)
}

//添加订单 
export function createOrder (parameter) {
  return api.post('/orderApi/v1/wx/gd/add',parameter)
}
//取消订单
export function cancelOrder (parameter) {
  return api.post('/orderApi/v1/wx/gd/cancelOrder',parameter)
}

// 查询订单列表
export function queryOrderList (parameter) {
  return api.post('/orderApi/v1/wx/gd/query',parameter)
}

// 查询订单详情
export function queryOrderDetail (parameter) {
  return api.post('/orderApi/v1/wx/gd/queryDetail',parameter)
}

//支付订单
export function wechatPay (parameter) {
  return api.post('/orderApi/v1/wx/gd/pay/wechat',parameter)
}

//获取收藏列表
export function getCollectList (parameter) {
  return api.post('/userApi/v1/wx/collect/getByPage',parameter)
}
//添加收藏夹
export function addCollect (parameter) {
  return api.post('/userApi/v1/wx/collect/create',parameter)
}
//取消收藏夹
export function delCollect (parameter) {
  return api.get('/userApi/v1/wx/collect/delete/'+parameter.id,parameter)
}
//获取产品是否收藏
export function getIfCollect (parameter) {
  return api.post('/userApi/v1/wx/collect/checkIsCollect',parameter)
}

//支付 
export function submitWXOrder(parameter){
	return api.post('/orderApi/v1/wx/gd/pay/wechat',parameter)
}

//优惠券 获取优惠券列表
export function getCoupons(parameter){
	return api.post('/itemApi/v1/wx/coupon/getCoupons',parameter)
}
//领取优惠券
export function receiveCoupon(parameter){
	return api.post('/itemApi/v1/wx/coupon/receiveCoupon',parameter)
}
//使用优惠券
export function useCoupon(parameter){
	return api.post('/itemApi/v1/api/coupon/useCoupon',parameter)
}
//校验优惠券是否可用
export function checkCoupon(parameter){
	return api.post('/itemApi/v1/api/coupon/checkCoupon',parameter)
}

//获取优惠券列表 /v1/wx/coupon/getCoupons
export function getMyCoupons(parameter){
	return api.post('/itemApi/v1/wx/coupon/getMyCoupons',parameter)
}
//查优惠券详情 
export function getMyCouponDetail(parameter){
	return api.get('/itemApi/v1/wx/coupon/getById/'+parameter.id)
}
//
export function getMyCouponsCount(parameter){
	return api.get('/itemApi/v1/wx/coupon/getMyCouponsCount')
}

//获取订单状态数
export function getOrderCountWithStatus(parameter){
	return api.get('/orderApi/v1/wx/gd/getOrderCountWithStatus')
}

//根据订单信息查询可用优惠券
export function getMyCouponByTargetId(parameter){
	return api.post('/itemApi/v1/wx/coupon/getMyCouponByTargetId',parameter)
}

//根据订单信息查询可用优惠券
export function getWXAuth(parameter){
	//return api.post('/orderApi/v1/wx/gd/sign',parameter)
	return api.post('/userApi/v1/wx/login/sign',parameter)
}

//添加地址
export function addAddress(parameter){
	return api.post('/userApi/v1/wx/address/create',parameter)
}
//修改地址
export function updateAddress(parameter){
	return api.post('/userApi/v1/wx/address/update',parameter)
}
//分页查询我常用地址
export function getAddressList(parameter){
	return api.post('/userApi/v1/wx/address/getByPage',parameter)
}
//{id}
export function getAddressByid(parameter){
	return api.get('/userApi/v1/wx/address/getAddressByid/'+parameter.id)
}

//根据广告位Code查询广告
export function queryAdByCode(parameter){
	return api.post('/itemApi/v1/wx/ad/queryAdByCode',parameter)
}

//获取短连接 http://192.168.2.105:8585/v1/api/shortUrl/build
export function shortUrl(parameter){
	//return api.post('http://192.168.2.105:8585/v1/api/shortUrl/build',parameter)
	return api.post('http://t1.ymzby.com/v1/api/shortUrl/build',parameter)
}
///v1/wx/topic/getThemeByCode/{code}根据活动code查询主题列表
export function getThemeByCode(parameter){
	return api.post('/itemApi/v1/wx/topic/getThemeByCode', parameter)
}
///v1/wx/topic/getProductByTopic 根据主题查询产品
export function getProductByTopic(parameter){
	return api.post('/itemApi/v1/wx/topic/getProductByTopic',parameter)
}

// 弹出广告查询
export function queryPopAdByCode(parameter){
	return api.post('/itemApi/v1/wx/ad/queryPopAdByCode',parameter)
}

//经纬度转地址
export function geocoderF(parameter){
	return api.post('/userApi/v1/api/map/geocoder',{location:parameter.lat +','+ parameter.lng})
	/* let param={
		key:"AW4BZ-OXFWU-7M3VA-4KR4Q-L436T-FTBBM",//开发密钥
		location: parameter.lat +','+ parameter.lng,//"32.078857,118.77397",//位置坐标
		get_poi:"0",//是否返回周边POI列表：1.返回；0不返回(默认)
		coord_type:"1",//输入的locations的坐标类型,1 GPS坐标
		//parameter:{"scene_type":"tohome","poi_num":20},//附加控制功能
		//output:"jsonp"
	}
	return api.get('https://apis.map.qq.com/ws/geocoder/v1',param) */
}
// /v1/manager/city/getCityList/{shopId} 根据shopId查询开通区域
export function getCityList(parameter){
	return api.get('/itemApi/v1/manager/city/getCityList/'+parameter.shopId)
}

//查物流 /v1/wx/gd/express/schedule 物流进度查询
export function schedule(parameter){
	return api.post('/orderApi/v1/wx/gd/express/schedule',parameter)
}