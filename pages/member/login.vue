<template>
  <section>
    <NavBar title="會員登入" />

    <van-form @submit="login" @failed="onFailed">
      <van-cell-group inset>
        <van-field
          v-model="loginModel.account"
          name="account"
          label="帳號"
          placeholder="帳號為你的 email"
          :rules="[{ pattern: accountPtn, message: 'e-mail 格式錯誤' }]"
        />

        <van-field
          v-model="loginModel.password"
          type="password"
          name="password"
          label="密碼"
          placeholder="密碼"
          autocomplete="off"
          :rules="[
            {
              pattern: pwdPtn,
              message: '需至少 8 個字，包含一個大寫字母、一個小寫字母、一個數字 和不包含空白'
            }
          ]"
        />
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 會員登入 </van-button>
      </div>

      <div style="margin: 16px">
        <van-button
          round
          block
          type="danger"
          native-type="button"
          @click="navigateTo('/member/register')"
        >
          註冊會員
        </van-button>
      </div>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 忘記密碼 </van-button>
      </div>
    </van-form>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

useHead({
  title: `登入 | 免費接 - Buddha soho`,
  meta: [
    { name: 'description', content: `登入 | 免費接 - Buddha soho` },
    { name: 'keywords', content: `登入 | 免費接 - Buddha soho` },
    { property: 'og:title', content: `登入 | 免費接 - Buddha soho` },
    { property: 'og:description', content: `登入 | 免費接 - Buddha soho` }
    // { property: 'og:image', content: article.value.cover }
  ]
})

const props = defineProps({
  navActive: {
    type: Function
  },
  doLoginGoble: {
    type: Function
  }
})

onMounted(() => {
  props.navActive(3)
})

const accountPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const pwdPtn = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S{8,16}$/

const userStore = useUserStore()
const token = useCookie('jwt-token')
const loginModel = reactive({
  account: '',
  password: ''
})
const login = async () => {
  const response = await useFetch('/login', {
    method: 'post',
    body: loginModel,
    baseURL: '/api'
  })

  if (!response.error.value) {
    token.value = response.data.value.data.token
    userStore.account = loginModel.account
    showNotify({ type: 'success', message: '登入成功' })
    navigateTo('/member')

    // 需等待token寫入
    setTimeout(() => {
      props.doLoginGoble()
    }, 1000)
  } else {
    showNotify({ type: 'warning', message: '登入失敗' })
  }
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin: 2rem;
}
</style>
