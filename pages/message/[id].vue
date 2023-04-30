<template>
  <section>
    <NavBar :title="id" />

    <van-list id="list" v-model:loading="loading" :finished="finished" @load="onLoad">
      <template v-for="item in list.data" :key="item">
        <van-cell v-if="item.accountFrom === id">
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
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { $request } = useNuxtApp()
const { calTimeDiffGrp } = useCommon()
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
</style>
