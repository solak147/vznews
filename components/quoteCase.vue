<template>
  <div>
    <van-dialog
      v-model:show="isQuote"
      title="我要報價"
      close-on-click-overlay
      :show-confirm-button="isComfirmBtn"
    >
      <van-form ref="form">
        <van-cell-group inset>
          <van-field v-model="title" label="報價案件" readonly />
          <van-row>
            <van-col span="12">
              <van-field
                v-model="priceS"
                name="priceS"
                label="報價金額"
                placeholder="TWD"
                :rules="[{ pattern: pricePtn, required: true, message: '請填寫數字' }]"
            /></van-col>
            <van-col span="12">
              <van-field
                v-model="priceE"
                name="priceE"
                label="~"
                placeholder="TWD"
                :rules="[{ pattern: pricePtn, required: true, message: '請填寫數字' }]"
            /></van-col>
          </van-row>
          <van-field
            v-model="day"
            name="day"
            label="執行天數"
            placeholder="執行天數"
            :rules="[{ pattern: pricePtn, required: true, message: '請填寫數字' }]"
          />
          <van-field left-icon="warning-o" placeholder="請仔細確認，送出後無法再更改。" readonly />
        </van-cell-group>
      </van-form>
      <template #footer>
        <div style="text-align: center">
          <van-button type="primary" native-type="button" @click="cancle">取消</van-button>
          <van-button type="primary" native-type="button" @click="confirm">送出</van-button>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script setup>
const { $request } = useNuxtApp()
const isComfirmBtn = ref(false)
const isQuote = ref(false)
const title = ref('')
const caseId = ref('')
const account = ref('') // 案主

const showQuote = (casem) => {
  isQuote.value = true
  title.value = casem.data.title
  caseId.value = casem.data.caseId
  account.value = casem.data.account
}

const pricePtn = /^\d+$/
const priceS = ref('')
const priceE = ref('')
const day = ref('')

const form = ref(null)
const confirm = async () => {
  const valiateObj = form.value?.getValidationStatus()

  if (
    valiateObj.priceS !== 'passed' ||
    valiateObj.priceE !== 'passed' ||
    valiateObj.day !== 'passed'
  ) {
    return
  }
  isQuote.value = false

  const res = await $request(`/case/quote`, 'post', {
    title: title.value,
    caseId: caseId.value,
    priceS: parseInt(priceS.value),
    priceE: parseInt(priceE.value),
    day: parseInt(day.value)
  })

  if (res.code === 0) {
    showNotify({ type: 'success', message: '報價成功' })
    navigateTo(`/message/${account.value}`)
  } else {
    showDialog({
      message: res.msg,
      theme: 'round-button'
    }).then(() => {
      if (res.msg === '請先購買vip才能使用此功能' || res.msg === 'vip已過期') {
        navigateTo('/deposit')
      }
    })
  }
}

const cancle = () => {
  isQuote.value = false
}

defineExpose({
  showQuote
})
</script>

<style lang="less" scoped>
:deep(.van-popup) {
  height: 28rem;
  width: 35rem;
}

.van-button {
  width: 40%;
  margin: 1rem;
}
</style>
