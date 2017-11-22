import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/modules_user';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user
    }
});
