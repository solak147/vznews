<template>
  <section>
    <NavBar title="案件瀏覽" />

    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <van-dropdown-menu @change="caseChg">
      <van-dropdown-item v-model="caseVal" :options="caseOpt" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>

    <van-row class="selTag" align="center">
      <van-col span="3">已選擇</van-col>

      <van-col span="18">
        <van-tag type="primary" size="large" closeable round>标签</van-tag>
      </van-col>

      <van-col span="3"><a href="javascript:void(0)">清除全部</a></van-col>
    </van-row>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" @click="navigateTo('/casem/1')">
        <template #title>
          <label>{{ item._source.title }}</label>
          <div class="subTitle">
            <van-icon name="location" color="#00BB00" />{{
              item._source.work_area_chk === '1' ? '不限' : item._source.work_area
            }}
            <span class="price">${{ item._source.expect_money }}</span>
          </div>
          <div style="float: right"><van-icon name="fire" color="#FFDC35" />0-5人報價</div>
        </template>
        <template #label>
          <van-text-ellipsis rows="4" :content="item._source.work_content" />

          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="listBottom">
            <span>{{ calTimeDiff(item._source.updated_at) }}</span
            ><van-button type="danger">申請報價</van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
  </section>
</template>

<script setup>
const { $request } = useNuxtApp()
const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(() => {
  props.navActive(2)
})

const value2 = ref('a')
const value3 = ref('a')

// menu case
const caseVal = ref(0)
const caseOpt = [
  { text: '全部案件', value: '' },
  { text: '一般案件', value: 'o' },
  { text: '急件', value: 'i' }
]

const caseChg = async () => {
  const res = await $request(
    `/case/get?from=${from.value}&size=${size.value}&kind=${kind.value}`,
    'get'
  )

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value = []
    list.value.push(res.data)
    from.value += 10
  }
}

const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
]
const option3 = [
  { text: '金額', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
]

const from = ref(0)
const size = ref(30)
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 加载状态结束
  loading.value = true

  // 异步更新数据
  const res = await $request(
    `/case/get?from=${from.value}&size=${size.value}&kind=${kind.value}`,
    'get'
  )

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value.push(res.data)
    from.value += 10
  }
  loading.value = false

  finished.value = true
  //   if (list.value.length >= 40) {
  //     finished.value = true
  //   }
}

const calTimeDiff = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diff = (now.getTime() - date.getTime()) / 1000 / 60

  const lstUpdMin = Math.round(diff)
  if (lstUpdMin < 60) {
    return `${lstUpdMin}分鐘前 更新`
  } else if (lstUpdMin >= 60 && lstUpdMin < 60 * 24) {
    return `${Math.floor(lstUpdMin / 60)}小時前 更新`
  } else if (lstUpdMin >= 60 * 24 && lstUpdMin <= 60 * 24 * 30) {
    return `${Math.floor((lstUpdMin / 60) * 24)}天前 更新`
  } else {
    let day = date.getDate()
    let month = date.getMonth()
    const year = date.getFullYear()

    if (day < 10) {
      day = `0${day}`
    }

    if (month < 10) {
      month = `0${month}`
    }

    return `${year}/${month}/${day} 更新`
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem 0rem;
  padding: 1rem 1rem;
}

.van-dropdown-menu {
  margin: 0.5rem;
}

.van-list {
  margin: 0.5rem;
}

.selTag {
  margin: 0.5rem;
  font-size: 1.2rem;
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
  }
}
</style>
