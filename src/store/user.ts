import { defineStore } from 'pinia'

export type userState = {
  name: string
}

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      name: '',
    } as userState),
  actions: {
    setName(payload: string) {
      this.name = payload
    },
    clear() {
      this.$reset()
    },
  },
})
