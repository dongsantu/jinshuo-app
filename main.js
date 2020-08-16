import Vue from 'vue'
import App from './App'
import store from './store'
import '@/vue2-editor.css'
import '@/iconfont.css'
import '@/style.scss'
import empty from './components/empty.vue'
import {imgHost} from '@/http/config'
import '@/js_sdk/ican-H5Api/ican-H5Api.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$imgHost = imgHost

Vue.component('empty', empty)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

