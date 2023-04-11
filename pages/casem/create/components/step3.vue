<template>
  <div>
    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <h3>您的聯繫資訊 ：</h3>
        <p style="margin: 1rem; color: red; font-size: 1rem">
          以下資訊將提供接案會員查詢，請確認填寫正確資訊
        </p>
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="name"
          name="聯絡人"
          label="聯絡人"
          required
          placeholder="請輸入聯絡人"
          :rules="[{ pattern: namePtn, required: true, message: '請輸入正確格式' }]"
        />
        <van-field
          v-model="phone"
          name="phone"
          label="電話"
          required
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
        />

        <van-field name="radio" label="市話">
          <template #input>
            <van-field
              v-model="phone"
              name="phoneCity"
              placeholder="請輸入聯絡電話"
              maxlength="2"
              style="width: 6rem"
              :rules="[{ message: '請輸入正確格式' }]"
            />
            -
            <van-field
              v-model="phone"
              name="phone"
              placeholder="請輸入聯絡電話"
              maxlength="8"
              :rules="[{ pattern: phonePtn, message: '請輸入正確格式' }]"
            />
          </template>
        </van-field>
        <van-field
          v-model="phone"
          name="phone"
          label="分機"
          placeholder="請輸入聯絡電話"
          style="margin-left: 9rem"
          :rules="[{ pattern: phonePtn, message: '請輸入正確格式' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <label><span> * </span>聯絡時段 (複選)：</label>

        <van-checkbox-group v-model="checked">
          <van-checkbox name="a">9:00 ~ 12:00</van-checkbox>
          <van-checkbox name="b">13:00 ~ 18:00</van-checkbox>
          <van-checkbox name="b">19:00 ~ 21:00</van-checkbox>
          <van-checkbox name="b">不接聽手機</van-checkbox>
        </van-checkbox-group>
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="E-mail :"
          required
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="phone"
          name="phone"
          label="Line ID :"
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
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
const phone = ref('')
const name = ref('')
const phonePtn = /^\d{1,15}$/
const namePtn = /^\S.{0,13}\S?$/

const checked = ref(['a', 'b'])
</script>

<style lang="less" scoped>
:deep(label) {
  font-size: 1.3rem;
}

label {
  font-size: 1.3rem;
  margin: 1rem;
  span {
    color: red;
  }
}

.van-cell-group {
  margin: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
}

.van-checkbox-group {
  margin-left: 2rem;

  .van-checkbox {
    margin: 1rem;
    font-size: 1.3rem;
  }
}
</style>
