import Vuex from 'vuex'
import * as StoreTypes from './types'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'

const state: StoreTypes.OverallState = {
  users: {},
  posts: [],
  reactions: {},
  currentUser: {} as StoreTypes.BlogUser
}

export default new Vuex.Store<StoreTypes.OverallState>({
  state,
  mutations,
  getters,
  actions
})
