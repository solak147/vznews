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
const password = ref('')
const errorInfo = ref('')
const showKeyboard = ref(true)

watch(password, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误'
  } else {
    errorInfo.value = ''
  }
})
</script>

<style lang="less" scoped>
.van-button {
  margin: 1.5rem 0rem;
}
</style>
