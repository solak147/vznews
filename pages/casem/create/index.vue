<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>立即發案</h1></van-col>
    </van-row>

    <van-progress :percentage="percent" stroke-width="40" track-color="#ADADAD" />

    <transition>
      <component :is="stepComponents[step]" :step-click="stepclick" />
    </transition>
  </section>
</template>

<script setup>
import step1 from './components/step1.vue'
import step2 from './components/step2.vue'
import step3 from './components/step3.vue'

const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(() => {
  props.navActive(1)
})

const step = ref(0)
const stepComponents = [step1, step2, step3]
const percent = ref(25)
const stepclick = () => {
  step.value += 1
  percent.value += 25
}

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

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
