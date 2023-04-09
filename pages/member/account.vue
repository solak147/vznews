<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>我的帳戶</h1></van-col>
    </van-row>

    <van-tabs v-model:active="activeRole">
      <van-tab title="發案主">内容 1</van-tab>
      <van-tab title="接案者">
        <img src="@/assets/images/accountSoho.jpg" @click="navigateTo('/casem')" />

        <van-collapse v-model="setSoho">
          <van-collapse-item title="接案設定" name="1">
            <div>
              <NuxtLink> 接案資料設定 </NuxtLink>
            </div>
            <div>
              <NuxtLink> 我的作品 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="setSoho">
          <van-collapse-item title="報價紀錄" name="1">
            <div>
              <NuxtLink> 報價紀錄 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="setSoho">
          <van-collapse-item title="我的收藏" name="1">
            <div>
              <NuxtLink> 我的收藏 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="setSoho">
          <van-collapse-item title="加值服務" name="1">
            <div>
              <NuxtLink> 加值服務 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="setSoho">
          <van-collapse-item title="通知管理" name="1">
            <div>
              <NuxtLink> 通知管理 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>

    <van-collapse v-model="acticeAccount">
      <van-collapse-item title="帳戶管理" name="1">
        <NuxtLink to="/member/profile">新增/修改帳戶資料</NuxtLink>
      </van-collapse-item>
    </van-collapse>

    <van-button round block type="danger" native-type="button" @click="logout"> 登出 </van-button>
  </section>
</template>

<script setup>
const activeRole = ref(0)
const setSoho = ref(['0'])
const acticeAccount = ref(['1'])
const token = useCookie('jwt-token')

const logout = () => {
  token.value = null
  navigateTo('/member/login')
}
</script>

<style lang="less" scoped>
img {
  width: 100vw;
  height: 25rem;
  display: block;
}

.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem;
  padding: 1rem 1rem;
}

.van-button {
  margin: 5rem 0rem;
}

:deep(.van-collapse-item__title) {
  background-color: #e1264a;
  color: #fff;
}
</style>
