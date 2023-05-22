<template>
  <div>
    <van-nav-bar :title="props.title" left-text="返回" left-arrow @click-left="onClickLeft" />
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
