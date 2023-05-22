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

    const reset = () => {
      // 重置store的状态为初始值
      title.value = ''
      type.value = ''
      expectDate.value = ''
      expectDateChk.value = ''
      expectMoney.value = ''
      workArea.value = ''
      workAreaChk.value = ''
      kind.value = ''
      workContent.value = ''
      fileList.value = []

      localStorage.removeItem('case')
    }

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
      fileList,

      reset
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
