<template>
  <div style="overflow: scroll; height: 100vh" @scroll="scroll">
    <section>
      <MoonBanner ref="moonBanner" />

      <van-row align="center">
        <van-col span="24">
          <p>
            超越接案軟體，Buddha
            為用戶建構全新的接案型態與豐富的數位生活，成為用戶生活中不可或缺的平台。
          </p></van-col
        >
      </van-row>

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

      <van-row justify="center">
        <van-col class="stepTitle" span="24"> <h1>尋找專業人才 幫您解決外包難題</h1></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="photo-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>平面設計</h3>
        </van-col>
        <van-col span="4">
          <van-icon class="stepIcon" name="newspaper-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8"> <h3>網頁設計</h3></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="desktop-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>程式開發</h3>
        </van-col>
        <van-col span="4">
          <van-icon class="stepIcon" name="edit" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8"> <h3>翻譯寫作</h3></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="shopping-cart-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>商攝娛樂</h3>
        </van-col>
        <van-col span="4">
          <van-icon class="stepIcon" name="video-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8"> <h3>影像製作</h3></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="wap-home-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>空間設計</h3>
        </van-col>
        <van-col span="4">
          <van-icon class="stepIcon" name="flower-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8"> <h3>生活服務</h3></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="cluster-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>活動企劃</h3>
        </van-col>
        <van-col span="4">
          <van-icon class="stepIcon" name="manager-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8"> <h3>專業顧問</h3></van-col>
      </van-row>

      <van-row>
        <van-col span="4">
          <van-icon class="stepIcon" name="setting-o" color="#ff0000" size="4rem"
        /></van-col>
        <van-col span="8">
          <h3>資訊工程</h3>
        </van-col>
      </van-row>
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
  background-color: #ffc7e7;

  &-r {
    background-color: #ffc7e7;
    border-radius: 100px;
  }
}
</style>
