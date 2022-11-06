export const state = () => ({
  tokenR4: null,
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.tokenR4 = user['R4-Token']
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('r4-token', state.tokenR4)
  },
  logout(state) {
    state.user = null
    state.tokenR4 = null
    localStorage.removeItem('user')
    localStorage.removeItem('r4-token')
  }
}

export const getters = {
  user(state) {
    if(!state.user){
      return JSON.parse(localStorage.getItem('user'))
    }
    return state.user
  },
  token(state) {
    if(!state.tokenR4){
      return localStorage.getItem('r4-token')
    }
    return state.tokenR4
  }
}

