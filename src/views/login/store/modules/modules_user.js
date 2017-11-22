import * as TypesUser from '../types/types_user';
import Vue from 'vue';

export default {
	state: {
		profile: {}
	},
	mutations: {
		[TypesUser.USER_SET_PROFILE](state, payload){
			state.profile = payload || {};
		}
	},
	actions: {
		//学生端、家长端登录
		[TypesUser.USER_POST_LOGIN](ctx, {loginName, password, roleType, rememberMe}){
			return Vue.http.post('/v2/users/sessions', {
				loginName, password, roleType, rememberMe
			}).then(data => {
				ctx.commit(TypesUser.USER_SET_PROFILE, data);
				return data;
			})
		}
	},
	getters: {
		//学生端、家长端登录
		[TypesUser.USER_GET_USER_INFO](state){
			//在这可以添加各种逻辑

			return state.profile;
		}
	}
}
