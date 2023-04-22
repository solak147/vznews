<template>
  <div style="overflow: scroll; height: 100vh" @scroll="scroll">
    <section>
      <MoonBanner ref="moonBanner" />

      <MeteorDes />

      <Swiper
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :slides-per-view="1"
        :loop="true"
        :effect="'creative'"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: true
        }"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }"
      >
        <SwiperSlide v-for="slide in bannerArr" :key="slide">
          <van-image height="300px" width="100vw" :src="slide" />
        </SwiperSlide>
      </Swiper>

      <van-row justify="center">
        <van-col class="stepTitle" span="24"> <h1>簡單三步驟</h1></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon-r" name="records" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="20">
          <h3>步驟 1</h3>
          <p>註冊會員，填寫基本資料</p></van-col
        >
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon-r" name="search" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="20">
          <h3>步驟 2</h3>
          <p>搜尋你想要接的案子</p></van-col
        >
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon-r" name="phone" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="20">
          <h3>步驟 3</h3>
          <p>聯絡賣家，開啟你的接案工作</p></van-col
        >
      </van-row>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

      <van-row justify="center">
        <van-col class="stepTitle" span="24"> <h1>尋找專業人才 幫您解決外包難題</h1></van-col>
      </van-row>

      <van-grid :column-num="2" direction="horizontal" icon-size="4.5rem">
        <van-grid-item badge="99+" icon="photo-o" icon-color="#7146ff" text="平面設計">
        </van-grid-item>
        <van-grid-item badge="99+" icon="newspaper-o" icon-color="#7146ff" text="網頁設計">
        </van-grid-item>
        <van-grid-item badge="99+" icon="desktop-o" icon-color="#7146ff" text="程式開發">
        </van-grid-item>
        <van-grid-item badge="99+" icon="edit" icon-color="#7146ff" text="翻譯寫作">
        </van-grid-item>
        <van-grid-item badge="99+" icon="shopping-cart-o" icon-color="#7146ff" text="商攝娛樂">
        </van-grid-item>
        <van-grid-item badge="99+" icon="video-o" icon-color="#7146ff" text="影像製作">
        </van-grid-item>
        <van-grid-item badge="99+" icon="wap-home-o" icon-color="#7146ff" text="空間設計">
        </van-grid-item>
        <van-grid-item badge="99+" icon="flower-o" icon-color="#7146ff" text="生活服務">
        </van-grid-item>
        <van-grid-item badge="99+" icon="cluster-o" icon-color="#7146ff" text="活動企劃">
        </van-grid-item>
        <van-grid-item badge="99+" icon="manager-o" icon-color="#7146ff" text="專業顧問">
        </van-grid-item>
        <van-grid-item badge="99+" icon="setting-o" icon-color="#7146ff" text="資訊工程">
        </van-grid-item>
      </van-grid>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  navActive: {
    type: Function
  }
})

const bannerArr = ['images/banner1.jpg', 'images/banner2.jpg', 'images/banner3.jpg']

onMounted(() => {
  props.navActive(0)
})

const moonBanner = ref(null)
const scroll = (event) => {
  moonBanner.value?.handleScroll(event)
}
</script>

<style lang="less" scoped>
.stepTitle {
  text-align: center;
}

.van-row {
  margin: 2.5rem 1rem;

  p {
    margin: 1rem 0rem;
  }
}

.stepIcon {
  &-r {
    background-color: #ffc7e7;
    border-radius: 100px;
  }
}

:deep(.van-grid-item__content) {
  border-right: 0.1rem solid #4f4e4e;
  border-bottom: 0.1rem solid #4f4e4e;
  background-color: transparent;
}

:deep(.van-grid-item__text) {
  font-size: 1.8rem;
  font-weight: bold;
}
</style>
