<template>
  <section>
    <NavBar title="案件瀏覽" />

    <van-row>
      <van-col class="caseTitle" span="24">{{ casem.data.title }}</van-col>
    </van-row>

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

    <van-row>
      <van-col span="24" class="note">{{ calTimeDiff(casem.data.updated_at) }}</van-col>
    </van-row>

    <ul>
      <li>
        <h4>預算金額</h4>
        <span class="price">{{ casem.data.expectMoney }}</span>
      </li>
      <li>
        <h4>執行地點</h4>
        <van-icon name="location" color="#00BB00" size="1.5rem" />
        {{ casem.data.workAreaChk === '1' ? '不限' : casem.data.workArea }}
      </li>
      <li>
        <h4>預計完成日</h4>
        <span>{{
          casem.data.expectDateChk === '1'
            ? casem.data.expectDate
            : casem.data.expectDateChk === '2'
            ? '成交後' + casem.data.expectDate + '日'
            : '無限定時間'
        }}</span>
      </li>
      <li>
        <h4>案件說明</h4>

        <van-text-ellipsis rows="3" :content="casem.data.workContent" />

        <div v-if="!token" style="text-align: center">
          <a href="javascript:void(0)" @click="navigateTo('/member/login')">查看完整內容</a>
        </div>
      </li>

      <li>
        <h4>參考附件</h4>
        <div v-for="item in files.data" :key="item.filename" class="files">
          <a href="javascript:void(0)" @click="$download(`${item.filename}`)">{{
            item.filename
          }}</a>
        </div>
      </li>
    </ul>

    <van-row>
      <van-col class="caseTitle" span="24">案主資訊</van-col>
    </van-row>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

    <van-row v-if="!token" class="boss">
      <van-col span="24"
        >您尚未登入，請先<a href="javascript:void(0)" @click="navigateTo('/member/login')"
          >登入</a
        ></van-col
      >
      <van-col span="24"
        ><van-button type="danger" @click="navigateTo('/member/register')"
          >免費註冊</van-button
        ></van-col
      >
    </van-row>

    <div v-else class="bossinfo">
      <van-row align="center">
        <van-col span="4">
          <img src="@/assets/images/boss.png" />
        </van-col>
        <van-col span="20">{{ casem.data.name }}</van-col>
      </van-row>

      <van-row align="center">
        <van-col span="4">
          <van-icon name="clock" size="4rem" />
        </van-col>
        <van-col span="20"
          ><div class="contactTime" v-html="transContactTime(casem.data.contactTime)"
        /></van-col>
      </van-row>

      <van-row align="center">
        <van-col span="4">
          <img src="@/assets/images/cellphone.png" />
        </van-col>
        <van-col span="20">{{ casem.data.phone }}</van-col>
      </van-row>

      <van-row align="center">
        <van-col span="4">
          <van-icon name="phone-circle" size="4rem" />
        </van-col>
        <van-col span="20">
          <div v-if="casem.data.cityTalk">
            {{ casem.data.cityTalk }} - {{ casem.data.cityTalk2 }}
            <span v-if="casem.data.extension">分機 : {{ casem.data.extension }}</span>
          </div>
          <div v-else>未提供</div>
        </van-col>
      </van-row>

      <van-row align="center">
        <van-col span="4">
          <img src="@/assets/images/mail.png" />
        </van-col>
        <van-col span="20">{{ casem.data.email }}</van-col>
      </van-row>

      <van-row align="center">
        <van-col span="4">
          <img src="@/assets/images/line.png" />
        </van-col>
        <van-col span="20">
          <div v-if="casem.data.line">
            {{ casem.data.line }}
          </div>
          <div v-else>未提供</div>
        </van-col>
      </van-row>

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" />

      <van-row justify="center">
        <van-col span="24" style="text-align: center">
          <van-button type="danger" @click="clickQuote">立即報價</van-button>
        </van-col>
      </van-row>
    </div>
    <QuoteCase ref="quoteCase"></QuoteCase>
  </section>
</template>

<script setup>
const { $request, $download } = useNuxtApp()
const { calTimeDiff, transContactTime } = useCommon()
const token = useCookie('jwt-token')
const route = useRoute()
const { id } = route.params

const isVip = ref(false)
const files = reactive({ data: [] })
const casem = reactive({
  data: {
    caseId: '',
    account: '',
    title: '',
    type: '',
    kind: '',
    expectDate: '',
    expectDateChk: '',
    expectMoney: '',
    workArea: '',
    workAreaChk: '',
    workContent: '',
    updated_at: '',

    name: '',
    contactTime: '',
    phone: '',
    cityTalk: '',
    cityTalk2: '',
    email: '',
    line: ''
  }
})

onMounted(async () => {
  let res
  if (token.value) {
    res = await $request(`/case/getDetailAuth/${id}`, 'get')
  } else {
    res = await $request(`/case/getDetail/${id}`, 'get')
  }

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    casem.data = res.data
    files.data = res.files
    isVip.value = res.isVip
  }
})

// 報價
const quoteCase = ref(null)
const clickQuote = () => {
  if (!isVip.value) {
    showDialog({
      message: '請先購買vip才能使用此功能',
      theme: 'round-button'
    }).then(() => {
      navigateTo('/deposit')
    })
    return false
  }
  quoteCase.value?.showQuote(casem)
}
</script>

<style lang="less" scoped>
a {
  text-decoration: underline;
}

img {
  width: 4rem;
  height: 4rem;
}

.caseTitle {
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
}

.van-row {
  margin: 1rem;

  .note {
    color: #969799;
    font-size: 1.2rem;
  }
}

ul {
  margin: 1rem;

  li {
    font-size: 1.5rem;

    .van-text-ellipsis {
      margin-left: 1rem;
      margin-bottom: 1rem;
      line-height: 2rem;
      font-size: 1.5rem;
    }

    h4 {
      display: inline-block;
      border-left: 0.5rem solid #e1264a;
      padding-left: 0.5rem;
      margin: 2rem 0.2rem;
    }

    span {
      margin: 1rem;
    }

    i {
      margin-left: 1rem;
    }
  }
}

.price {
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

.bossinfo {
  .van-col {
    font-size: 1.5rem;
  }
}

.files {
  margin-bottom: 1.5rem;
  margin-left: 1rem;
}

.contactTime {
  div {
    margin-top: 1rem;
  }
}

.van-button {
  margin-top: 1rem;
  margin-bottom: 5rem;
}
</style>
