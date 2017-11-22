
export default {
    install(Vue) {
        Vue.handleError = function(err, msg) {
            if (typeof arguments[0] === 'string') {
                err = {msg: arguments[0]};
            }
            Vue.prototype.$message.error(err.msg || err.message || msg || '请求失败');
        }
    }
}