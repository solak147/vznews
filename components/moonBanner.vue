<template>
  <van-sticky
    :style="{ height: `${bgheight}vh` }"
    style="background: radial-gradient(#525051, #080506)"
  >
    <div id="retrobg" :style="{ height: `${bgheight}vh` }">
      <div id="retrobg-sky">
        <div id="retrobg-stars">
          <div class="retrobg-star" style="left: 5%; top: 55%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 7%; top: 5%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 10%; top: 45%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 12%; top: 35%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 15%; top: 39%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 20%; top: 10%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 35%; top: 50%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 40%; top: 16%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 43%; top: 28%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 45%; top: 30%; transform: scale(3)"></div>
          <div class="retrobg-star" style="left: 55%; top: 18%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 60%; top: 23%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 62%; top: 44%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 67%; top: 27%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 75%; top: 10%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 80%; top: 25%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 83%; top: 57%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 90%; top: 29%; transform: scale(2)"></div>
          <div class="retrobg-star" style="left: 95%; top: 5%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 96%; top: 72%; transform: scale(1)"></div>
          <div class="retrobg-star" style="left: 98%; top: 70%; transform: scale(3)"></div>
        </div>
        <div id="retrobg-sunWrap">
          <div id="retrobg-sun" @click="backgroundToggle"></div>
        </div>
        <div id="retrobg-mountains">
          <div id="retrobg-mountains-left" class="retrobg-mountain"></div>
          <div id="retrobg-mountains-right" class="retrobg-mountain"></div>
        </div>
        <div id="retrobg-cityWrap">
          <div id="retrobg-city">
            <div style="left: 4%; height: 20%; width: 3%" class="retrobg-building"></div>
            <div style="left: 6%; height: 50%; width: 1.5%" class="retrobg-building"></div>
            <div style="left: 8%; height: 25%; width: 4%" class="retrobg-building"></div>
            <div style="left: 12%; height: 30%; width: 3%" class="retrobg-building"></div>
            <div
              style="left: 13%; height: 55%; width: 3%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 17%; height: 20%; width: 4%" class="retrobg-building"></div>
            <div style="left: 18.5%; height: 70%; width: 1.5%" class="retrobg-building"></div>
            <div style="left: 20%; height: 30%; width: 4%" class="retrobg-building"></div>
            <div
              style="left: 21.5%; height: 80%; width: 2%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 25%; height: 60%; width: 4%" class="retrobg-building"></div>
            <div style="left: 28%; height: 40%; width: 4%" class="retrobg-building"></div>
            <div style="left: 30%; height: 70%; width: 4%" class="retrobg-building"></div>
            <div
              style="left: 35%; height: 65%; width: 4%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 38%; height: 40%; width: 3%" class="retrobg-building"></div>
            <div style="left: 42%; height: 60%; width: 2%" class="retrobg-building"></div>
            <div
              style="left: 43%; height: 85%; width: 4%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 45%; height: 40%; width: 3%" class="retrobg-building"></div>
            <div style="left: 48%; height: 25%; width: 3%" class="retrobg-building"></div>
            <div style="left: 50%; height: 80%; width: 4%" class="retrobg-building"></div>
            <div style="left: 52%; height: 32%; width: 5%" class="retrobg-building"></div>
            <div
              style="left: 55%; height: 55%; width: 3%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 58%; height: 45%; width: 4%" class="retrobg-building"></div>
            <div style="left: 61%; height: 90%; width: 4%" class="retrobg-building"></div>
            <div
              style="left: 66%; height: 99%; width: 4%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 69%; height: 30%; width: 4%" class="retrobg-building"></div>
            <div style="left: 73.5%; height: 90%; width: 2%" class="retrobg-building"></div>
            <div style="left: 72%; height: 70%; width: 4%" class="retrobg-building"></div>
            <div style="left: 75%; height: 60%; width: 4%" class="retrobg-building"></div>
            <div style="left: 80%; height: 40%; width: 4%" class="retrobg-building"></div>
            <div
              style="left: 83%; height: 70%; width: 4%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div
              style="left: 87%; height: 60%; width: 3%"
              class="retrobg-building retrobg-antenna"
            ></div>
            <div style="left: 93%; height: 50%; width: 3%" class="retrobg-building"></div>
            <div style="left: 91%; height: 30%; width: 4%" class="retrobg-building"></div>
            <div style="left: 94%; height: 20%; width: 3%" class="retrobg-building"></div>
            <div style="left: 98%; height: 35%; width: 2%" class="retrobg-building"></div>
          </div>
        </div>
      </div>
      <div id="retrobg-ground">
        <div id="retrobg-linesWrap">
          <div id="retrobg-lines">
            <div id="retrobg-vlines">
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
              <div class="retrobg-vline"></div>
            </div>
            <div id="retrobg-hlines">
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
              <div class="retrobg-hline"></div>
            </div>
          </div>
        </div>
        <div id="retrobg-groundShadow"></div>
      </div>

      <transition>
        <van-row v-show="isBig" align="center" class="subTitle">
          <van-col span="24"> <h3>Buddha Soho</h3></van-col>
        </van-row>
      </transition>

      <transition>
        <van-row :class="title" align="center">
          <van-col span="21" offset="3">
            <h1>Life on Buddha</h1>

            <p v-show="isBig">Buddha 始終陪伴在你身旁。</p>

            <van-button v-show="isBig" icon="fire" @click="navigateTo('/member/register')"
              >立即註冊</van-button
            >
          </van-col>
        </van-row>
      </transition>
    </div>
  </van-sticky>
