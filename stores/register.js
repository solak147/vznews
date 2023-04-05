import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {
  const account = ref('')
  const vaildCode = ref('')

  return {
    account,
    vaildCode
  }
})
