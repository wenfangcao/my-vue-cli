import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, msg) {
      console.log(msg)
      state.count ++
    },
  }
})
