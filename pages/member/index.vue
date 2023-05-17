<template>
  <section>
    <NavBar title="我的帳戶" />

    <van-tabs v-model:active="activeRole">
      <van-tab>
        <template #title> <van-icon name="description" />發案主 </template>
        <img src="@/assets/images/accountCase.jpg" @click="navigateTo('/casem/create')"
      /></van-tab>
      <van-tab>
        <template #title> <van-icon name="user-o" />接案者 </template>
        <img src="@/assets/images/accountSoho.jpg" @click="navigateTo('/casem')" />

        <van-collapse v-model="setSoho">
          <van-collapse-item title="接案設定" name="1">
            <div>
              <NuxtLink to="/member/soho"> 接案資料設定 </NuxtLink>
              <van-tag v-if="isSohoSetting" round type="success">已填寫</van-tag>
              <van-tag v-else round type="danger">未填寫</van-tag>
            </div>
            <div>
              <NuxtLink to="/member/soho/work"> 我的作品 </NuxtLink>
            </div>
            <div>
              <NuxtLink to="/member/soho/x"> 個人檔案預覽 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="priceRecord">
          <van-collapse-item title="報價紀錄" name="1">
            <div>
              <NuxtLink to="/member/soho/quoteRecord"> 報價紀錄 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="collect">
          <van-collapse-item title="我的收藏" name="1">
            <div>
              <NuxtLink> 我的收藏 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>

        <van-collapse v-model="bonus">
          <van-collapse-item title="加值服務" name="1">
            <div>
              <NuxtLink> 加值服務 </NuxtLink>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>

    <van-collapse v-model="casem">
      <van-collapse-item title="案件管理" name="1">
        <div>
          <NuxtLink :to="dealCase()"> 成交案件 </NuxtLink>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="acticeAccount">
      <van-collapse-item title="帳戶管理" name="1">
        <NuxtLink to="/member/profile">新增/修改帳戶資料</NuxtLink>
      </van-collapse-item>
    </van-collapse>

    <van-row>
      <van-col style="text-align: center" span="24">
        <van-button round type="danger" native-type="button" @click="logout"
          >登出</van-button
        ></van-col
      >
    </van-row>
  </section>
</template>

<script setup>
const { $request } = useNuxtApp()

const activeRole = ref(0)
const setSoho = ref(['1'])
const priceRecord = ref([''])
const collect = ref([''])
const bonus = ref([''])
const casem = ref([''])
const acticeAccount = ref(['1'])
const token = useCookie('jwt-token')
const isSohoSetting = ref(false)

onMounted(async () => {
  const res = await $request('/member/chkSohoSetting', 'get')
  if (res.code === -1) {
    if (res.msg !== '尚未填寫接案設定') {
      showNotify({ type: 'warning', message: res.msg })
    }
  } else {
    isSohoSetting.value = true
  }
})

const logout = () => {
  token.value = null
  navigateTo('/member/login')
}

const dealCase = () => {
  return `/member/dealCase${activeRole.value === 0 ? 'boss' : 'soho'}`
}
</script>

<style lang="less" scoped>
img {
  width: 100vw;
  height: 25rem;
  display: block;
}

.van-button {
  margin: 5rem 0rem;
}

:deep(.van-collapse-item__title) {
  background-color: #424246;
  color: #fff;
}

:deep(.van-collapse-item__content div) {
  margin: 1.2rem;
  color: black;
}

.van-button {
  margin-bottom: 5rem;
  width: 8rem;
}

:deep(.van-tabs__nav) {
  background-color: #424246;

  .van-tab {
    color: #968e8e;
    font-size: 1.5rem;
    i {
      margin-right: 2rem;
    }
  }

  .van-tab:first-child {
    border-right: 0.1rem solid #fff;
  }

  .van-tab--active {
    color: #fff;
  }
}
</style>
