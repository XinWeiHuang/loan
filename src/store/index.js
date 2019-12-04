import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from './mutations.js'
import {state} from './state.js'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})
