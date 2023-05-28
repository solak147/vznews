import { defineStore } from 'pinia'

export const useCaseStore = defineStore(
  'case',
  () => {
    const caseId = ref('')

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

    // step3 (案件編輯才用到)
    const name = ref('')
    const phone = ref('')
    const cityTalk = ref('')
    const cityTalk2 = ref('')
    const extension = ref('')
    const contactTime = ref([])
    const email = ref('')
    const line = ref('')

    const reset = () => {
      // 重置store的状态为初始值
      caseId.value = ''

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

      name.value = ''
      phone.value = ''
      cityTalk.value = ''
      cityTalk2.value = ''
      extension.value = ''
      contactTime.value = []
      email.value = ''
      line.value = ''

      localStorage.removeItem('case')
    }

    return {
      caseId,

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

      name,
      phone,
      cityTalk,
      cityTalk2,
      extension,
      contactTime,
      email,
      line,

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
