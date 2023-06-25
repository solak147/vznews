<template>
  <div class="easy-image" :style="{ height: heightUnit }">
    <client-only>
      <img
        v-if="realUrl"
        v-show="status == 2"
        :src="realUrl"
        alt=""
        :style="{ objectFit: props.fit }"
        @load="onLoad"
        @error="onError"
      />
    </client-only>
    <transition name="van-fade">
      <img v-if="status == 1" src="@/assets/images/placeholder.jpg" class="loading" />
    </transition>
    <div v-if="status == 0" class="error">
      <span v-if="!props.disabledError">加载失败</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    default: null
  },
  fit: {
    type: String,
    default: 'fit'
  },
  height: {
    type: String || Number,
    default: ''
  },
  disabledError: {
    type: Boolean,
    default: false
  }
})

const status = ref(1)
const height = ref('')
const realUrl = ref('')

onMounted(() => {
  realUrl.value = props.url
  height.value = props.height
})

const heightUnit = computed(() => {
  if (height.value && !isNaN(height.value)) {
    return `${height.value}px`
  } else {
    return height.value
  }
})

const onLoad = () => {
  status.value = 2
}

const onError = () => {
  status.value = 0
}
</script>

<style lang="less" scoped>
.easy-image {
  position: relative;
  overflow: hidden;
  border-radius: 0.8rem;

  img {
    display: block;
    height: 100%;
    width: 100%;
  }

  .error,
  .loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    font-size: 13px;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #393f63;
    object-fit: fill;
  }
}
</style>
