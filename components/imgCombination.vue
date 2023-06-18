<template>
  <div>
    <!-- 一行两个 横图 -->
    <van-row v-if="props.type === 1" class="row-2">
      <van-col v-for="(item, index) in props.list" :key="index" span="12">
        <EasyImage :url="item" height="200"></EasyImage>
      </van-col>
    </van-row>

    <!-- 一行三个列表 竖图 -->
    <van-row v-if="props.type === 2" class="row-3">
      <van-col v-for="(item, index) in list" :key="index" span="8">
        <EasyImage :url="item" height="240"></EasyImage>
      </van-col>
    </van-row>

    <!-- 横向滚动-(横图) -->
    <van-swipe
      v-if="props.type === 3"
      class="my-swipe"
      :loop="false"
      :width="300"
      :show-indicators="false"
    >
      <van-swipe-item
        v-for="(item, i) in list"
        :key="i"
        style="padding-right: 15px; box-sizing: border-box"
      >
        <EasyImage :url="item" height="200"></EasyImage>
        <div class="title">123 <span>211</span></div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: null
  },
  type: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="less" scoped>
.row-2 .van-col--12 {
  box-sizing: border-box;
  padding: @padding-base;
}

.row-3 .van-col {
  box-sizing: border-box;
  padding: @padding-base;
}

.my-swipe {
  width: 100%;

  .title {
    margin-top: 0.5rem;
    font-size: 1.5rem;

    span {
      float: right;
    }
  }
}
</style>
