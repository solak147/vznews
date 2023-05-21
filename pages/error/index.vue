<template>
  <section>
    <div id="typo" class="title-tx">Buddha Soho<br />Unknown Error Occurred</div>
    <div class="noservice-logo">
      <!-- <img :src="`${cdnUrl}/Logo/${Theme}/logo.png`" /> -->
    </div>
    <div class="ip-text">
      <p>發生未預期的錯誤，請稍後再試或寄信至我們的官方信箱回報，我們將盡快處理。</p>
      <span>官方信箱 : buddhasoho@gmail.com</span>
      <p>
        An unexpected error occurred, please try again later or send a letter to our official
        mailbox to report, we will deal with it as soon as possible.
      </p>
      Official mailbox: buddhasoho@gmail.com<br />
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'error'
})
</script>

<style lang="less" scoped>
.noservice-bg-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #333;
  line-height: 1.1;
}
.noservice-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  margin: -125px 0 0 -125px;
  background: #fff;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 50%;
  animation: circleAnimation 5.5s infinite ease-out;
  transform: scale(0, 0);
  line-height: 1.1;
}
.noservice-bg-2 {
  animation-delay: 1.7s;
}
.noservice-bg-3 {
  animation-delay: 2s;
}
/* Safari 4.0 - 8.0 */
@-webkit-keyframes circleAnimation {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(4, 4);
    background: #fff;
    background: transparent;
  }
}
@keyframes circleAnimation {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(4, 4);
    background: #fff;
    background: transparent;
  }
}

/* 憭硋惜 */
.noservice-wrap {
  width: 100%;
  height: 100%;
  height: 100vh;
  position: relative;
  color: #b2b2b2;
  font-size: 15px;
  text-align: center;
  margin: 0;
  font-family: STHeiti, 'Microsoft YaHei', '\5FAE\8F6F\96C5\9ED1', 'SimSun', '\5B8B\4F53', arial;
  line-height: 1.1;
}

/* 璅䠷�� */
.title-tx {
  position: absolute;
  top: 25%;
  width: 100%;
  font-size: 300%;
  font-family: MS Sans serif, Arial;
  text-shadow: 16px 21px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.05em;
}

/* LOGO */
.noservice-logo {
  position: absolute;
  top: 40%;
  width: 100%;
  margin-top: -31px;
}
.noservice-logo img {
  max-height: 90px;
  max-width: 80%;
}

/* IP */
.ip-text {
  position: absolute;
  top: 50%;
  width: 100%;
  line-height: 1.67em;
  padding: 0 16px;
  box-sizing: border-box;
}
.ip-text p {
  margin: 0;
  color: #ffc500;
}

/* �綉蝡航身摰𡁻＊蝷箸���� */
.service-info {
  padding-top: 20px;
  color: #fff;
}

@media screen and (max-width: 480px) {
  .title-tx {
    font-size: 12vw;
  }
}

@media screen and (max-height: 480px) {
  .noservice-wrap {
    min-height: 568px;
  }
  .title-tx {
    top: 10%;
  }
}
/*线上客服按钮*/
.errorOnlineservice {
  border-radius: 8px;
  margin: 0px auto;
  margin-top: 24px;
  background: #ffd60f;
  line-height: 36px;
  color: #131313;
  text-decoration: none;
  display: table;
  padding: 0 16px;
}
.errorOnlineservice:hover {
  background: #ffc00f;
}
</style>
