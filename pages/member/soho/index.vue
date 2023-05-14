<template>
  <section>
    <NavBar title="接案資料設定" />

    <van-form @submit="submit" @failed="onFailed">
      <van-cell-group inset>
        <div class="list">
          <label>你的頭像 :</label>
          <p>檔案不可超過2MB。(檔案格式為：.png,.jpg,.jpeg,.gif,.bmp,.svg)</p>
          <van-uploader
            v-model="fileList"
            :max-size="2 * 1024 * 1024"
            :after-read="afterRead"
            :max-count="5"
            accept=".png,.jpg,.jpeg,.gif,.bmp,.svg"
            @oversize="onOversize"
            @delete="onDelete"
          />
        </div>

        <div class="list">
          <label><span> * </span>接案狀態 :</label>
          <van-radio-group v-model="openChk">
            <van-space direction="vertical" size="0">
              <van-radio name="1">開啟，顯示聯絡資訊 (全站案主皆能查看您的聯絡資訊)</van-radio>
              <van-radio name="0">關閉</van-radio>
            </van-space>
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
              readonly
              :rules="[{ pattern: namePtn, message: '請輸入正確格式' }]"
            />
            <span class="pubName">此為您對外公開顯示名稱</span>
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
      </van-cell-group>

      <van-cell-group inset>
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
      </van-cell-group>

      <van-cell-group inset>
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

        <van-field label="接案類別" required>
          <template #input>
            <van-checkbox-group v-model="typeChk" direction="horizontal">
              <van-checkbox
                v-for="item in caseType"
                :key="item.value"
                :name="item.value"
                shape="square"
                >{{ item.text }}</van-checkbox
              >
            </van-checkbox-group>
          </template>
        </van-field>

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
          v-model="description"
          name="description"
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
const { $request, $upload, $downloadShow } = useNuxtApp()
const { transAddressCode, transExpCode } = useCommon()

const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(async () => {
  props.navActive(3)

  const resAvatar = await $request('/file/sohowork/avatar', 'get')
  if (resAvatar.code === 0) {
    resAvatar.data.forEach(async (e) => {
      fileList.value.push({
        url: await $downloadShow(`/file/sohoDownload/${e.filename}/avatar`),
        name: e.filename,
        isImage: true
      })
    })
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  const res = await $request('/member/sohoSettingInit', 'get')
  if (res.code === 0) {
    if ('password' in res.data) {
      name.value = res.data.name
      phone.value = res.data.phone
      email.value = res.data.email
      addressCascader.value = res.data.zipcode
      addressTxt.value = transAddressCode(res.data.zipcode)
    } else {
      openChk.value = res.data.open
      roleChk.value = res.data.role
      cityTalk.value = res.data.cityTalk
      cityTalk2.value = res.data.cityTalk2
      extension.value = res.data.extension
      typeChk.value = res.data.type.split(',')

      const expObj = transExpCode(res.data.exp)[0]
      exp.value = expObj.text
      expVal.value = expObj.value

      description.value = res.data.description

      name.value = res.data.name
      phone.value = res.data.phone
      email.value = res.data.email
      addressCascader.value = res.data.zipcode
      addressTxt.value = transAddressCode(res.data.zipcode)
    }
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }
})

onUnmounted(() => {
  fileList.value.forEach((e) => {
    if (e.url && e.url.startsWith('blob:')) {
      URL.revokeObjectURL(e.url)
    }
  })
})

// 頭像上傳
const fileList = ref([])
const onOversize = () => {
  showToast('文件大小不能超过 2MB')
}

const afterRead = async (file) => {
  file.status = 'uploading'
  file.message = '上傳中...'

  const res = await $upload(file.file, 'avatar')
  if (res.code === 0) {
    file.status = 'done'
    file.message = '上傳成功'
  } else {
    file.status = 'failed'
    file.message = '上传失败'
  }
}

// 檔案刪除
const onDelete = async (file) => {
  await $request(`/file/sohowork/${file.name}/avatar`, 'delete')
}

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
const typeChk = ref([])

// 年資
const { experience } = appConfig
const exp = ref('')
const expVal = ref('')
const showExp = ref(false)
const expCols = experience

const onExpConfirm = ({ selectedOptions }) => {
  exp.value = selectedOptions[0]?.text
  expVal.value = selectedOptions[0]?.value
  showExp.value = false
}

// 接案描述
const description = ref('')

const submit = async (values) => {
  const res = await $request('/member/sohoSetting', 'post', {
    ...values,
    open: openChk.value,
    role: roleChk.value,
    zipcode: addressCascader.value,
    expVal: expVal.value,
    type: typeChk.value.join(',')
  })

  if (res.code === 0) {
    showNotify({ type: 'success', message: '儲存成功' })
  } else {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
  }
}
</script>

<style lang="less" scoped>
p {
  line-height: 1.5rem;
  margin: 1rem 1.8rem;
  font-size: 1.3rem;
  color: #969799;
}

.list {
  margin: 1rem;
}

:deep(label) {
  font-size: 1.3rem;
  span {
    color: red;
  }
}

.van-cell-group {
  margin: 1rem;
  padding: 1rem;
}

.van-radio-group {
  margin: 0.5rem;
  .van-radio {
    margin: 0.5rem;
    font-size: 1.3rem;
  }
}

.role {
  .van-radio {
    width: 9rem;
  }
}

.van-button {
  width: 10rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
}

.pubName {
  color: #969799;
  font-size: 1.3rem;
}

.van-checkbox {
  margin-bottom: 1rem;
}

:deep(.van-cascader__option) {
  justify-content: center;
}

:deep(.van-tabs__nav) {
  justify-content: center;
}
</style>
