<template>
  <section>
    <van-row class="title">
      <van-col span="4" @click="back"> <van-icon name="arrow-left" size="3rem" /></van-col>
      <van-col span="20"> <h1>儲值方案</h1></van-col>
    </van-row>

    <div style="position: relative">
      <ul class="caseul">
        <li class="case hot">
          <div>
            <ul class="priceul">
              <li>
                <label><span>年約</span></label>
                <div>無限超值方案</div>
              </li>
              <li>
                <div class="price"><font>$</font>588<span>/月</span></div>
              </li>
            </ul>
          </div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="times">
            <div><span>不限金額</span> <span>無限接案</span></div>
          </div>
          <div class="day"><span>方案天數</span>365天</div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-collapse v-model="vipfun">
            <van-collapse-item title="查看更多專屬功能" name="1">
              <van-space direction="vertical" :size="10">
                <div>
                  <van-icon name="success" color="#e1264a" /><span>新案件及時通知</span>
                  <van-icon name="success" color="#e1264a" /><span>VIP優先報價</span>
                </div>
                <div>
                  <van-icon name="success" color="#e1264a" /><span>查看案主資訊</span>
                  <van-icon name="success" color="#e1264a" /><span>專屬工作室</span>
                </div>
              </van-space>
            </van-collapse-item>
          </van-collapse>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-row>
            <van-col style="text-align: center" span="24">
              <van-button round type="danger" native-type="submit">立即購買</van-button></van-col
            >
          </van-row>
        </li>

        <li class="case">
          <div>
            <ul class="priceul">
              <li>
                <label><span>單月</span></label>
                <div>一般方案</div>
              </li>
              <li>
                <div class="price"><font>$</font>1300<span>/月</span></div>
              </li>
            </ul>
          </div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="times">
            <div><span>不限金額</span> <span>無限接案</span></div>
          </div>
          <div class="day"><span>方案天數</span>30天</div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-collapse v-model="vipfun2">
            <van-collapse-item title="查看更多專屬功能" name="1">
              <van-space direction="vertical" :size="10">
                <div>
                  <van-icon name="success" color="#e1264a" /><span>新案件及時通知</span>
                  <van-icon name="success" color="#e1264a" /><span>VIP優先報價</span>
                </div>
                <div>
                  <van-icon name="success" color="#e1264a" /><span>查看案主資訊</span>
                  <van-icon name="success" color="#e1264a" /><span>專屬工作室</span>
                </div>
              </van-space>
            </van-collapse-item>
          </van-collapse>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-row>
            <van-col style="text-align: center" span="24">
              <van-button round type="danger" native-type="submit">立即購買</van-button></van-col
            >
          </van-row>
        </li>

        <li class="case" style="margin-bottom: 5rem">
          <div>
            <ul class="priceul">
              <li>
                <label><span>年約</span></label>
                <div>經濟方案</div>
              </li>
              <li>
                <div class="price"><font>$</font>388<span>/月</span></div>
              </li>
            </ul>
          </div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <div class="times">
            <div><span>預算$5000以下案件</span></div>
          </div>
          <div class="day"><span>方案天數</span>30天</div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-collapse v-model="vipfun3">
            <van-collapse-item title="查看更多專屬功能" name="1">
              <van-space direction="vertical" :size="10">
                <div>
                  <van-icon name="success" color="#e1264a" /><span>新案件及時通知</span>
                  <van-icon name="success" color="#e1264a" /><span>VIP優先報價</span>
                </div>
                <div>
                  <van-icon name="success" color="#e1264a" /><span>查看案主資訊</span>
                  <van-icon name="success" color="#e1264a" /><span>專屬工作室</span>
                </div>
              </van-space>
            </van-collapse-item>
          </van-collapse>
          <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

          <van-row>
            <van-col style="text-align: center" span="24">
              <van-button round type="danger" native-type="submit">立即購買</van-button></van-col
            >
          </van-row>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const vipfun = ref([])
const vipfun2 = ref([])
const vipfun3 = ref([])
</script>

<style lang="less" scoped>
.caseul {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .case {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 10px;
    margin: 2rem auto;
    padding: 2rem 1rem;
    width: 100%;
    max-width: 33rem;
  }

  .hot {
    box-shadow: 0 0 0 1px #e1264a;
  }
}

label {
  font-size: 1.6rem;
  span {
    color: #e1264a;
  }
}

.caseul {
  &::before {
    content: '最熱銷';
    position: absolute;
    top: 1rem;
    left: 3.5rem;
    background-color: rgb(254, 211, 59);
    border-radius: 100px;
    padding: 0.5rem 1rem;
  }
}

.priceul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  li {
    position: relative;

    div {
      font-size: 1.6rem;
      margin: 0.4rem 0rem;
    }

    .price {
      font-size: 2.8rem;
      font-weight: 700;
      color: #e1264a;
      padding: 1.2rem 2rem;
    }

    .price::before {
      position: absolute;
      bottom: 0px;
      content: '原價$1800元';
      color: rgba(0, 0, 0, 0.5);
      font-size: 1.2rem;
      text-decoration: line-through;
    }
  }
}

.times {
  font-size: 1.6rem;
  color: #e1264a;
  &::before {
    content: '可查看/可提案類型';
    display: block;
    padding-bottom: 5px;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.6);
  }
}

.day {
  margin-top: 1rem;
  font-size: 1.6rem;

  span:first-child {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    margin-right: 1rem;
  }
}

.van-icon {
  margin: 0.5rem;

  & ~ span {
    display: inline-block;
    width: 10rem;
  }
}
</style>
