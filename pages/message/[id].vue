<template>
  <section>
    <NavBar :title="msgStore.msgTo" />

    <van-list id="list" v-model:loading="loading" :finished="finished" @load="onLoad">
      <template v-for="item in list.data" :key="item">
        <!-- 系統訊息:成交 -->
        <van-cell v-if="item.isSystem === '2'">
          <div class="dealTag" :class="{ quoteRigth: item.accountFrom === userStore.account }">
            <div><label>您成交了一筆案件</label></div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', width: '20rem' }" />
            <div class="dealTitle">
              {{ item.message.split('-=')[1] }}
            </div>
            <div>
              案件預算 :
              <span style="color: red">{{
                `$${item.message.split('-=')[2]} ~ $${item.message.split('-=')[3]}`
              }}</span>
            </div>

            <div>
              成交日期 : <span>{{ item.created_at.substring(0, 10) }}</span>
            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', width: '20rem' }" />
            <div class="dealFooter">
              <a
                href="javascript:void(0)"
                @click="navigateTo(`/casem/${item.message.split('-=')[0]}`)"
                >查看案件</a
              >
            </div>
          </div>
        </van-cell>

        <!-- 系統訊息:報價 -->
        <van-cell v-else-if="item.isSystem === '1'">
          <div class="quoteTag" :class="{ quoteRigth: item.accountFrom === userStore.account }">
            <div><label>報價通知</label></div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', width: '20rem' }" />
            <div>
              報價案件 :
              <span
                ><a
                  href="javascript:void(0)"
                  @click="navigateTo(`/casem/${item.message.split('-=')[0]}`)"
                  >{{ item.message.split('-=')[1] }}</a
                ></span
              >
            </div>
            <div>
              報價金額 :
              <span style="color: red">{{
                `$${item.message.split('-=')[2]} ~ $${item.message.split('-=')[3]}`
              }}</span>
            </div>
            <div>
              執行時間 : <span>{{ item.message.split('-=')[4] }}天</span>
            </div>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', width: '20rem' }" />
            <div class="quoteFooter">
              <a href="javascript:void(0)" @click="seeSohoInfo(item.accountFrom, id)"
                >查看接案方資訊</a
              >

              <!-- 案主才顯示 -->
              <van-button
                v-if="item.accountFrom === id"
                type="primary"
                native-type="button"
                @click="clickDeal(item.message, id)"
                >確定成交</van-button
              >
            </div>
          </div>
        </van-cell>

        <!-- 對方 -->
        <van-cell v-else-if="item.accountFrom === id">
          <van-space class="msg-left">
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              class="img-left"
            />
            <div class="b-f">{{ item.message }}</div>
          </van-space>
        </van-cell>

        <!-- 自己 -->
        <van-cell v-else>
          <van-space class="msg-right">
            <span>{{ calTimeDiffGrp(item.created_at) }}</span>
            <div class="speech-bubble">{{ item.message }}</div>
          </van-space>
        </van-cell>
      </template>
    </van-list>

    <van-form class="send" @submit="submit" @failed="onFailed">
      <van-field v-model="msg" name="message" autocomplete="off" center placeholder="輸入訊息">
        <template #button>
          <van-button size="small" type="primary" native-type="submit">發送</van-button>
        </template>
      </van-field>
    </van-form>
  </section>
</template>

<script setup>
import { useMsgStore } from '@/stores/message'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const msgStore = useMsgStore()
const { $request } = useNuxtApp()
const { calTimeDiffGrp, dateFormat } = useCommon()
const route = useRoute()
const { id } = route.params
let listEle // 用來控制 scroll

const props = defineProps({
  sendMsgObj: {
    type: Object
  },
  sendWs: {
    type: Function
  }
})

watch(props.sendMsgObj, () => {
  if (props.sendMsgObj.data.from === id) {
    list.data.push({
      accountFrom: id,
      accountTo: userStore.account,
      message: props.sendMsgObj.data.message,
      created_at: new Date()
    })
  }
})

onMounted(() => {
  listEle = document.getElementById('list')

  setTimeout(() => {
    listEle.scrollTop = listEle.scrollHeight
  }, 100)
})

