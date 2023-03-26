<template>
  <section>
    <van-row align="center">
      <van-col span="4"> <van-icon name="fire-o" color="#ff0000" size="5rem" /></van-col>
      <van-col span="12"> <h1>免費接 - Buddha soho</h1></van-col>
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
        <van-image height="400px" width="100vw" :src="slide" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
const bannerArr = ['images/banner1.jpg', 'images/banner2.jpg', 'images/banner3.jpg']
</script>

<style lang="less" scoped>
.swiper-slide {
  min-height: 300px;
}
</style>
