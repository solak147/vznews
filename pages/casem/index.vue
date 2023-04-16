<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>案件瀏覽</h1></van-col>
    </van-row>

    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
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
          <label>尋找演員</label>
          <div class="subTitle">
            <van-icon name="location" color="#00BB00" />台中 <span class="price">$1000</span>
          </div>
          <div style="float: right"><van-icon name="fire" color="#FFDC35" />0-5人報價</div>
        </template>
        <template #label>
          <van-text-ellipsis rows="4" :content="text" />

          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="listBottom">
            <span>5分鐘前更新</span><van-button type="danger">申請報價</van-button>
          </div>
        </template>
      </van-cell>
    </van-list>
  </section>
</template>

<script setup>
const props = defineProps({
  navActive: {
    type: Function
  }
})

onMounted(() => {
  props.navActive(2)
})

const value1 = ref(0)
const value2 = ref('a')
const value3 = ref('a')

const text =
  'Vant 是一个轻量、可定制的移动端组件库，于 2017 年开源。目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。Vant 是一个轻量、可定制的移动端组件库，于 2017 年开源。目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。'

const option1 = [
  { text: '全部案件', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
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

const list = ref([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}

const back = () => {
  history.back()
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
