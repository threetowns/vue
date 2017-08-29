import * as types from '../mutation-types'

// state
const state = {
  // 用户登录状态
  loginStatus: false,
  // 用户登录信息
  userInfo: {},
  // 用户数据信息
  userData: []
}

// actions
const actions = {
  /**
   * 请求用户信息
   */
  recordUserInfo({ commit }, res) {
    localStorage.setItem('userToken', JSON.stringify(res.token))
    commit(types.RECORD_USERINFO, res)
  }
}

// getters
const getters = {

}

// mutations
const mutations = {
  [types.RECORD_USERINFO](state, res) {
        state.userInfo = res.data
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