</template>

<script setup>
const title = ref('title')
const isBig = ref(true)
let timer

onMounted(() => {
  // 设置计时器
  timer = setInterval(() => {
    backgroundToggle()
  }, 60000) // 5秒后触发
})

onUnmounted(() => {
  // 清除计时器
  clearInterval(timer)
})

const bgheight = ref(50)
const handleScroll = (event) => {
  if (event.target.scrollTop === 0) {
    bgheight.value = 50
    isBig.value = true
    title.value = 'title'
  } else {
    bgheight.value = 20
    isBig.value = false
    title.value = 'title sm'
  }
}

const backgroundToggle = () => {
  document.querySelector('#retrobg').classList.toggle('retrobg-shutdown')
}

defineExpose({
  handleScroll
})
</script>

<style lang="less" scoped>
.subTitle {
  color: #fff;
  top: 1rem;
  left: 1rem;
  opacity: 0.8;
  position: relative;
}

.title {
  position: relative;
  color: #fff;
  top: 14rem;
  opacity: 0.8;
  transition: ease 1s;

  h1 {
    font-size: 4rem;
  }

  p {
    margin-top: 1rem;
  }

  .van-button {
    color: #fff;
    background-color: #ffffff00;
    border: 0.1rem solid #fff;
    opacity: 0.8;
    margin-top: 2rem;
  }
}

.sm {
  top: 5rem;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

#retrobg {
  position: relative;
  overflow: hidden;
  width: 100vw;
  color: #a3c;
  background-color: #000;
  transition: height 0.5s;
}

/* ............................................................... */
#retrobg-sky {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 55%;
  background: linear-gradient(#214 75%, #249);
}

/* ............................................................... */
#retrobg-sunWrap {
  position: relative;
  width: 40%;
  margin-bottom: -15%;
}
#retrobg-sun {
  --glow-color: #d44;
  padding-top: 100%;
  border-radius: 50%;
  background-image: linear-gradient(#fcdf11, #ff623f, #fe2085 50%);
  box-shadow: 0 0 160px 80px var(--glow-color);
  animation: 2s ease infinite alternate retrobg-sun-glow-anim;
}
.retrobg-shutdown #retrobg-sun {
  background-image: linear-gradient(#000, #000 40%);
  --glow-color: #000;
}
@keyframes retrobg-sun-glow-anim {
  from {
    box-shadow: 0 0 160px 80px var(--glow-color);
  }
  to {
    box-shadow: 0 0 200px 95px var(--glow-color);
  }
}

