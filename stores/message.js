import { defineStore } from 'pinia'

export const useMsgStore = defineStore(
  'message',
  () => {
    // 訊息傳送對象
    const msgTo = ref('')

    return {
      msgTo
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'message',
          storage: process.client ? localStorage : null
        }
      ]
    }
  }
)
