<template>
  <section>
    <NavBar title="接案資料設定" />

    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <div class="list">
          <label><span> * </span>接案狀態 :</label>
          <van-radio-group v-model="openChk">
            <van-radio name="1"
              >開啟，顯示聯絡資訊 (全站案主皆能查看您的聯絡資訊，主動與您聯繫。)</van-radio
            >
            <van-radio name="2">
              開啟，隱藏聯絡資訊
              (僅開放成交過的業主查看您的聯絡資訊，其他案主胥發送邀請函)</van-radio
            >
            <van-radio name="3">關閉</van-radio>
          </van-radio-group>
        </div>

        <div class="list">
          <label><span> * </span>接案暱稱 :</label>
          <van-space>
            <van-field
              v-model="name"
              name="name"
              placeholder="暱稱"
              style="width: 10rem"
              :rules="[{ pattern: namePtn, message: '請輸入正確格式' }]"
            />
            <span>此為您對外公開顯示名稱</span>
          </van-space>
        </div>

        <div class="list">
          <label><span> * </span>接案身份 :</label>
          <van-radio-group v-model="roleChk" class="role">
            <van-space>
              <van-radio name="1">個人兼職</van-radio>
              <van-radio name="2"> 專職SOHO</van-radio>
              <van-radio name="3">工作室</van-radio>
            </van-space>
            <van-space>
              <van-radio name="4">兼職上班族</van-radio>
              <van-radio name="5">公司</van-radio>
              <van-radio name="6">學生</van-radio>
            </van-space>
          </van-radio-group>
        </div>

        <van-field
          v-model="phone"
          name="phone"
          label="電話"
          required
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
        />

        <van-field label="市話">
          <template #input>
            <van-field
              v-model="cityTalk"
              name="cityTalk"
              placeholder="市話"
              style="width: 6rem"
              :rules="[{ pattern: /^\d{0,4}$/, message: '錯誤' }]"
            />
            -
            <van-field
              v-model="cityTalk2"
              name="cityTalk2"
              placeholder="市話"
              :rules="[{ pattern: /^\d{0,10}$/, message: '請輸入正確格式' }]"
            />
          </template>
        </van-field>
        <van-field
          v-model="extension"
          name="extension"
          label="分機"
          placeholder="分機"
          :rules="[{ pattern: /^\d{0,5}$/, message: '請輸入正確格式' }]"
        />

        <van-field
          v-model="email"
          name="email"
          label="E-mail"
          required
          placeholder="帳號為您的 E-mail"
          :rules="[{ pattern: emailPtn, message: 'e-mail 格式錯誤' }]"
        />

        <van-field
          v-model="addressTxt"
          is-link
          readonly
          required
          label="接案地點"
          placeholder="請選擇接案地點"
          @click="showAddress = true"
        />
        <van-popup v-model:show="showAddress" round position="bottom">
          <van-cascader
            v-model="addressCascader"
            title="請選擇接案地點"
            :options="options"
            @close="showAddress = false"
            @finish="onFinish"
          />
        </van-popup>

        <van-field
          v-model="type"
          is-link
          readonly
          required
          name="type"
          label="接案類別"
          placeholder="點擊選擇類別"
          @click="showType = true"
        />
        <van-popup v-model:show="showType" position="bottom">
          <van-picker :columns="columns" @confirm="onTypeConfirm" @cancel="showType = false" />
        </van-popup>

        <van-field
          v-model="exp"
          is-link
          readonly
          required
          name="exp"
          label="接案經驗"
          placeholder="點擊選擇年資"
          @click="showExp = true"
        />
        <van-popup v-model:show="showExp" position="bottom">
          <van-picker :columns="expCols" @confirm="onExpConfirm" @cancel="showExp = false" />
        </van-popup>

        <van-field
          v-model="workContent"
          name="workContent"
          rows="4"
          autosize
          required
          label="接案描述"
          type="textarea"
          maxlength="200"
          placeholder="請輸入接案描述"
          show-word-limit
        />
      </van-cell-group>

      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button round type="danger" native-type="submit">修改 / 儲存</van-button></van-col
        >
      </van-row>
    </van-form>
  </section>
</template>

<script setup>
const appConfig = useAppConfig()

// 開放設定
const openChk = ref('')

// 暱稱
const name = ref('')
const namePtn = /^\S.{0,13}\S?$/

// 身份
const roleChk = ref('')

// 電話
const phone = ref('')
const phonePtn = /^\d{1,15}$/

// 分機
const cityTalk = ref('')
const cityTalk2 = ref('')
const extension = ref('')

// 接案地點
const { addressConfig } = appConfig
const showAddress = ref(false)
const addressTxt = ref('')
const addressCascader = ref('')
const options = addressConfig // 选项列表，children 代表子选项，支持多级嵌套
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  showAddress.value = false
  addressTxt.value = selectedOptions.map((option) => option.text).join(' ')
}

// E-mail
const email = ref('')
const emailPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 接案類別
const { caseType } = appConfig
const type = ref('')
const showType = ref(false)
const columns = caseType

const onTypeConfirm = ({ selectedOptions }) => {
  type.value = selectedOptions[0]?.text
  showType.value = false
}

// 年資
const { experience } = appConfig
const exp = ref('')
const showExp = ref(false)
const expCols = experience

const onExpConfirm = ({ selectedOptions }) => {
  exp.value = selectedOptions[0]?.text
  showExp.value = false
}

// 接案描述
const workContent = ref('')
</script>

<style lang="less" scoped>
.list {
  margin: 1rem;
}

label {
  font-size: 1.2rem;
  span {
    color: red;
  }
}
.van-radio-group {
  margin: 0.5rem;
  .van-radio {
    margin: 0.5rem;
  }
}

.role {
  .van-radio {
    width: 8rem;
  }
}

.van-button {
  width: 10rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
}
</style>
