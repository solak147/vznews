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
      <van-tabbar-item icon="friends-o">會員</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </header>
</template>

<script setup>
const active = ref(0)

const navChg = (index) => {
  active.value = index

  switch (index) {
    case 0:
      navigateTo('/')
      break
    case 2:
      navigateTo('/member/login')
      break
  }
}
</script>

<style lang="less" scoped>
.headerNav {
  background: #e1264a;
}
</style>
