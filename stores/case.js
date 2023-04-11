import { defineStore } from 'pinia'

export const useCaseStore = defineStore(
  'case',
  () => {
    // step1
    const title = ref('')
    const type = ref('')

    // step2
    const expectDate = ref('')
    const expectDateChk = ref('')
    const price = ref('')
    const workArea = ref('')
    const workAreaChk = ref('')
    const kind = ref('')
    const content = ref('')

    return {
      title,
      type,
      expectDate,
      expectDateChk,
      price,
      workArea,
      workAreaChk,
      kind,
      content
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
