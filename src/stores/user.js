import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      name: 'Arsen',
    }
  },
  actions: {
    saveName(payload) {
      this.setName(payload)
    },
    setName(payload) {
      this.name = payload
    },
    clearUser() {
      this.$reset()
    },
  },
  getters: {
    firstAndLastName: (state) => `${state.name} Utepbergenov`,
  },
})
