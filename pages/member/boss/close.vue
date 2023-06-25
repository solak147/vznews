<template>
  <section>
    <NavBar title="下架案件" />

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
            <van-button type="primary" @click="onRePublish(item.CaseId)">重新上架</van-button>
            <van-button type="danger" @click="onDelete(item.CaseId)">案件刪除</van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
  </section>
</template>

<script setup>
const { $request } = useNuxtApp()
const { calTimeDiff, formattedQuoteTotal } = useCommon()

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
  const res = await $request(`/case/getClose`, 'get')
  list.value = res.data

  loading.value = false
  finished.value = true
}

const onRePublish = async (caseId) => {
  await $request(`/case/rePublish/${caseId}`, 'post')
  showNotify({ type: 'success', message: '案件已重新上架' })
  onLoad()
}

const onDelete = async (caseId) => {
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
