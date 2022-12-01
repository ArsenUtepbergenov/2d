import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      name: '',
    }
  },
  actions: {
    setName(payload) {
      this.name = payload
    },
    clear() {
      this.$reset()
    },
  },
  getters: {
    bio: state => `${state.name} is good man.`,
  },
})
