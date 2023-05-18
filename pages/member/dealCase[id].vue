<!-- 案主＆人才 成交案件共用此頁面 -->
<template>
  <section>
    <NavBar title="成交案件" />

    <van-dropdown-menu>
      <van-dropdown-item v-model="status" :options="statusOpt" @change="dataChg" />
    </van-dropdown-menu>

    <van-field label="顯示已結案案件" class="finshCase">
      <template #input>
        <van-switch v-model="finishCasechk" @change="dataChg" />
      </template>
    </van-field>

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
            <van-tag v-show="item.Status === '4'" plain round type="primary">已結案</van-tag>
            <div v-show="item.Status !== '4'">
              <van-icon name="fire" color="#FFDC35" />{{ formattedQuoteTotal(item.QuoteTotal) }}報價
            </div>
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
            <span class="priceSE"
              >報價 : {{ formattedAmount(item.PriceS) }} ~ {{ formattedAmount(item.PriceE) }}
              <van-button type="primary" @click="navigateTo(`/member/dealFlow${item.CaseId}`)"
                >案件管理</van-button
              ></span
            >
          </div>
        </template>
      </van-cell>
    </van-list>
  </section>
</template>

<script setup>
const { $request } = useNuxtApp()
const { calTimeDiff, formattedAmount, formattedQuoteTotal } = useCommon()

const appConfig = useAppConfig()
const { caseStatus } = appConfig

const route = useRoute()
const { id } = route.params

const props = defineProps({
  navActive: {
    type: Function,
    default: null
  }
})

onMounted(() => {
  props.navActive(3)
})

// 案件狀態
const status = ref('')
const statusOpt = Object.assign([], caseStatus)
statusOpt.unshift({ text: '案件狀態', value: '' })

const dataChg = async () => {
  loading.value = true

  const res = await $request(
    `/case/quoteRecord/1?userType=${id}&status=${status.value}&finish=${finishCasechk.value}`,
    'get'
  )
  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value = res.data
  }

  loading.value = false
}

// 顯示已結束案件開關
const finishCasechk = ref(false)

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 异步更新数据
  const res = await $request(
    `/case/quoteRecord/1?userType=${id}&finish=${finishCasechk.value}`,
    'get'
  )

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

  .priceSE {
    align-items: center;
    display: flex;
    font-size: 1.4rem;
    color: black;
    float: right;

    .van-button {
      margin-left: 1rem;
    }
  }
}

.finshCase {
  margin-top: 0.5rem;

  :deep(label) {
    width: 10rem;
    display: inline-block;
  }

  .van-switch {
    margin-left: 2rem;
  }
}
</style>
