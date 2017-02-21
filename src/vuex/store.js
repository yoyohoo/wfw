import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	_lastPage: '',
	_currentPage: '',
	singleSelectData: []// ['请选择学历','高中及以下', '中专', '大专', '本科', '硕士', '博士']
}

const mutations = {
	getCurrentPage: (state) => state._currentPage,
	setCurrentPage(state, page) {
		state._lastPage = state._currentPage
		state._currentPage = page
	},
	setSingleSelectData(state, data) {
		state.singleSelectData = data;
	}
}

const actions = {
	GET_CURRENT_PAGE({
		commit
	}) {
		commit('getCurrentPage')
	},
	SET_CURRENT_PAGE({
		commit
	}, page) {
		commit('setCurrentPage', page)
	},
	SET_SINGLE_SELECT_DATA({
		commit
	}, data) {
		commit('setSingleSelectData', data)
	}
}

const getters = {

}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

export default store