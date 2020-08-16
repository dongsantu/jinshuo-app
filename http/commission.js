import api from '@/js_sdk/luch-request/index';


//用户端 
//查询我的佣金汇总记录
export function getMyAccountDis (parameter) {
  return api.get('/financeApi/v1/manager/accountdis/getMyAccountDis')
}
//分页查询我的佣金记录
export function getProfitDetailByPage (parameter) {
  return api.post('/financeApi/v1/wx/profitrecord/getProfitDetailByPage',parameter)
}
//查询订单佣金记录
export function getProfitrecord (parameter) {
  return api.post('/financeApi/v1/wx/profitrecord/getByPage',parameter)
}
//查询可提现佣金及相关信息
export function getMyAccountDisInfo (parameter) {
  return api.get('/financeApi/v1/manager/accountdis/getMyAccountDisInfo')
}

//分页查询分销产品查询接口
export function queryDisProduct (parameter) {
  return api.post('/itemApi/v1/wx/spu/queryDisProduct',parameter)
}

//分页查询我的提现记录
export function getWithdrawLog (parameter) {
  return api.post('/financeApi/v1/wx/withdraw/getByPage',parameter)
}
//申请提现
export function withdrawCreate (parameter) {
  return api.post('/financeApi/v1/wx/withdraw/create',parameter)
}

//获取我的客户
export function getMySubordinateInfo (parameter) {
  return api.post('/userApi/v1/wx/dis/getMySubordinateInfo',parameter)
}
//获取我的粉丝数
export function getMyFans (parameter) {
  return api.get('/userApi/v1/wx/dis/getMyFans')
}

//保存分享产品并生成二维码
export function createShareProduct (parameter) {
  return api.post('/distributionApi/v1/wx/shareproduct/createShareProduct',parameter)
}

//单独生成二维码
export function createSharePic (parameter) {
  return api.post('/distributionApi/v1/wx/shareproduct/createSharePic',parameter)
}

//生成平台主海报
export function createMainPoster (parameter) {
  return api.post('/distributionApi/v1/wx/shareproduct/createMainPoster',parameter)
}

//获取我的升级距离
export function getGap (parameter) {
  return api.get('/userApi/v1/wx/dis/getGap',parameter)
}