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
    const expectMoney = ref('')
    const workArea = ref('')
    const workAreaChk = ref('')
    const kind = ref('')
    const workContent = ref('')
    const fileList = ref([])

    return {
      title,
      type,
      expectDate,
      expectDateChk,
      expectMoney,
      workArea,
      workAreaChk,
      kind,
      workContent,
      fileList
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
