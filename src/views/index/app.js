import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import Axios from '@/assets/plugin/axios'
import checkResp from '@/assets/plugin/checkResp'
import handleError from '@/assets/plugin/handleError';

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

Vue.use(ElementUI)
Vue.use(Axios)
Vue.use(checkResp)
Vue.use(handleError)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
