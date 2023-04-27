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
        <van-cell @click="navigateTo('/casem/1')">
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
            <van-tag round type="success" size="large" text-color="#fff">99+</van-tag>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" class="r-list-btn" />
          <van-button square type="primary" text="收藏" class="r-list-btn" @click="send" />
        </template>
      </van-swipe-cell>
    </van-list>

    <!-- <input v-model="tt" />
    <input v-model="gg" />
    <button @click="connect">test socket</button> -->
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { calTimeDiff } = useCommon()
const userStore = useUserStore()
const { $request } = useNuxtApp()

const props = defineProps({
  navActive: {
    type: Function
  }
})

let ws
let username
// const tt = ref('')
// const gg = ref('')

onMounted(() => {
  props.navActive(4)
  connect()
})

const connect = () => {
  username = userStore.account
  ws = new WebSocket('ws://localhost:8080/ws')
  ws.onopen = function () {
    ws.send(username)
    console.log('Connected')
  }
  ws.onmessage = function (event) {
    alert(event.data)
    console.log('Received message:', event.data)
  }
  ws.onclose = function (event) {
    console.log('Disconnected:', event.code, event.reason)
  }
}

function send() {
  ws.send(gg.value + ' ' + 'bbb')
}

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
