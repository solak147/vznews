<template>
  <section>
    <NavBar title="案件流程" />

    <van-steps direction="vertical" :active="active">
      <van-step>
        <div>【已成交】- {{ title }}</div>
        <p>{{ stepTime.time1 }}</p>
      </van-step>
      <van-step>
        <div>【已結案】</div>
        <p>{{ stepTime.time2 }}</p>
        <div>如已完成案件內容，請點選下方結案按鈕，系統將把案件移至【案主評價】。</div>

        <van-button type="primary" @click="navigateTo('/member/soho/dealFlow')">結案</van-button>
      </van-step>
      <van-step>
        <div>【案主評價】</div>
        <p>{{ stepTime.time3 }}</p>
      </van-step>
      <van-step>
        <div>【接案評價】</div>
        <div>
          <van-field label="評價">
            <template #input>
              <van-rate v-model="sohoStar" />
            </template>
          </van-field>
          <van-field
            v-model="sohoComment"
            rows="2"
            autosize
            type="textarea"
            maxlength="30"
            placeholder="请输入接案評價"
            show-word-limit
          />
          <p>{{ stepTime.time4 }}</p>
          <van-button type="primary" @click="navigateTo('/member/soho/dealFlow')">送出</van-button>
        </div>
      </van-step>
      <van-step>
        <div>【已結束】</div>
      </van-step>
    </van-steps>
  </section>
</template>

<script setup>
const { $request } = useNuxtApp()
const { formattedDate } = useCommon()

const route = useRoute()
const { id } = route.params

const active = ref(0)
const title = ref('')
const sohoStar = ref(0)
const sohoComment = ref('')
const bossStar = ref(0)
const bossComment = ref('')
const stepTime = reactive({ time1: '', time2: '', time3: '', time4: '' })

onMounted(async () => {
  const res = await $request(`/case/getFlow/${id}`, 'get')

  if (res.code === -1) {
    showNotify({ type: 'warning', message: '資料獲取失敗' })
  } else {
    active.value = res.flow.length - 1
    title.value = res.case.title
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
</script>
