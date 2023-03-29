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
          placeholder="帳號"
          :rules="[
            { pattern: accountPtn, message: '請輸入英文字母開頭且特殊符號只能有 (_) 的4-16個字元' }
          ]"
        />

        <van-field
          v-model="loginModel.password"
          name="password"
          placeholder="密碼"
          :rules="[
            { pattern: pwdPtn, message: '需至少一個大寫字母、一個小寫字母、一個數字 和不包含空白' }
          ]"
        />
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 會員登入 </van-button>
      </div>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 註冊會員 </van-button>
      </div>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 忘記密碼 </van-button>
      </div>
    </van-form>
  </section>
</template>

<script setup>
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

const loginModel = reactive({
  account: '',
  password: ''
})

const accountPtn = /^[a-zA-Z]\w{3,15}$/
const pwdPtn = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S{8,16}$/

const login = async (values) => {
  console.log(values)
  const a = await useFetch('/member/login', {
    method: 'post',
    body: loginModel,
    baseURL: '/api'
  })

  console.log(a)
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
  margin-bottom: 2.5rem 0rem;
  padding: 1rem 1rem;
}

.van-cell-group {
  margin: 2rem;
}
</style>
