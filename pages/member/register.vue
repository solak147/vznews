<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>會員註冊</h1></van-col>
    </van-row>

    <van-steps :active="step">
      <van-step>1.輸入e-mail</van-step>
      <van-step>2.收取驗證碼</van-step>
      <van-step>3.填寫基本資料</van-step>
    </van-steps>

    <component :is="stepComponents[step]" :step-click="stepClick" />

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

    <van-row>
      <van-col style="text-align: center" span="24">
        你已有 免費接 - Buddha soho 的帳號了嗎 ｜ <a href="#">馬上登入</a></van-col
      >
    </van-row>
  </section>
</template>

<script setup>
import regStep1 from './components/registerStep1.vue'
import regStep2 from './components/registerStep2.vue'
import regStep3 from './components/registerStep3.vue'

const step = ref(0)
const stepComponents = [regStep1, regStep2, regStep3]

const stepClick = () => {
  step.value += 1
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem;
  padding: 1rem 1rem;
}

.van-steps {
  margin: 1.5rem 0rem;
}
</style>
