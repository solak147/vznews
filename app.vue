<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtPage
          :nav-active="callNavActive"
          :send-msg-obj="sendMsgObj"
          :send-ws="sendWs"
          :do-login-goble="callDoLoginGoble"
          :refresh-badge="callRefreshBadge"
        />
      </main>
      <template #header>
        <CptHeader ref="cptHeader" :send-msg-obj="sendMsgObj" />
      </template>
      <template #footer></template>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()
const { socket } = runtimeConfig.public

// 重整重連token
onMounted(() => {
  const token = useCookie('jwt-token')
  if (token.value) {
    connect()
  }
})

let ws
const sendMsgObj = reactive({ data: {} })
const connect = () => {
  ws = new WebSocket(socket)

  ws.onopen = function () {
    console.log('Connected')
    const token = useCookie('jwt-token')
    ws.send(token.value)
  }

  ws.onmessage = function (event) {
    sendMsgObj.data = {
      from: event.data.split(':')[0],
      message: event.data.split(':')[1]
    }
  }

  ws.onclose = function (event) {
    console.log('Disconnected:', event.code, event.reason)

    // 必須寫在 onclose 內，每次 token 都必須重新取
    const token = useCookie('jwt-token')
    if (token.value) {
      if (event.reason === '連線已存在') {
        return
      }

      if (event.reason === 'token已逾期') {
        token.value = null
        return
      }
      setTimeout(connect, 5000)
    }
  }
}

const sendWs = (to, msg) => {
  // test
  // ws.send('test44@gmail.com' + ' ' + 'test44@gmail.com:12345')
  ws.send(`${to} ${userStore.account}:${msg}`)
}

const cptHeader = ref(null)

const callNavActive = (index) => {
  cptHeader.value?.navActiveFn(index)
}

const callDoLoginGoble = () => {
  const token = useCookie('jwt-token')
  if (token.value) {
    connect()
  }
  cptHeader.value?.refreshBadge()
}

const callRefreshBadge = () => {
  cptHeader.value?.refreshBadge()
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
