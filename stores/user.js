import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const account = ref('')
    const password = ref('')
    const vaildCode = ref('')

    return {
      account,
      password,
      vaildCode
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: process.client ? localStorage : null
        }
      ]
    }
  }
)
