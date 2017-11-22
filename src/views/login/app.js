import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store'
import Axios from '@/assets/plugin/axios'

Vue.use(ElementUI);
Vue.use(Axios)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
