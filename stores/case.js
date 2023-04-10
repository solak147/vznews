import { defineStore } from 'pinia'

export const useCaseStore = defineStore(
  'case',
  () => {
    const title = ref('')
    const type = ref('')

    return {
      title,
      type
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'case',
          storage: process.client ? localStorage : null
        }
      ]
    }
  }
)
