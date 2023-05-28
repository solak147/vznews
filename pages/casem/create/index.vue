<template>
  <section>
    <NavBar :title="title" :back="back" :case-id="caseId" />

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
import { useCaseStore } from '@/stores/case'
const caseStore = useCaseStore()

const props = defineProps({
  navActive: {
    type: Function,
    default: null
  }
})

const route = useRoute()
const { caseId } = route.query

const title = ref('立即發案')
onMounted(() => {
  props.navActive(1)

  // 編輯模式
  if (caseId) {
    title.value = '發佈中案件'
  }
})

onUnmounted(() => {
  if (caseId) {
    caseStore.reset()

    caseStore.fileList.forEach((e) => {
      if (e.url && e.url.startsWith('blob:')) {
        URL.revokeObjectURL(e.url)
      }
    })
  }
})

const step = ref(0)
const stepComponents = [step1, step2, step3]
const percent = ref(25)
const stepclick = () => {
  step.value += 1
  percent.value += 25
}

const back = () => {
  if (step.value > 0) {
    step.value -= 1
    percent.value -= 25
  } else {
    history.back()
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

form {
  margin-top: 1rem;
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
