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
        <EasyImage :url="item.url" height="200"></EasyImage>
        <div class="text-wrap">
          <div class="avatar-wrap">
            <EasyImage :url="item.avatar" class="avatar"> </EasyImage>
            <span>{{ item.name }}</span>
          </div>
          <div class="tag">
            {{ item.tag }}
          </div>
        </div>
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
        <EasyImage :url="item.url" height="200"></EasyImage>
        <div class="text">
          <span class="title"> {{ item.title }}</span>
          <span class="price">{{ item.price }}</span>
        </div>
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

  .text-wrap {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    span {
      margin-left: 0.5rem;
    }

    .tag {
      text-align: right;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .avatar-wrap {
    display: flex;
    align-items: center;
    width: 21rem;
    .avatar {
      border-radius: 10rem;
      width: 40px;
      height: 40px;
    }
  }
}

.my-swipe {
  width: 100%;

  .text {
    margin-top: 0.5rem;
    font-size: 1.5rem;

    .title {
      display: inline-block;
      overflow: hidden;
      width: 16rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price {
      float: right;
      color: #ee0a24;
      font-weight: bold;
    }
  }
}
</style>
