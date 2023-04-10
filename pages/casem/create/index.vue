<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>立即發案</h1></van-col>
    </van-row>

    <component :is="stepComponents[step]" :step-click="stepClick" />
  </section>
</template>

<script setup>
import step1 from './components/step1.vue'
import step2 from './components/step2.vue'

const step = ref(1)
const stepComponents = [step1, step2]

const back = () => {
  history.back()
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

form {
  margin-top: 1rem;
}

.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem 0rem;
  padding: 1rem 1rem;
}
</style>
