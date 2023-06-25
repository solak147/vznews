<template>
  <section>
    <NavBar title="已發布案件" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item">
        <template #title>
          <label>{{ item.Title }}</label>
          <div class="subTitle">
            <van-icon name="location" color="#00BB00" />{{
              item.WorkAreaChk === '1' ? '不限' : item.WorkArea
            }}
            <span class="price">${{ item.ExpectMoney }}</span>
          </div>
          <div style="float: right">
            <van-icon name="fire" color="#FFDC35" />{{ formattedQuoteTotal(item.QuoteTotal) }}報價
          </div>
        </template>
        <template #label>
          <van-text-ellipsis
            rows="4"
            :content="item.WorkContent"
            @click="navigateTo(`/casem/${item.CaseId}`)"
          />

          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="listBottom">
            <span>{{ calTimeDiff(item.UpdatedAt) }}</span>
            <van-button type="primary" @click="onEdit(item.CaseId)">案件編輯</van-button>
            <van-button type="danger" @click="onClose(item.CaseId)">案件下架</van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
  </section>
</template>

<script setup>
import { useCaseStore } from '@/stores/case'
const { $request, $downloadShow } = useNuxtApp()
const { calTimeDiff, formattedQuoteTotal } = useCommon()
const caseStore = useCaseStore()

const props = defineProps({
  navActive: {
    type: Function,
    default: null
  }
})

onMounted(() => {
  props.navActive(3)
})

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 异步更新数据
  const res = await $request(`/case/release`, 'get')
  list.value = res.data

  loading.value = false
  finished.value = true
}

const onEdit = async (caseId) => {
  const res = await $request(`/case/getDetailAuthOri/${caseId}`, 'get')
  caseStore.caseId = res.data.caseId
  caseStore.title = res.data.title
  caseStore.type = res.data.type
  caseStore.expectDate = res.data.expectDate
  caseStore.expectDateChk = res.data.expectDateChk
  caseStore.expectMoney = res.data.expectMoney
  caseStore.workArea = res.data.workArea
  caseStore.workAreaChk = res.data.workAreaChk
  caseStore.kind = res.data.kind
  caseStore.workContent = res.data.workContent

  caseStore.name = res.data.name
  caseStore.phone = res.data.phone
  caseStore.cityTalk = res.data.cityTalk
  caseStore.cityTalk2 = res.data.cityTalk2
  caseStore.extension = res.data.extension
  caseStore.contactTime = res.data.contactTime.split(',')
  caseStore.email = res.data.email
  caseStore.line = res.data.line

  caseStore.fileList = []
  res.files.forEach(async (e) => {
    if (
      e.filename.toLowerCase().endsWith('.png') ||
      e.filename.toLowerCase().endsWith('.jpg') ||
      e.filename.toLowerCase().endsWith('.gif')
    ) {
      caseStore.fileList.push({
        url: await $downloadShow(`/file/download/${e.caseId}/${e.filename}`),
        name: e.filename,
        isImage: true
      })
    } else {
      caseStore.fileList.push({ url: e.filename, name: e.filename })
    }
  })

  navigateTo(`/casem/create?caseId=${caseId}`)
}

const onClose = async (caseId) => {
  await $request(`/case/close/${caseId}`, 'post')
  onLoad()
}
</script>

<style lang="less" scoped>
.van-list {
  margin: 0.5rem;
  margin-bottom: 5rem;
}

label {
  font-size: 1.4rem;
  font-weight: bold;
}

.subTitle {
  display: inline;
  margin: 1rem;
}

.price {
  color: red;
  margin: 1rem;
}

.listBottom {
  span {
    float: left;
  }

  button {
    float: right;
    margin-left: 0.5rem;
  }
}
</style>
