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
        <van-cell @click="clickDetail(item.account, item.name)">
          <template #icon>
            <van-image v-if="item.avatar" round width="4rem" height="4rem" :src="item.avatar" />
            <img v-else src="@/assets/images/avatar.png" style="width: 4rem; height: 4rem" />
          </template>
          <template #title>
            <label>{{ item.name }}</label>
            <span>{{ calTimeDiff(item.crtDte) }}</span>
          </template>
          <template #label>
            <van-text-ellipsis v-if="item.isSystem === '0'" rows="2" :content="item.message" />
            <div v-else-if="item.isSystem === '1'">系統訊息：報價通知</div>
            <div v-else-if="item.isSystem === '2'">系統訊息：成交通知</div>

            <van-tag
              v-if="parseInt(item.notReadCnt) > 0"
              round
              type="success"
              size="large"
              text-color="#fff"
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
import { useMsgStore } from '@/stores/message'
const msgStore = useMsgStore()
const { calTimeDiff } = useCommon()
const { $request, $downloadShow } = useNuxtApp()

const props = defineProps({
  navActive: {
    type: Function,
    default: null
  },
  sendMsgObj: {
    type: Object,
    default: null
  },
  refreshBadge: {
    type: Function,
    default: null
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

onUnmounted(() => {
  list.data.forEach((e) => {
    if (e.avatar) {
      URL.revokeObjectURL(e.avatar)
    }
  })
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
    for (let i = 0; i < res.data.length; i++) {
      const resAvatar = await $request(
        `/file/sohowork/avatar?account=${res.data[i].account}`,
        'get'
      )
      if (resAvatar.code === 0) {
        if (resAvatar.data.length > 0) {
          res.data[i].avatar = await $downloadShow(
            `/file/sohoDownload/${resAvatar.data[0].filename}/avatar?account=${res.data[i].account}`
          )
        }
      }
    }

    list.data = res.data
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }
  loading.value = false
  finished.value = true
}

const clickDetail = async (from, name) => {
  const res = await $request('/message/updateRead', 'put', {
    accountFrom: from
  })

  if (res.code !== 0) {
    showNotify({ type: 'warning', message: '資料更更新失敗' })
  }

  props.refreshBadge()

  msgStore.msgTo = name
  navigateTo(`/message/${from}`)
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
