<template>
  <section>
    <NavBar title="我的訊息" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="item in list.data" :key="item">
        <van-cell @click="navigateTo(`/message/${item.account}`)">
          <template #icon>
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </template>
          <template #title>
            <label>{{ item.account }}</label>
            <span>{{ calTimeDiff(item.crtDte) }}</span>
          </template>
          <template #label>
            <van-text-ellipsis rows="2" :content="item.message" />
            <van-tag v-if="item.notReadCnt" round type="success" size="large" text-color="#fff"
              >{{ item.notReadCnt }}+</van-tag
            >
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" class="r-list-btn" />
          <van-button square type="primary" text="收藏" class="r-list-btn" />
        </template>
      </van-swipe-cell>
    </van-list>
  </section>
</template>

<script setup>
const { calTimeDiff } = useCommon()
const { $request } = useNuxtApp()

const props = defineProps({
  navActive: {
    type: Function
  },
  sendMsgObj: {
    type: Object
  }
})

// 接收websocket訊息挪至陣列最前方
watch(props.sendMsgObj, () => {
  const from = props.sendMsgObj.data.from
  const index = list.data.findIndex((item) => item.account.includes(from))
  const removeEle = list.data.splice(index, 1)[0]
  removeEle.notReadCnt = parseInt(removeEle.notReadCnt) + 1
  removeEle.message = props.sendMsgObj.data.message
  removeEle.crtDte = new Date()
  list.data.unshift(removeEle)
})

onMounted(() => {
  props.navActive(4)
})

const list = reactive({
  data: []
})

const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 异步更新数据
  loading.value = true
  const res = await $request('/message', 'get')
  if (res.code === 0) {
    list.data = res.data
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }
  loading.value = false
  finished.value = true
}
</script>

<style lang="less" scoped>
:deep(.van-cell__title) {
  margin-left: 1rem;

  span {
    color: #969799;
    float: right;
  }
}

.r-list-btn {
  height: 100%;
}
</style>
