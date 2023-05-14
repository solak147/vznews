<template>
  <section>
    <NavBar title="個人檔案預覽" />

    <van-cell-group inset>
      <van-card :desc="roleChk" :title="name" :thumb="avatarUrl" />
      <span class="exp">{{ exp }}</span>
    </van-cell-group>

    <van-cell-group inset>
      <van-field
        v-model="phone"
        name="phone"
        label="電話"
        readonly=""
        placeholder="請輸入聯絡電話"
        :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
      />

      <van-field v-if="!cityTalk" model-value="未提供" label="市話" readonly="" />

      <template v-else>
        <van-field label="市話">
          <template #input>
            <van-field
              v-model="cityTalk"
              name="cityTalk"
              placeholder="市話"
              style="width: 6rem"
              readonly
              :rules="[{ pattern: /^\d{0,4}$/, message: '錯誤' }]"
            />
            -
            <van-field
              v-model="cityTalk2"
              name="cityTalk2"
              placeholder="市話"
              readonly
              :rules="[{ pattern: /^\d{0,10}$/, message: '請輸入正確格式' }]"
            />
          </template>
        </van-field>
        <van-field
          v-model="extension"
          name="extension"
          label="分機"
          placeholder="分機"
          readonly
          :rules="[{ pattern: /^\d{0,5}$/, message: '請輸入正確格式' }]"
        />
      </template>

      <van-field
        v-model="email"
        name="email"
        label="E-mail"
        placeholder="帳號為您的 E-mail"
        readonly
        :rules="[{ pattern: emailPtn, message: 'e-mail 格式錯誤' }]"
      />
    </van-cell-group>

    <van-cell-group inset>
      <van-field v-model="addressTxt" readonly label="接案地點" placeholder="請選擇接案地點" />

      <van-field v-model="typeChk" label="接案類別" readonly />

      <van-field
        v-model="description"
        name="description"
        autosize
        label="接案描述"
        type="textarea"
        maxlength="200"
        placeholder="請輸入接案描述"
        readonly
      />
    </van-cell-group>

    <van-cell-group>
      <van-space direction="vertical">
        <label>作品檔案 :</label>
        <div>
          <van-image
            v-for="(item, index) in workPicList.images"
            :key="item"
            width="7rem"
            height="7rem"
            :src="item"
            @click="showImg(index)"
          />
        </div>

        <div>
          <a
            v-for="item in workFileList"
            :key="item"
            href="javascript:void(0)"
            class="workFile"
            @click="$download(`/file/sohoDownload/${item}/work?account=${id}`, item)"
            >{{ item }}</a
          >
        </div>

        <div style="margin-top: 3rem">
          <label>作品網址 :</label>
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="item in list" :key="item">
              <van-field label="作品網址">
                <template #input>
                  <a :href="item.url">{{ item.url }}</a>
                </template>
              </van-field>

              <van-field :model-value="item.explain" label="作品說明" readonly />

              <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
              />
            </div>
          </van-list>
        </div>
      </van-space>
    </van-cell-group>

    <van-cell-group> </van-cell-group>
  </section>
</template>

<script setup>
const { $request, $download, $downloadShow } = useNuxtApp()
const { transAddressCode, transExpCode, trnasRoleCode, trnasCaseTypeCode } = useCommon()

const route = useRoute()
const { id } = route.params

const props = defineProps({
  navActive: {
    type: Function
  }
})

const avatarUrl = ref('')
onMounted(async () => {
  props.navActive(3)

  const resAvatar = await $request('/file/sohowork/avatar', 'get')
  if (resAvatar.code === 0) {
    resAvatar.data.forEach(async (e) => {
      avatarUrl.value = await $downloadShow(`/file/sohoDownload/${e.filename}/avatar`)
    })
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  const res = await $request(`/member/sohoSettingInit?account=${id}`, 'get')
  if (res.code === 0) {
    if ('password' in res.data) {
      name.value = res.data.name
      phone.value = res.data.phone
      email.value = res.data.email
      addressTxt.value = transAddressCode(res.data.zipcode)
    } else {
      name.value = res.data.name

      roleChk.value = trnasRoleCode(res.data.role)

      cityTalk.value = res.data.cityTalk
      cityTalk2.value = res.data.cityTalk2
      extension.value = res.data.extension
      typeChk.value = trnasCaseTypeCode(res.data.type.split(','))

      const expObj = transExpCode(res.data.exp)[0]
      exp.value = expObj.text

      description.value = res.data.description

      name.value = res.data.name
      phone.value = res.data.phone
      email.value = res.data.email
      addressTxt.value = transAddressCode(res.data.zipcode)
    }
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  const resWork = await $request(`/file/sohowork/work?account=${id}`, 'get')
  if (resWork.code === 0) {
    resWork.data.forEach(async (e) => {
      if (
        e.filename.toLowerCase().endsWith('.png') ||
        e.filename.toLowerCase().endsWith('.jpg') ||
        e.filename.toLowerCase().endsWith('.gif')
      ) {
        workPicList.images.push(
          await $downloadShow(`/file/sohoDownload/${e.filename}/work?account=${id}`)
        )
      } else {
        workFileList.value.push(e.filename)
      }
    })
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  const resUrl = await $request(`/member/sohoUrl?account=${id}`, 'get')
  if (resUrl.code === 0) {
    let index = 0
    resUrl.data.forEach((e) => {
      list.value.push({ index, url: e.url, explain: e.explain })
      index++
    })
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }
})

onUnmounted(() => {
  workPicList.images.forEach((e) => {
    if (e) {
      URL.revokeObjectURL(e)
    }
  })
})

// 暱稱
const name = ref('')

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
const addressTxt = ref('')

// E-mail
const email = ref('')
const emailPtn = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 接案類別
const typeChk = ref('')

// 年資
const exp = ref('')

// 接案描述
const description = ref('')

// 作品
const workPicList = reactive({
  images: [],
  startPosition: 0
})

// 作品檔案
const workFileList = ref([])

const showImg = (index) => {
  workPicList.startPosition = index
  showImagePreview(workPicList)
}

// 作品網址
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 加载状态结束
  loading.value = false
  finished.value = true
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

p {
  line-height: 1.5rem;
  margin: 1rem 1.8rem;
  font-size: 1.3rem;
  color: #969799;
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

:deep(.van-card__title) {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 2rem 1rem;
}

:deep(.van-card__desc) {
  font-size: 1.3rem;
  margin-left: 1rem;
  color: black;
}

.exp {
  font-size: 1.3rem;
  float: right;
  color: #969799;
}

.van-image {
  margin: 1rem;
}

.van-space {
  padding: 1rem;
}

.workFile {
  font-size: 1.3rem;
  margin: 1rem;
}

// white-space: pre-wrap; 顯示換行&空白
</style>
