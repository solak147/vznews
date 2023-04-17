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

      <van-cell-group inset>
        <van-field
          v-model="website"
          name="website"
          label="作品網址"
          placeholder="例 ： http://...."
          :rules="[{ pattern: websitePtn, message: '網址格式有誤' }]"
        />
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
const website = ref('')
const websitePtn = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
</script>

<style lang="less" scoped>
.van-cell-group {
  margin: 1rem;
  padding: 1rem;
}

label {
  font-size: 1.5rem;
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
</style>
