<template>
  <section>
    <NavBar title="我的訊息" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="item in list" :key="item">
        <van-cell @click="navigateTo('/casem/1')">
          <template #icon>
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </template>
          <template #title> <label>尋找演員</label> <span>5分鐘前</span> </template>
          <template #label>
            <van-text-ellipsis rows="2" :content="text" />

            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" class="r-list-btn" />
          <van-button square type="primary" text="收藏" class="r-list-btn" @click="send" />
        </template>
      </van-swipe-cell>
    </van-list>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

let ws
let username

onMounted(() => {
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
    console.log('Received message:', event.data)
  }
  ws.onclose = function (event) {
    console.log('Disconnected:', event.code, event.reason)
  }
}

function send() {
  ws.send('aaa' + ' ' + 'bbb')
}

const text =
  'Vant 是一个轻量、可定制的移动端组件库，于 2017 年开源。目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。Vant 是一个轻量、可定制的移动端组件库，于 2017 年开源。目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。'
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
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
