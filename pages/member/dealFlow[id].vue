<template>
  <section>
    <NavBar title="案件流程" />

    <van-steps direction="vertical" :active="active">
      <van-step>
        <h5>【已成交】- {{ title }}</h5>
        <p>{{ stepTime.time1 }}</p>
      </van-step>
      <van-step>
        <h5>【已完成】</h5>
        <p>{{ stepTime.time2 }}</p>

        <div v-if="userStore.account !== account && active === 1">
          <p>
            如已完成案件，且交付委託內容，請點選下方完成按鈕 <br />系統將把案件移至【案主評價】。
          </p>
          <div class="stepBtn">
            <div></div>
            <van-button v-if="active === 1" type="primary" @click="close">完成</van-button>
          </div>
        </div>
        <div v-if="userStore.account === account && active === 1">
          <p>等待接案方執行案件中，請耐心等待...</p>
        </div>
      </van-step>
      <van-step>
        <h5>【案主評價】</h5>
        <p>{{ stepTime.time3 }}</p>
        <div v-if="(userStore.account === account && active >= 2) || active === 4">
          <p>
            <van-icon name="warning-o" style="margin: 0.5rem" />雙方皆評價完後，方可查看對方評價
          </p>
          <van-field label="評價">
            <template #input>
              <van-rate v-model="bossStar" :readonly="active > 2" />
            </template>
          </van-field>
          <van-field
            v-model="bossComment"
            :readonly="active > 2"
            rows="2"
            autosize
            type="textarea"
            maxlength="30"
            placeholder="请输入案主評價"
            :show-word-limit="active === 2"
          />
          <div class="stepBtn">
            <div></div>
            <van-button v-if="active === 2" type="primary" @click="bossSend">送出</van-button>
          </div>
        </div>
        <p v-else-if="userStore.account !== account && active === 2">等待案主評價中...</p>
        <p v-else-if="userStore.account !== account && active === 3">
          您的評價完成後，才會顯示案主評價...
        </p>
      </van-step>
      <van-step>
        <h5>【接案評價】</h5>
        <p>{{ stepTime.time4 }}</p>
        <div
          v-if="
            (active >= 3 && userStore.account !== account) ||
            (active > 3 && userStore.account === account)
          "
        >
          <van-field label="評價">
            <template #input>
              <van-rate v-model="sohoStar" :readonly="active > 3" />
            </template>
          </van-field>
          <van-field
            v-model="sohoComment"
            rows="2"
            autosize
            :readonly="active > 3"
            type="textarea"
            maxlength="30"
            placeholder="请输入接案評價"
            :show-word-limit="active === 3"
          />
          <div class="stepBtn">
            <div></div>
            <van-button v-if="active === 3" type="primary" @click="sohoSend">送出</van-button>
          </div>
        </div>
        <p v-else-if="active === 3 && userStore.account === account">接案方評價中，請耐心等待...</p>
      </van-step>
      <van-step>
        <h5>【已結案】</h5>
      </van-step>
    </van-steps>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const { $request } = useNuxtApp()
const { formattedDate } = useCommon()

const route = useRoute()
const { id } = route.params

const active = ref(0)

// case
const account = ref('')
const title = ref('')
const sohoStar = ref(0)
const sohoComment = ref('')
const bossStar = ref(0)
const bossComment = ref('')

// flow
const stepTime = reactive({ time1: '', time2: '', time3: '', time4: '' })

onMounted(async () => {
  const res = await $request(`/case/getFlow/${id}`, 'get')

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    active.value = res.flow.length
    title.value = res.case.title
    account.value = res.case.account
    bossStar.value = res.case.bossStar
    bossComment.value = res.case.bossComment
    sohoStar.value = res.case.sohoStar
    sohoComment.value = res.case.sohoComment

    stepTime.time1 = formattedDate(res.flow[0].created_at)
    if (res.flow.length > 1) {
      stepTime.time2 = formattedDate(res.flow[1].created_at)
    }

    if (res.flow.length > 2) {
      stepTime.time3 = formattedDate(res.flow[2].created_at)
    }

    if (res.flow.length > 3) {
      stepTime.time4 = formattedDate(res.flow[3].created_at)
    }
  }
})

const close = async () => {
  const res = await $request(`/case/flow`, 'post', { caseId: id, status: '2' })

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '發生非預期錯誤' })
  } else {
    stepTime.time2 = formattedDate(new Date())
    active.value = 2
  }
}

const bossSend = async () => {
  const res = await $request(`/case/flow`, 'post', {
    caseId: id,
    status: '3',
    bossStar: bossStar.value.toString(),
    bossComment: bossComment.value
  })

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '發生非預期錯誤' })
  } else {
    stepTime.time3 = formattedDate(new Date())
    active.value = 3
  }
}

const sohoSend = async () => {
  const res = await $request(`/case/flow`, 'post', {
    caseId: id,
    status: '4',
    sohoStar: sohoStar.value.toString(),
    sohoComment: sohoComment.value
  })

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '發生非預期錯誤' })
  } else {
    stepTime.time4 = formattedDate(new Date())
    active.value = 4
  }
}
</script>

<style lang="less" scoped>
:deep(label) {
  font-size: 1.4rem;
}

p {
  line-height: 1.8rem;
  margin: 0.5rem;
}

.stepBtn {
  display: flex;

  div:first-child {
    flex-grow: 1;
  }
}
</style>
