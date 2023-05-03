<template>
  <header>
    <van-tabbar
      v-model="active"
      inactive-color="#fff"
      active-color="#ee0a24"
      class="headerNav"
      @change="navChg"
    >
      <van-tabbar-item z icon="home-o">首頁</van-tabbar-item>
      <van-tabbar-item icon="edit">發案</van-tabbar-item>
      <van-tabbar-item icon="search">接案</van-tabbar-item>
      <van-tabbar-item icon="friends-o">會員</van-tabbar-item>
      <van-tabbar-item icon="chat-o" :badge="badge">訊息</van-tabbar-item>
    </van-tabbar>
  </header>
</template>

<script setup>
const { $request } = useNuxtApp()
const props = defineProps({
  sendMsgObj: {
    type: Object
  }
})

const badge = ref('')
watch(props.sendMsgObj, () => {
  badge.value = parseInt(badge.value) + 1
})

const active = ref(0)
const navActiveFn = (index) => {
  active.value = index
}

const navChg = (index) => {
  const token = useCookie('jwt-token')
  active.value = index

  switch (index) {
    case 0:
      navigateTo('/')
      break
    case 1:
      navigateTo('/casem/create')
      break
    case 2:
      navigateTo('/casem')
      break
    case 3:
      if (token.value) {
        navigateTo('/member')
      } else {
        navigateTo('/member/login')
      }

      break
    case 4:
      navigateTo('/message')
      break
  }
}

const refreshBadge = async () => {
  const token = useCookie('jwt-token')
  if (token.value) {
    const res = await $request(`/message/chkNoRead`, 'get')

    if (res.code === 0) {
      if (res.data > 0) {
        badge.value = res.data
      }
    } else {
      showNotify({ type: 'warning', message: '資料獲取失敗' })
    }
  }
}

defineExpose({
  navActiveFn,
  refreshBadge
})
</script>

<style lang="less" scoped>
.headerNav {
  background: #e1264a;
}

:deep(.van-badge) {
  background-color: #1900ff;
}
</style>
