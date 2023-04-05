<template>
  <div>
    <van-form @submit="login" @failed="onFailed">
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
          v-model="fieldValue"
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
          <van-button round type="danger" @click="step += 1">下一步</van-button></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script setup>
const name = ref('')
const phone = ref('')
const introduction = ref('')
const namePtn = /^\S.{0,13}\S?$/
const phonePtn = /^\d{1,15}$/

const appConfig = useAppConfig()
const { addressCode } = appConfig
const show = ref(false)
const fieldValue = ref('')
const cascaderValue = ref('')
// 选项列表，children 代表子选项，支持多级嵌套
const options = addressCode
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map((option) => option.value).join('/')
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