const list = reactive({ data: [] })
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  // 异步更新数据
  loading.value = true
  const res = await $request(`/message/${id}`, 'get')

  if (res.code === 0) {
    list.data = res.data
  } else {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  }

  loading.value = false
  finished.value = true
}

const msg = ref('')
const submit = async (values) => {
  if (!msg.value) {
    return
  }

  const res = await $request(`/message/send`, 'post', {
    ...values,
    accountTo: id
  })

  if (res.code !== 0) {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
    return
  }

  list.data.push({
    accountFrom: userStore.account,
    accountTo: id,
    message: msg.value,
    created_at: new Date()
  })

  setTimeout(() => {
    listEle.scrollTop = listEle.scrollHeight
  }, 100)

  props.sendWs(id, msg.value)

  msg.value = ''
}

const clickDeal = async (msg, id) => {
  const res = await $request(`/message/deal`, 'post', {
    quoter: id,
    caseId: msg.split('-=')[0],
    title: msg.split('-=')[1],
    priceS: parseInt(msg.split('-=')[2]),
    priceE: parseInt(msg.split('-=')[3])
  })

  if (res.code !== 0) {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    })
  } else {
    list.data.push({
      accountFrom: userStore.account,
      accountTo: id,
      message: msg,
      created_at: dateFormat(new Date()),
      isSystem: '2'
    })

    setTimeout(() => {
      listEle.scrollTop = listEle.scrollHeight
    }, 100)

    showNotify({ type: 'success', message: '案件成交' })
  }
}

const seeSohoInfo = (from, id) => {
  if (from === id) {
    navigateTo(`/member/soho/${id}`)
  } else {
    navigateTo(`/member/soho/${from}`)
  }
}
</script>

<style lang="less" scoped>
.speech-bubble {
  display: inline-block;
  position: relative;
  background: #6bf023;
  border-radius: 0.4em;

  max-width: 30rem;
  padding: 0.7rem 0.8rem;
  margin-top: 0.5rem;
  margin-right: 1rem;
  text-align: center;
  color: black;
  font-size: 1.5rem;
  text-shadow: 0 -0.05em 0.1em rgba(0, 0, 0, 0.3);
}

.speech-bubble:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 13px solid transparent;
  border-left-color: #6bf023;
  border-right: 0;
  border-top: 0;
  margin-top: -6.5px;
  margin-right: -13px;
}

.b-f {
  display: inline-block;
  position: relative;
  background: #6bf023;
  border-radius: 0.4em;

  max-width: 30rem;
  padding: 0.7rem 0.8rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  text-align: center;
  color: black;
  font-size: 1.5rem;
  text-shadow: 0 -0.05em 0.1em rgba(0, 0, 0, 0.3);
}

.b-f:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 13px solid transparent;
  border-right-color: #6bf023;
  border-left: 0;
  border-top: 0;
  margin-top: -6.5px;
  margin-left: -13px;
}

.msg-right {
  float: right;

  span {
    margin-top: 1.7rem;
  }
}

.msg-left {
  float: left;

  .van-image {
    margin-left: 1rem;
  }
}

.msg-div {
  height: 8rem;
  width: 100vw;
}

.van-form {
  width: 100vw;
}

.send {
  position: fixed;
  bottom: 4.5rem;
}

.van-list {
  height: 79.5vh;
  width: 100vw;
  overflow: scroll;
  display: inline-block;
}

a {
  text-decoration: underline;
}

.quoteTag {
  width: 22rem;
  height: 25rem;
  background-color: #f10c101d;
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 2rem;

  div {
    margin: 1rem;
    float: left;
    span {
      font-weight: bold;
    }
  }
}

.quoteFooter {
  display: flex;
  align-items: center;

  .van-button {
    margin-left: 2rem;
  }
}

.quoteRigth {
  float: right;
}

.dealTag {
  width: 22rem;
  height: 25rem;
  background-color: #0c41f11d;
  font-size: 1.5rem;
  margin: 1rem;
  padding: 1rem;
  border-radius: 2rem;

  div {
    margin: 1rem;
    float: left;
    span {
      font-weight: bold;
    }
  }

  .dealTitle {
    color: black;
    font-weight: bold;
  }
}

.dealFooter {
  text-align: center;
  width: 100%;
  margin-left: 0 !important;
}
</style>
