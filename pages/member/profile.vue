<template>
  <section>
    <NavBar title="新增/修改帳戶資料" />

    <van-form @submit="save" @failed="onFailed">
      <van-cell-group inset>
        <van-cell center title="開啟 / 關閉 修改密碼">
          <template #right-icon>
            <van-switch v-model="pwdSwitch" />
          </template>
        </van-cell>
        <template v-if="pwdSwitch">
          <van-field
            v-model="oldPassword"
            type="password"
            name="oldPassword"
            label="舊密碼"
            placeholder="輸入舊密碼"
            autocomplete="off"
            :disabled="!pwdSwitch"
            :rules="[
              {
                pattern: pwdPtn,
                message: '需至少 8 個字，包含一個大寫字母、一個小寫字母、一個數字 和不包含空白'
              }
            ]"
          />

          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密碼"
            placeholder="輸入密碼"
            autocomplete="off"
            :disabled="!pwdSwitch"
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
            :disabled="!pwdSwitch"
            :rules="[
              {
                pattern: pwdPtn,
                message: '需至少 8 個字，包含一個大寫字母、一個小寫字母、一個數字 和不包含空白'
              }
            ]"
          />
        </template>
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="name"
          name="name"
          label="姓名"
          placeholder="請輸入姓名"
          :rules="[{ pattern: namePtn, message: '請輸入正確格式' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="電話"
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, message: '請輸入正確格式' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="addressTxt"
          is-link
          readonly
          label="地區"
          placeholder="請選擇所在地區"
          @click="show = true"
        />
        <van-popup v-model:show="show" round position="bottom">
          <van-cascader
            v-model="addressCascader"
            title="請選擇所在地區"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="introduction"
          name="introduction"
          rows="4"
          autosize
          label="簡介"
          type="textarea"
          maxlength="100"
          placeholder="请输入個人或公司介紹"
          show-word-limit
        />
      </van-cell-group>
      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button round type="danger" native-type="submit">儲存 / 修改</van-button></van-col
        >
      </van-row>
    </van-form>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { transAddressCode } = useCommon()

const pwdSwitch = ref(false)
const oldPassword = ref('')
const password = ref('')
const passwordConfirm = ref('')
const pwdConfirmErr = ref('')
const name = ref('')
const phone = ref('')
const introduction = ref('')
const namePtn = /^\S.{0,13}\S?$/
const phonePtn = /^\d{1,15}$/
const pwdPtn = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\S{8,16}$/
watch(passwordConfirm, (newVal) => {
  if (newVal !== password.value) {
    pwdConfirmErr.value = '密碼不一致'
  } else {
    pwdConfirmErr.value = ''
  }
})

const appConfig = useAppConfig()
const { addressConfig } = appConfig
const show = ref(false)
const addressTxt = ref('')
const addressCascader = ref('')
const options = addressConfig // 选项列表，children 代表子选项，支持多级嵌套
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  addressTxt.value = selectedOptions.map((option) => option.text).join(' ')
}

const { $request } = useNuxtApp()
const userStore = useUserStore()
onMounted(async () => {
  const res = await $request(`/member/profile/${userStore.account}`, 'get')

  name.value = res.user.name
  phone.value = res.user.phone
  introduction.value = res.user.introduction
  addressCascader.value = res.user.zipcode
  addressTxt.value = transAddressCode(res.user.zipcode)
})

const save = async (values) => {
  const res = await $request(`/member/profile/save`, 'post', {
    ...values,
    zipcode: addressCascader.value,
    account: userStore.account,
    pwdSwitch: pwdSwitch.value
  })

  if (res.data) {
    showNotify({ type: 'success', message: '儲存成功' })
  } else {
    showNotify({ type: 'warning', message: res.msg })
  }
}
</script>

<style lang="less" scoped>
.van-button {
  margin: 1rem;
}

:deep(.van-cascader__option) {
  justify-content: center;
}

:deep(.van-tabs__nav) {
  justify-content: center;
}
</style>
