<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>案件瀏覽</h1></van-col>
    </van-row>

    <van-row>
      <van-col class="caseTitle" span="24">尋找演員</van-col>
    </van-row>

    <ul>
      <li>
        <h4>預算金額</h4>
        <span class="price">$1000</span>
      </li>
      <li>
        <h4>執行地點</h4>
        <van-icon name="location" color="#00BB00" size="1.5rem" /><span style="font-size: 1.5rem"
          >台中</span
        >
      </li>
      <li>
        <h4>預計完成日</h4>
        <span>無指定時間</span>
      </li>
      <li>
        <h4>案件說明</h4>

        <p>
          1.案件說明：製作蝦皮商品照1張封面，2-9張商品照簡易簡改繁介紹 2.注意事項：不需美編博士
          不懂我們會教不用擔心，找長期配合。會給商品網址簡單上 2.注意事項：不需美編博士
          不懂我們會教不用擔心，找長期配合。會給商品網址簡單上
        </p>

        <div style="text-align: center"><a href="#">查看完整內容</a></div>
      </li>

      <li>
        <h4>參考附件</h4>
        <div><a href="#">35B4301B-9A78-41F2-A0F3-D0F219B617AE.jpeg</a></div>
        <div><a href="#">35B4301B-9A78-41F2-A0F3-D0F219B617AE.jpeg</a></div>
        <div><a href="#">35B4301B-9A78-41F2-A0F3-D0F219B617AE.jpeg</a></div>
        <div><a href="#">35B4301B-9A78-41F2-A0F3-D0F219B617AE.jpeg</a></div>
      </li>
    </ul>

    <van-row>
      <van-col class="caseTitle" span="24">案主資訊</van-col>
    </van-row>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

    <van-row class="boss">
      <van-col span="24">您尚未登入，請先<a href="#">登入</a></van-col>
      <van-col span="24"><van-button type="danger">免費註冊</van-button></van-col>
    </van-row>
  </section>
</template>

<script setup>
const route = useRoute()
const { id } = route.params

const back = () => {
  history.back()
}
</script>

<style lang="less" scope>
a {
  font-size: 1rem;
  text-decoration: underline;
}

.title {
  background-color: #e1264a;
  color: #fff;
  margin-bottom: 2.5rem 0rem;
  padding: 1rem 1rem;
}

.caseTitle {
  margin: 1rem;
  font-size: 1.5rem;
}

ul {
  margin: 1rem;

  li {
    font-size: 1.5rem;

    p {
      margin: 1rem;
      line-height: 2rem;
    }

    h4 {
      display: inline-block;
      border-left: 0.5rem solid #e1264a;
      padding-left: 0.5rem;
      margin: 2rem 0.2rem;
    }

    i {
      margin-left: 1rem;
    }
  }
}

.price {
  font-size: 1.5rem;
  color: red;
  margin: 1rem;
}

.boss {
  padding-bottom: 5rem;

  .van-col {
    font-size: 1.5rem;
    text-align: center;
    margin: 1rem;

    a {
      font-size: 1.5rem;
    }
  }
}
</style>
