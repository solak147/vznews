<template>
  <div>
    <van-form @submit="login" @failed="onFailed">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="email"
          label="帳號"
          placeholder="帳號為您的 e-mail"
          :rules="[{ pattern: emailPtn, message: 'e-mail 格式錯誤' }]"
        />
      </van-cell-group>
      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button round type="danger" @click="props.stepClick">下一步</van-button></van-col
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
const props = defineProps({
  stepClick: {
    type: Function
  }
})

const email = ref('')
const emailPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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
