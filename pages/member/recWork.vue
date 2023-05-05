<template>
  <section>
    <NavBar title="我的作品" />

    <van-form @submit="next" @failed="onFailed">
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
        <van-button icon="plus" type="primary" size="small" @click="add">添加</van-button>
      </van-cell-group>

      <van-cell-group inset class="list">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item">
            <van-field :model-value="item.url" name="website" label="作品網址" readonly />

            <van-field :model-value="item.explain" name="explain" label="作品說明" readonly />

            <van-field>
              <template #button>
                <van-button icon="delete" type="danger" size="small" @click="add">刪除</van-button>
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
// 檔案上傳
const fileList = ref([])
const onOversize = (file) => {
  console.log(file)
  showToast('文件大小不能超过 2MB')
}

const afterRead = (file) => {
  file.status = 'uploading'
  file.message = '上傳中...'

  setTimeout(() => {
    file.status = 'done'
    file.message = '上傳成功'
  }, 1000)
}

// 作品網址
const url = ref('')
const urlPtn = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

// 作品說明
const explain = ref('')
const explainPtn = /^.{1,20}$/

const add = () => {
  if (list.value.length > 9) {
    showDialog({
      message: '已超過10筆，無法再新增!',
      theme: 'round-button'
    })
    return
  }
  list.value.push({ url: url.value, explain: explain.value })
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
