<template>
  <div>
    <NuxtLayout>
      <main>
        <NuxtPage :nav-active="callNavActive" :send-msg-obj="sendMsgObj" :send-ws="sendWs" />
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
const token = useCookie('jwt-token')

onMounted(() => {
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
    if (token.value) {
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
