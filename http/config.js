let host = '';
let appId ='';
let imgHost = 'http://192.168.2.114/'
let webSite = 'http://test.ym.h5.ymzby.com'
console.log('process.env',process.env)
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	//host = 'http://1508c29b97.imwork.net'
	host = 'http://localhost:9529'
	appId='wx7c1f511f8e8c783a'
	imgHost = 'http://192.168.2.114/'
	webSite = 'http://test.ym.h5.ymzby.com'
	
	/* host = 'https://mc.ymzby.com'
	appId='wx44ae1813678a4fcc'
	imgHost = 'http://img.ymzby.com/'
	webSite = 'http://ym.h5.ymzby.com' */
	
}else{
    console.log('生产环境')
	//测试环境 www.ymzby.com
	/* host = 'http://1508c29b97.imwork.net'
	appId='wx7c1f511f8e8c783a'
	imgHost = 'http://192.168.2.114/'
	webSite = 'http://test.ym.h5.ymzby.com' */
	//正式环境 mobile.ymzby.com
	host = 'https://mc.ymzby.com'
	appId='wx44ae1813678a4fcc'
	imgHost = 'http://img.ymzby.com/'
	webSite = 'http://ym.h5.ymzby.com'
}
export { appId, imgHost, webSite };
export default host;