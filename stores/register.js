import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {
  const account = ref('')
  const password = ref('')
  const vaildCode = ref('')

  return {
    account,
    password,
    vaildCode
  }
})
