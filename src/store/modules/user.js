import * as types from '../mutation-types'

// state
const state = {
  // 用户登录状态
  loginStatus: false,
  // 用户token
  userToken: null,
  // 用户数据信息
  userData: [],
}

// actions
const actions = {
  /**
   * 记录用户信息
   */
  recordUserInfo({ commit }, res) {
    localStorage.setItem('userToken', res.token)
    commit(types.RECORD_USERINFO, res)
  }

}

// getters
const getters = {
  userToken: state => state.userToken,
  userData: state => state.userData,
  loginStatus: state => state.loginStatus
}

// mutations
const mutations = {
  [types.RECORD_USERINFO](state, res) {
    state.userData = res.data
    state.userToken = res.token
    state.loginStatus = true
  }
}

export default {
    state,
    actions,
    getters,
    mutations
}
