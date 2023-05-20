<template>
  <section>
    <NavBar title="我的收藏" />

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" @click="navigateTo(`/casem/${item.CaseId}`)">
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
          <van-text-ellipsis rows="4" :content="item.WorkContent" />

          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="listBottom">
            <span>{{ calTimeDiff(item.UpdatedAt) }}</span>
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
  const res = await $request(`/case/collect`, 'get')

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value = res.data
  }
  loading.value = false
  finished.value = true
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
}
</style>
