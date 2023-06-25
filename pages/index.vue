<template>
  <div style="overflow: scroll; height: 100vh" @scroll="scroll">
    <section>
      <MoonBanner v-show="tabActive === 0" ref="moonBanner" />

      <MeteorDes v-show="tabActive === 1" />

      <van-tabs v-model:active="tabActive" swipeable animated shrink line-width="2rem" class="tab">
        <van-tab v-for="(item, index) in tabTitle" :key="index">
          <template #title>
            <van-button class="titleBtn">{{ item }}</van-button>
          </template>
          <div v-show="index === 0">
            <div class="frame">
              <img src="@/assets/icon/ico_tag_left.png" />
              <span>廣告合作</span>
              <img src="@/assets/icon/ico_tag_right.png" />
            </div>
            <ImgCombination :list="bannerArr" :type="1"> </ImgCombination>

            <div class="frame">
              <img src="@/assets/icon/ico_tag_left.png" />
              <span>成交紀錄</span>
              <img src="@/assets/icon/ico_tag_right.png" />
            </div>
            <ImgCombination :list="dealPath" :type="3"> </ImgCombination>

            <div class="frame">
              <img src="@/assets/icon/ico_tag_left.png" />
              <span>人才瀏覽</span>
              <img src="@/assets/icon/ico_tag_right.png" />
            </div>
            <ImgCombination :list="cardPath" :type="2"> </ImgCombination>

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

            <van-grid :column-num="2" direction="horizontal" icon-size="3rem" class="case-grid">
              <van-grid-item badge="99+" icon="photo-o" icon-color="#7146ff" text="平面設計">
              </van-grid-item>
              <van-grid-item badge="99+" icon="newspaper-o" icon-color="#7146ff" text="網頁設計">
              </van-grid-item>
              <van-grid-item badge="99+" icon="desktop-o" icon-color="#7146ff" text="程式開發">
              </van-grid-item>
              <van-grid-item badge="99+" icon="edit" icon-color="#7146ff" text="翻譯寫作">
              </van-grid-item>
              <van-grid-item
                badge="99+"
                icon="shopping-cart-o"
                icon-color="#7146ff"
                text="商攝娛樂"
              >
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
          </div>

          <div v-show="index === 1">
            <DropList :list="dealPath"></DropList>
          </div>
        </van-tab>
      </van-tabs>

      <!-- <Swiper
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
      </Swiper> -->
    </section>
  </div>
</template>

<script setup>
const bannerArr = ['images/banner1.jpg', 'images/banner2.jpg', 'images/banner3.jpg']

onMounted(() => {
  dealPath.value = [
    { title: '網站自動化操作', price: '$15000/件' },
    { title: '企管顧問/門市經營顧問/展店顧問', price: '$5000/天' },
    { title: '名片製作', price: '$1000/件' },
    { title: '各類文案撰寫創作', price: '$300/則' },
    { title: '家事服務', price: '$450/時' },
    { title: '網頁設計', price: '$20000/件' },
    { title: '美食短片拍攝', price: '$6000/份' },
    { title: '廣告投放影片/後製/特效/音樂', price: '$3500/件' },
    { title: '數據分析統計報告', price: '$3000/份' },
    { title: '電控電測治具設計開發', price: '$15000/件' },
    { title: '裝潢後細清', price: '$600 /坪' }
  ]
  for (let i = 0; i <= 10; i++) {
    dealPath.value[i].url = `images/deal/deal${i + 1}.png`
  }

  cardPath.value = [
    { tag: '#DM/海報/卡片設計', name: '遠方' },
    { tag: '#網頁版型設計', name: '好創意' },
    { tag: '#UI/UX設計', name: '唯美設計' },
    { tag: '#人像攝影師', name: 'Annie' },
    { tag: '#插畫/漫畫', name: 'cosa' },
    { tag: '#室內空間設計', name: '納托工作室' }
  ]
  for (let i = 0; i < cardPath.value.length; i++) {
    cardPath.value[i].url = `images/card/card${i + 1}.png`
    cardPath.value[i].avatar = `images/card/avatar${i + 1}.png`
  }
})

const dealPath = ref([])
const cardPath = ref([])
const tabTitle = ['接案 & 發案', '作品集']
const tabActive = ref(0)
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
    background-color: #ffc7e7aa;
    border-radius: 100px;
    padding: 0.5rem;
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

.tab {
  .titleBtn {
    background: #e1264a;
    border-radius: 0.8rem;
    color: #ff9797;
  }

  :deep(.van-tab--active) {
    .titleBtn {
      color: #fff;
    }
  }

  :deep(.van-tabs__nav) {
    background-color: transparent;
  }

  :deep(.van-tabs__wrap) {
    margin-top: 3rem;
  }

  :deep(.van-tabs__line) {
    background: #fff;
  }

  .frame {
    margin-top: 2rem;
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
    span {
      color: #e1264a;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 1rem;
    }

    img {
      width: 2rem;
    }
  }
}

.case-grid {
  padding-bottom: 5rem;
}
</style>
