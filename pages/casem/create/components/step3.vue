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
          name="name"
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
      </van-cell-group>

      <van-cell-group inset>
        <label><span> * </span>聯絡時段 (複選)：</label>

        <van-checkbox-group v-model="timeChk">
          <van-checkbox name="m">9:00 ~ 12:00</van-checkbox>
          <van-checkbox name="a">13:00 ~ 18:00</van-checkbox>
          <van-checkbox name="n">19:00 ~ 21:00</van-checkbox>
          <van-checkbox name="x">不接聽手機</van-checkbox>
        </van-checkbox-group>
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="email"
          name="email"
          label="E-mail :"
          required
          placeholder="請輸入 E-mail"
          :rules="[{ pattern: emailPtn, required: true, message: 'E-mail 格式錯誤' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="line"
          name="line"
          label="Line ID :"
          placeholder="請輸入Line ID"
          :rules="[{ pattern: linePtn, message: '請輸入正確格式' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-checkbox v-model="lawChk">
          我已仔細閱讀並明瞭 「<a href="#">服務條款</a>」、「<a href="#">刊登規則</a>」、<a href="#"
            >「接案會員服務條款</a
          >」、「<a href="#">隱私權聲明</a>」、「<a href="#">免責聲明</a
          >」等所載內容及其意義，茲同意該等條款規定，並願遵守網站現今、嗣後規範的各種規則。
        </van-checkbox>
      </van-cell-group>

      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button round type="danger" native-type="submit">送出</van-button></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script setup>
import { useCaseStore } from '@/stores/case'
import { useUserStore } from '@/stores/user'
const caseStore = useCaseStore()
const userStore = useUserStore()
const { $request } = useNuxtApp()

onMounted(async () => {
  const res = await $request(`/member/profile/${userStore.account}`, 'get')
  name.value = res.user.name
  phone.value = res.user.phone
  email.value = res.user.email
})

const name = ref('')
const phone = ref('')
const cityTalk = ref('')
const cityTalk2 = ref('')
const extension = ref('')
const namePtn = /^\S.{0,13}\S?$/
const phonePtn = /^\d{1,15}$/

const timeChk = ref([])

const email = ref('')
const emailPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const line = ref('')
const linePtn = /^[a-zA-Z0-9_-]*$/

const lawChk = ref(false)

const next = async () => {
  if (timeChk.value.length === 0) {
    showDialog({
      message: '聯絡時段未選擇',
      theme: 'round-button'
    })
  }

  if (!lawChk.value) {
    showDialog({
      message: '必須勾選同意服務條款',
      theme: 'round-button'
    })
  }

  const formData = new FormData()
  caseStore.fileList.forEach((e) => {
    formData.append('filesName', e.file.name)
    formData.append('files[]', e.file)
  })

  formData.append('title', caseStore.title)
  formData.append('type', caseStore.type)
  formData.append('kind', caseStore.kind)
  formData.append('expectDate', caseStore.expectDate)
  formData.append('expectDateChk', caseStore.expectDateChk)
  formData.append('expectMoney', caseStore.expectMoney)
  formData.append('workArea', caseStore.workArea)
  formData.append('workAreaChk', caseStore.workAreaChk)
  formData.append('workContent', caseStore.workContent)

  formData.append('name', name.value)
  formData.append('phone', phone.value)
  formData.append('cityTalk', cityTalk.value)
  formData.append('cityTalk2', cityTalk2.value)
  formData.append('extension', extension.value)
  formData.append('contactTime', timeChk.value.join())
  formData.append('email', email.value)
  formData.append('line', line.value)

  const res = await $request('/case/create', 'post', formData)

  // const res = await $request('/case/create', 'post', {
  //   ...caseStore,
  //   ...values,
  //   account: userStore.account,
  //   contactTime: timeChk.value.join(),
  //   filesName
  // })

  if (res.code !== 0) {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
  } else {
    showDialog({
      message: '發案成功，3~5 分鐘後案件將會上架，請難心等待',
      theme: 'round-button'
    }).then(() => {
      navigateTo('/')
    })
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

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

.van-button {
  margin-bottom: 5rem;
  width: 8rem;
}
</style>