/* ............................................................... */
#retrobg-stars {
  position: absolute;
  width: 100%;
  height: 100%;
}
.retrobg-star {
  position: absolute;
  border-radius: 50%;
  width: 2px;
  height: 2px;
  background-color: #fff;
}

/* ............................................................... */
#retrobg-mountains {
  position: absolute;
  width: 100%;
  height: 30%;
}
.retrobg-mountain {
  position: absolute;
  width: 30%;
  height: 100%;
  background-image: linear-gradient(#000 70%, #111 85%, #fff1);
}
#retrobg-mountains-left {
  left: 0;
  clip-path: polygon(
    0% 100%,
    0% 55%,
    5% 60%,
    10% 55%,
    20% 50%,
    25% 42%,
    30% 38%,
    33% 35%,
    40% 45%,
    50% 50%,
    60% 70%,
    70% 85%,
    75% 82%,
    80% 91%,
    85% 90%,
    90% 95%,
    95% 98%,
    100% 100%
  );
}
#retrobg-mountains-right {
  right: 0;
  clip-path: polygon(
    0% 100%,
    5% 95%,
    10% 85%,
    15% 87%,
    20% 80%,
    25% 78%,
    30% 65%,
    40% 70%,
    50% 57%,
    60% 53%,
    67% 68%,
    70% 70%,
    75% 66%,
    80% 55%,
    90% 50%,
    95% 60%,
    100% 57%,
    100% 100%
  );
}

/* ............................................................... */
#retrobg-cityWrap {
  position: absolute;
  width: 50%;
  margin-left: -1%;
}
#retrobg-city {
  padding-top: 20%;
}
.retrobg-building {
  position: absolute;
  width: 5%;
  height: 100%;
  bottom: 0;
  border-radius: 4px 4px 0 0;
  background-image: linear-gradient(0deg, rgba(17, 17, 34, 0), #112 30px, #000);
}
.retrobg-building:nth-child(odd) {
  background-image: linear-gradient(0deg, rgba(24, 24, 42, 0), #223 30px, #000);
}
.retrobg-antenna::after {
  content: '';
  position: absolute;
  left: 50%;
  margin-left: calc(-1px - 5%);
  bottom: 100%;
  width: 10%;
  min-width: 2px;
  height: 33%;
  background-color: #000;
}

/* ............................................................... */
#retrobg-ground {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 45%;
  bottom: 0;
  border-top: 2px solid #bf578c;
  background-color: #000;
}
.retrobg-shutdown #retrobg-ground {
  border-color: #000;
}
#retrobg-groundShadow {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#000 0%, transparent);
}

/* ............................................................... */
#retrobg-linesWrap {
  height: 100%;
  perspective: 1000px;
  perspective-origin: center top;
}
#retrobg-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: top center;
  animation: 0.35s linear infinite retrobg-lines-anim;
}
.retrobg-shutdown #retrobg-lines {
  animation-duration: 5s;
}
@keyframes retrobg-lines-anim {
  from {
    transform: rotateX(84deg) translateY(0);
  }
  to {
    transform: rotateX(84deg) translateY(100px);
  }
}
#retrobg-hlines,
#retrobg-vlines {
  position: absolute;
  left: calc((900% - 100%) / -2);
  width: 900%;
  height: 500%;
}
#retrobg-vlines {
  display: flex;
  justify-content: center;
}
.retrobg-hline,
.retrobg-vline {
  width: 100%;
  height: 100%;
  background-color: currentColor;
}
.retrobg-hline {
  height: 3px;
}
.retrobg-vline {
  width: 3px;
}
.retrobg-hline + .retrobg-hline {
  margin-top: 98px;
}
.retrobg-vline + .retrobg-vline {
  margin-left: 48px;
}
</style>
