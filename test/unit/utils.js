import Vue from 'vue';
import Vuex from 'vuex'

exports.createStore = function(userModules = {}) {
    return new Vuex.Store({
        modules: Object.assign({}, getModules(), userModules)
    })
}

function getModules() {
    let rs = require.context('../../src/store/modules', false, /\.js$/);
    let modules = {};
    rs.keys().forEach(key => {
        let moduleName = key.split('_')[1].split('.')[0];
        if (!modules[moduleName]) {
            modules[moduleName] = rs(key).default;
        }
    })
    return modules;
}