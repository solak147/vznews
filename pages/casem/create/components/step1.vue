<template>
  <div>
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :touchable="false"
        :show-indicators="false"
      >
        <van-swipe-item>立即填寫您的需求，解決您的難題！</van-swipe-item>
        <van-swipe-item>快速了解發案流程，點此查看<a href="#">發案教學</a>。</van-swipe-item>
      </van-swipe>
    </van-notice-bar>

    <van-progress :percentage="50" stroke-width="8" track-color="#ADADAD" />

    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <van-field
          v-model="title"
          required
          name="title"
          label="案件標題"
          placeholder="例 ： 電商網站建置、公司名片設計..."
          :rules="[{ pattern: titlePtn, message: '案件標題需至少輸入3個字以上，且20字以下' }]"
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-field
          v-model="type"
          is-link
          readonly
          required
          name="picker"
          label="選擇類別"
          placeholder="點擊選擇類別"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit"> 下一步 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { useCaseStore } from '@/stores/case'
const caseStore = useCaseStore()

const title = ref('')
const titlePtn = /^.{3,20}$/

const appConfig = useAppConfig()
const { caseType } = appConfig
const type = ref('')
const showPicker = ref(false)
const columns = caseType

const onConfirm = ({ selectedOptions }) => {
  type.value = selectedOptions[0]?.text
  showPicker.value = false
}

const next = () => {
  caseStore.title = title.value
  caseStore.type = type.value
  navigateTo('/casem/create/detail')
}
</script>

<style lang="less" scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
