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
          label="城市"
          placeholder="选择城市"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
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
const namePtn = /^\S.{0,18}\S?$/
const phonePtn = /^\d{1,15}$/

const columns = [
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' }
]
const fieldValue = ref('')
const showPicker = ref(false)

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false
  fieldValue.value = selectedOptions[0].text
}
</script>

<style lang="less" scope>
.van-button {
  margin: 1.5rem 0rem;
}
</style>
