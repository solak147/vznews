<template>
  <div>
    <van-nav-bar :title="props.title" left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-tag v-if="caseId" round type="primary" size="large">編輯模式</van-tag>
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  back: {
    type: Function,
    default: null
  },
  caseId: {
    type: String,
    default: ''
  }
})

const onClickLeft = () => {
  if (props.back) {
    props.back()
  } else {
    history.back()
  }
}
</script>
