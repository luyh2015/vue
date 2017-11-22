import Axios from 'axios';
import enums from '@/constants/enum';

const instance = Axios.create({
  baseURL: `${feConfig.api.base}`,
  withCredentials: true
})

instance.interceptors.request.use(function (config) {
  return config
})

instance.interceptors.response.use(function (response) {
  if(response && enums.ErrorCode.CookieInvalid === response.data.code){
    location.href="/login";
  }
  return response.data
}, function (err) {
  if (err.response) {
    return Promise.reject(err.response.data)
  }
  return Promise.reject({ code: 1024, message: err.message })
})

function axios(options) {
  let cookie = null;
  if (options.cookie) {
    cookie = `${options.cookie.key}=${options.cookie.value}`;
    delete options.cookie;
  }
  const instance = Axios.create(Object.assign({
    timeout: 4000
  }, options, cookie? {headers: { 'Cookie': cookie }}: {}));
  return instance;
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Vue.http = instance;
  Vue.axios = axios;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
