export const state = () => ({
  csrfToken: ''
})

export const mutations = {
  SET_CSRF_TOKEN(state, token) {
    state.csrfToken = token
  }
}

export const actions = {
  async getCsrfToken({ commit }) {
    await fetch('/sanctum/csrf-cookie')
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content
    commit('SET_CSRF_TOKEN', csrfToken)
  }
}