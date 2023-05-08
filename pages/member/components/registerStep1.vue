<template>
  <div>
    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="email"
          label="帳號"
          placeholder="帳號為您的 e-mail"
          :rules="[{ pattern: emailPtn, message: 'e-mail 格式錯誤' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密碼"
          placeholder="輸入密碼"
          autocomplete="off"
          :rules="[
            {
              pattern: pwdPtn,
              message: '需至少 8 個字，包含一個大寫字母、一個小寫字母、一個數字 和不包含空白'
            }
          ]"
        />
        <van-field
          v-model="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label="密碼確認"
          placeholder="再次輸入密碼"
          autocomplete="off"
          :error-message="pwdConfirmErr"
          :rules="[
            {
              pattern: pwdPtn,
              message: '需至少 8 個字，包含一個大寫字母、一個小寫字母、一個數字 和不包含空白'
            }
          ]"
        />
      </van-cell-group>
      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button :disabled="nextDisable" round type="danger" native-type="submit"
            >下一步</van-button
          ></van-col
        >
      </van-row>
    </van-form>

    <van-checkbox v-model="lawChk">
      我已仔細閱讀並明瞭 「<a href="#">服務條款</a>」、「<a href="#">刊登規則</a>」、<a href="#"
        >「接案會員服務條款</a
      >」、「<a href="#">隱私權聲明</a>」、「<a href="#">免責聲明</a
      >」等所載內容及其意義，茲同意該等條款規定，並願遵守網站現今、嗣後規範的各種規則。
    </van-checkbox>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const props = defineProps({
  stepClick: {
    type: Function
  }
})

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const pwdConfirmErr = ref('')
const emailPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const pwdPtn = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S{8,16}$/
watch(passwordConfirm, (newVal) => {
  if (newVal !== password.value) {
    pwdConfirmErr.value = '密碼不一致'
  } else {
    pwdConfirmErr.value = ''
  }
})

// 條款聲明確認
const lawChk = ref(false)

const nextDisable = ref(false)
const userStore = useUserStore()
const next = async (values) => {
  if (!lawChk.value) {
    showDialog({
      message: '需同意本網站服務條款',
      theme: 'round-button'
    })
    return
  }

  nextDisable.value = true
  const response = await useFetch('/registerStep1', {
    method: 'post',
    body: values,
    baseURL: '/api'
  })

  if (!response.error.value) {
    userStore.account = email.value
    userStore.password = password.value
    userStore.vaildCode = response.data.value.data
    props.stepClick()
  } else {
    showDialog({
      message: '帳號已存在',
      theme: 'round-button'
    })
    nextDisable.value = false
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

.van-form {
  margin: 1.5rem 0rem;
}

.van-checkbox {
  margin: 1.5rem 1.5rem;
}

.van-button {
  margin: 1.5rem 0rem;
}
</style>
