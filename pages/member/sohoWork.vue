<template>
  <section>
    <NavBar title="我的作品" />

    <van-form @submit="add" @failed="onFailed">
      <van-cell-group inset>
        <van-space direction="vertical">
          <label>附件上傳 :</label>
          <p>
            最多可上傳5個附件，每個附件不可超過2MB。(檔案格式為：.doc,.pdf,.ppt,.jpf,.gif,.png,.txt)
          </p>
          <van-uploader
            v-model="fileList"
            :max-size="2 * 1024 * 1024"
            :after-read="afterRead"
            :max-count="5"
            accept=".doc,.pdf,.ppt,.jpf,.gif,.png,.txt"
            @oversize="onOversize"
            @delete="onDelete"
          />
        </van-space>
      </van-cell-group>

      <van-cell-group inset class="add">
        <van-field
          v-model="url"
          name="url"
          label="作品網址"
          placeholder="例 ： http://...."
          :rules="[{ pattern: urlPtn, message: '網址格式有誤' }]"
        />

        <van-field
          v-model="explain"
          name="explain"
          label="作品說明"
          placeholder="例 ： This is my blog"
          :rules="[{ pattern: explainPtn, message: '文字過長' }]"
        />
        <van-field left-icon="warning-o" placeholder="最多新增 10 筆資料" readonly />
        <van-button icon="plus" type="primary" size="small" native-type="submit">添加</van-button>
      </van-cell-group>

      <van-cell-group inset class="list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item">
            <van-field :model-value="item.url" label="作品網址" readonly />

            <van-field :model-value="item.explain" label="作品說明" readonly />

            <van-field>
              <template #button>
                <van-button
                  icon="delete"
                  type="danger"
                  size="small"
                  native-type="button"
                  @click="delBtn(item)"
                  >刪除</van-button
                >
              </template>
            </van-field>

            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />
          </div>
        </van-list>
      </van-cell-group>
    </van-form>
  </section>
</template>

<script setup>
const { $request, $upload, $downloadShow } = useNuxtApp()

const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(async () => {
  props.navActive(3)

  const res = await $request('/file/sohowork', 'get')
  if (res.code === 0) {
    res.data.forEach(async (e) => {
      if (
        e.filename.toLowerCase().endsWith('.png') ||
        e.filename.toLowerCase().endsWith('.jpf') ||
        e.filename.toLowerCase().endsWith('.gif')
      ) {
        fileList.value.push({
          url: await $downloadShow(e.filename),
          name: e.filename,
          isImage: true
        })
      } else {
        fileList.value.push({ url: e.filename, name: e.filename })
      }
    })
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  const resUrl = await $request('/member/sohoUrl', 'get')
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
  fileList.value.forEach((e) => {
    if (e.url.startsWith('blob:')) {
      URL.revokeObjectURL(e.url)
    }
  })
})

// 檔案上傳
const fileList = ref([])
const onOversize = (file) => {
  console.log(file)
  showToast('文件大小不能超过 2MB')
}

const afterRead = async (file) => {
  file.status = 'uploading'
  file.message = '上傳中...'

  const res = await $upload(file.file)
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
  await $request(`/file/sohowork/${file.name}`, 'delete')
}

// 作品網址
const url = ref('')
const urlPtn = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

// 作品說明
const explain = ref('')
const explainPtn = /^.{1,20}$/

const add = async (values) => {
  if (list.value.length > 9) {
    showDialog({
      message: '已超過10筆，無法再新增!',
      theme: 'round-button'
    })
    return
  }

  const res = await $request(`/member/sohoUrl`, 'post', { ...values })

  if (res.code !== 0) {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
    return
  }

  list.value.push({ index: list.value.length + 1, url: url.value, explain: explain.value })
}

// 網址刪除
const delBtn = async (i) => {
  const res = await $request(`/member/sohoUrl`, 'delete', {
    url: i.url
  })

  if (res.code === 0) {
    list.value = list.value.filter((item) => item.index !== i.index)
    showNotify({ type: 'success', message: '刪除成功' })
  } else {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
  }
}

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
.van-cell-group {
  margin: 1rem;
  padding: 1rem;
}

label {
  font-size: 1.3rem;
  margin: 1rem;
}

p {
  margin: 0.5rem 3rem;
  font-size: 1.3rem;
  color: #969799;
}

.van-uploader {
  margin: 0.5rem 3rem;
}

.add {
  Button {
    float: right;
    margin-top: 1rem;
  }
}

.list {
  background-color: rgba(100, 217, 240, 0.131);
  .van-cell {
    background-color: rgba(100, 217, 240, 0.131);
  }
}
</style>
