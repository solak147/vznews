<template>
  <section>
    <NavBar title="案件瀏覽" />

    <van-search v-model="search" placeholder="請輸入搜索關鍵詞" @search="onSearch" />

    <van-dropdown-menu>
      <van-dropdown-item v-model="city" :options="cityOpt" @change="menuChg($event, 'city')" />
      <van-dropdown-item v-model="type" :options="typeOpt" @change="menuChg($event, 'type')" />
      <van-dropdown-item
        v-model="casePrice"
        :options="casePriceOpt"
        @change="menuChg($event, 'price')"
      />
    </van-dropdown-menu>

    <div class="selTag">
      <div>
        已選擇 :

        <van-tag
          v-for="item in allTags"
          v-show="item.value"
          :key="item"
          type="primary"
          size="large"
          closeable
          round
          >{{ item.value }}</van-tag
        >
      </div>

      <div><a href="javascript:void(0)">清除全部</a></div>
    </div>

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
const appConfig = useAppConfig()

const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(() => {
  props.navActive(2)
})

// 搜索 bar
const search = ref('')
const onSearch = async (val) => {
  loading.value = true
  from.value = 0
  const res = await $request(
    `/case/get?from=${from.value}&city=${city.value}&type=${type.value}&price=${casePrice.value}&search=${val}`,
    'get'
  )

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value = []
    if (res.data) {
      res.data.forEach((e) => {
        list.value.push(e)
      })
    }
  }
  loading.value = false
}

// 已選標籤
const cityTags = ref('')
const typeTags = ref('')
const priceTags = ref('')
const allTags = ref([cityTags, typeTags, priceTags])

// 地區
const city = ref('')
const { addressConfig } = appConfig
const cityOpt = [{ text: '地區', value: '' }]
addressConfig.forEach((city) => {
  cityOpt.push({ text: city.text, value: city.text })
})

const menuChg = async (sel, menu) => {
  switch (menu) {
    case 'city':
      cityTags.value = sel
      break

    case 'type':
      typeTags.value = sel
      break

    case 'price':
      priceTags.value = sel
      break
  }

  loading.value = true
  from.value = 0
  const res = await $request(
    `/case/get?from=${from.value}&city=${city.value}&type=${type.value}&price=${casePrice.value}&search=${search.value}`,
    'get'
  )

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    list.value = []
    if (res.data) {
      res.data.forEach((e) => {
        list.value.push(e)
      })
    }
  }
  loading.value = false
}

// 案件類型：平面設計
const type = ref('')
const { caseType } = appConfig
const typeOpt = Object.assign([], caseType)
typeOpt.unshift({ text: '案件類別', value: '' })

// 案件金額
const casePrice = ref('')
const { price } = appConfig
const casePriceOpt = Object.assign([], price)
casePriceOpt.unshift({ text: '案件金額', value: '' })

const from = ref(0)
const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 加载状态结束
  loading.value = true

  // 异步更新数据
  const res = await $request(`/case/get?from=${from.value}`, 'get')

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    res.data.forEach((e) => {
      list.value.push(e)
    })
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

.van-dropdown-menu {
  margin: 0.5rem;
}

.van-list {
  margin: 0.5rem;
}

.selTag {
  margin: 0.5rem;
  font-size: 1.2rem;

  div {
    margin: 0.5rem;
  }

  .van-tag {
    margin: 0.5rem;
  }
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
