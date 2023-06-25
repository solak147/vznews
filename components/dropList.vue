<!-- 瀑布流 -->
<template>
  <van-row type="flex" gutter="8">
    <van-col span="12">
      <div
        v-for="(item, index) in list1"
        :key="index"
        class="aspect-ratio"
        :style="{ paddingTop: `${(1 / item.ratio) * 100}%` }"
      >
        <div class="aspect-ratio-content" @click="$emit('click')">
          <EasyImage :url="item.url" height="100%"></EasyImage>
        </div>
      </div>
    </van-col>
    <van-col span="12">
      <div
        v-for="(item, index) in list2"
        :key="index"
        class="aspect-ratio"
        :style="{ paddingTop: `${(1 / item.ratio) * 100}%` }"
      >
        <div class="aspect-ratio-content" @click="$emit('click')">
          <EasyImage :url="item.url" height="100%"></EasyImage>
        </div>
      </div>
    </van-col>
  </van-row>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default() {
      return []
    }
  }
})

const list1 = ref([])
const list2 = ref([])
const list1heigth = ref(0)
const list2heigth = ref(0)

onMounted(() => {
  props.list.forEach((e, i) => {
    const h = isNaN(Number(e.height)) ? 0 : Number(e.height)
    const w = isNaN(Number(e.width)) ? 0 : Number(e.width)

    let ratio
    if ((h !== 0 && w !== 0) || i % 4 === 0) {
      ratio = 1.2
    } else {
      ratio = 9 / 16
    }

    e.ratio = 1 / ratio
    if (list1heigth.value <= list2heigth.value) {
      list1.value.push(e)
      list1heigth.value += ratio + 0.3656
    } else {
      list2.value.push(e)
      list2heigth.value += ratio + 0.3656
    }
  })
})
</script>

<style lang="less" scoped>
.aspect-ratio {
  position: relative;
  width: 100%;
  overflow: hidden;
  pointer-events: auto;
  margin-top: 0.5rem;
  .aspect-ratio-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    & * {
      width: 100%;
      height: 100%;
    }
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    a {
      pointer-events: auto;
    }
  }
}

.van-col--12 {
  padding: @padding-base;
}
</style>
