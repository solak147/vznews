<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>會員登入</h1></van-col>
    </van-row>

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

const accountPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const pwdPtn = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S{8,16}$/

const userStore = useUserStore()
const token = useCookie('jwt-token')
const loginModel = reactive({
  account: '',
  password: ''
})
const login = async (values) => {
  console.log(values)
  const response = await useFetch('/login', {
    method: 'post',
    body: loginModel,
    baseURL: '/api'
  })

  if (response.data.value.msg === 'Success') {
    token.value = response.data.value.data.token
    userStore.account = loginModel.account
    showNotify({ type: 'success', message: '登入成功' })
    navigateTo('/member/account')
  } else {
    showNotify({ type: 'warning', message: '登入失敗' })
  }
}

const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}

const back = () => {
  history.back()
}
</script>

<style lang="less" scoped>
.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem;
  padding: 1rem 1rem;
}

.van-cell-group {
  margin: 2rem;
}
</style>
