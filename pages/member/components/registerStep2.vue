<template>
  <div>
    <van-password-input
      :value="password"
      info="密码为 6 位数字"
      :error-info="errorInfo"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <van-number-keyboard v-model="password" :show="showKeyboard" @blur="showKeyboard = false" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const props = defineProps({
  stepClick: {
    type: Function
  }
})

const password = ref('')
const errorInfo = ref('')
const showKeyboard = ref(true)

const userStore = useUserStore()
watch(password, (newVal) => {
  if (newVal.length === 6 && newVal !== userStore.vaildCode) {
    errorInfo.value = '驗證碼错误'
  } else if (newVal.length === 6 && newVal === userStore.vaildCode) {
    props.stepClick()
  }
})
</script>

<style lang="less" scoped>
.van-button {
  margin: 1.5rem 0rem;
}
</style>
