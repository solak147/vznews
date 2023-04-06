<template>
  <div>
    <van-form @submit="next" @failed="onFailed">
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
            v-model="cascaderValue"
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
          <van-button round type="danger" native-type="submit">下一步</van-button></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script setup>
import { useRegisterStore } from '@/stores/register'

const name = ref('')
const phone = ref('')
const introduction = ref('')
const namePtn = /^\S.{0,13}\S?$/
const phonePtn = /^\d{1,15}$/

const appConfig = useAppConfig()
const { addressConfig } = appConfig
const show = ref(false)
const addressTxt = ref('')
const cascaderValue = ref('')
const options = addressConfig // 选项列表，children 代表子选项，支持多级嵌套
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  addressTxt.value = selectedOptions.map((option) => option.text).join(' ')
}

const token = useCookie('jwt-token')
const registerStore = useRegisterStore()
const next = async (values) => {
  const response = await useFetch('/member/registerStep3', {
    method: 'post',
    body: {
      ...values,
      zipcode: cascaderValue,
      account: registerStore.account,
      password: registerStore.password
    },
    baseURL: '/api'
  })

  if (response.data.value.msg === 'Success') {
    token.value = response.data.value.data.token
    alert('註冊成功')
  } else {
    alert('註冊失敗')
  }
}
</script>

<style lang="less" scope>
.van-button {
  margin: 1.5rem 0rem;
}

.van-cascader__option {
  justify-content: center;
}

.van-tabs__nav {
  justify-content: center;
}
</style>
