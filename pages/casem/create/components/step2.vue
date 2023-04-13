<template>
  <div>
    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <label><span> * </span>請問您的預計完成日 ?</label>
        <van-radio-group v-model="expectDateChk">
          <van-radio name="1"
            ><input
              v-model="expectDate"
              style="width: 8rem"
              readonly
              @click="showExpectDate = true"
            />
          </van-radio>
          <van-radio name="2"
            >成交後
            <input v-model="expectDay" style="width: 3rem" readonly @click="showExpectDay = true" />
            天完成</van-radio
          >
          <van-radio name="3">無指定時間</van-radio>
        </van-radio-group>

        <van-popup v-model:show="showExpectDay" position="bottom">
          <van-picker :columns="colDay" @confirm="onDayConfirm" @cancel="showExpectDay = false" />
        </van-popup>

        <van-popup v-model:show="showExpectDate" position="bottom">
          <van-picker-group
            title="預計完成日"
            :tabs="['選擇日期']"
            @confirm="onDateConfirm"
            @cancel="onCancel"
          >
            <van-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" />
          </van-picker-group>
        </van-popup>
      </van-cell-group>

      <van-cell-group inset>
        <van-space direction="vertical">
          <label><span> * </span>請問您的預算 ?</label>

          <input
            v-model="expectMoney"
            style="width: 8rem; margin-left: 3rem; font-size: 1.3rem"
            readonly
            @click="showExpectMoney = true"
          />
        </van-space>
        <van-popup v-model:show="showExpectMoney" position="bottom">
          <van-picker
            :columns="colMoney"
            @confirm="onMoneyConfirm"
            @cancel="showExpectMoney = false"
          />
        </van-popup>
      </van-cell-group>

      <van-cell-group inset>
        <label><span> * </span>是否可以遠端工作 ?</label>

        <van-radio-group v-model="workAreaChk" direction="horizontal">
          <van-radio name="1">是</van-radio>
          <van-radio name="0"
            >否，指定工作地點
            <input v-model="workArea" style="width: 8rem" readonly @click="showWorkArea = true"
          /></van-radio>
        </van-radio-group>
        <van-popup v-model:show="showWorkArea" position="bottom">
          <van-picker
            :columns="cityArr"
            @confirm="onWorkAreaConfirm"
            @cancel="showWorkArea = false"
          />
        </van-popup>
      </van-cell-group>

      <van-cell-group inset>
        <label><span> * </span>需求類型 ?</label>

        <van-radio-group v-model="kindChk" direction="horizontal">
          <van-radio name="o">一般案件</van-radio>
          <van-radio name="i">急件</van-radio>
        </van-radio-group>
      </van-cell-group>

      <van-cell-group inset>
        <label><span> * </span>工作內容描述 :</label>

        <van-field
          v-model="workContent"
          name="introduction"
          rows="4"
          autosize
          type="textarea"
          maxlength="200"
          placeholder="请输入工作內容描述"
          show-word-limit
        />
      </van-cell-group>

      <van-cell-group inset>
        <van-space direction="vertical">
          <label>附件上傳 :</label>
          <p>
            最多可上傳5個附件，每個附件不可超過2MB。(檔案格式為：.doc,.pdf,.ppt,.jpf,.gif,.png,.txt)
          </p>
          <van-uploader
            v-model="fileList"
            :max-size="2 * 1024 * 1024"
            :after-read="afterRead"
            :max-count="5"
            accept=".doc,.pdf,.ppt,.jpf,.gif,.png,.txt"
            @oversize="onOversize"
          />
        </van-space>
      </van-cell-group>

      <van-row>
        <van-col style="text-align: center" span="24">
          <van-button round type="danger" native-type="submit">下一步</van-button></van-col
        >
      </van-row>
    </van-form>
  </div>
</template>

<script setup>
import { useCaseStore } from '@/stores/case'
const caseStore = useCaseStore()

const props = defineProps({
  stepClick: {
    type: Function
  }
})

// 預計完成日
const expectDateChk = ref('')
const showExpectDate = ref(false)
const expectDate = ref('')
const currentDate = ref(['2022', '06', '01'])
const onDateConfirm = () => {
  expectDate.value = currentDate.value.join('/')
  showExpectDate.value = false
}
const onCancel = () => {
  showExpectDate.value = false
}

const expectDay = ref('')
const showExpectDay = ref(false)
const colDay = []
for (let i = 1; i <= 30; i++) {
  colDay.push({ text: i, value: i })
}

const onDayConfirm = ({ selectedOptions }) => {
  expectDay.value = selectedOptions[0]?.text
  showExpectDay.value = false
}

// 預算
const appConfig = useAppConfig()
const { price, addressConfig } = appConfig
const expectMoney = ref('')
const showExpectMoney = ref(false)
const colMoney = price

const onMoneyConfirm = ({ selectedOptions }) => {
  expectMoney.value = selectedOptions[0]?.text
  showExpectMoney.value = false
}

// 是否遠端工作
const workArea = ref('')
const workAreaChk = ref('1')
const showWorkArea = ref(false)
const cityArr = []
addressConfig.forEach((city) => {
  cityArr.push(city)
})

const onWorkAreaConfirm = ({ selectedOptions }) => {
  workArea.value = selectedOptions.map((option) => option.text).join(' ')
  showWorkArea.value = false
}

// 需求類型
const kindChk = ref('1')

// 工作內容
const workContent = ref('')

// 檔案上傳
const fileList = ref([])
const onOversize = (file) => {
  console.log(file)
  showToast('文件大小不能超过 2MB')
}

const afterRead = (file) => {
  file.status = 'uploading'
  file.message = '上傳中...'

  setTimeout(() => {
    file.name = file.file.name
    file.status = 'done'
    file.message = '上傳成功'
  }, 1000)
}

const next = () => {
  if (!expectDateChk.value) {
    showDialog({
      message: '預計完成日未選擇',
      theme: 'round-button'
    })
    return
  }

  if (
    (!expectDate.value && expectDateChk.value === '1') ||
    (!expectDay.value && expectDateChk.value === '2')
  ) {
    showDialog({
      message: '預計完成日輸入不完整',
      theme: 'round-button'
    })
    return
  }

  if (!expectMoney.value) {
    showDialog({
      message: '預算未選擇',
      theme: 'round-button'
    })
    return
  }

  if (workAreaChk.value === '0' && !workArea.value) {
    showDialog({
      message: '遠端工作：指定工作地點輸入不完整',
      theme: 'round-button'
    })
    return
  }

  if (!kindChk.value) {
    showDialog({
      message: '需求類型未選擇',
      theme: 'round-button'
    })
    return
  }

  if (!workContent.value) {
    showDialog({
      message: '工作內容描述未填寫',
      theme: 'round-button'
    })
    return
  }

  switch (expectDateChk.value) {
    case '1':
      caseStore.expectDateChk = 1
      caseStore.expectDate = expectDate.value
      break
    case '2':
      caseStore.expectDateChk = 2
      caseStore.expectDate = expectDay.value
      break
    case '3':
      caseStore.expectDateChk = 3
      caseStore.expectDate = ''
      break
  }

  caseStore.expectMoney = expectMoney.value

  switch (workAreaChk.value) {
    case '0':
      caseStore.workAreaChk = 0
      caseStore.workArea = workArea.value
      break
    case '1':
      caseStore.workAreaChk = 1
      caseStore.workArea = ''
      break
  }

  caseStore.kind = kindChk.value
  caseStore.workContent = workContent.value
  caseStore.fileList = fileList.value
  props.stepClick()
}
</script>

<style lang="less" scoped>
label {
  font-size: 1.5rem;
  margin: 1rem;
  span {
    color: red;
  }
}

.van-cell-group {
  margin: 1rem;
  padding: 1rem;
}

.van-radio-group {
  margin-left: 2rem;

  .van-radio {
    margin: 1rem;
    font-size: 1.3rem;
  }
}

.van-button {
  margin-top: 1rem;
  margin-bottom: 5rem;
}

p {
  margin: 0.5rem 3rem;
  font-size: 1.3rem;
  color: #969799;
}

.van-uploader {
  margin: 0.5rem 3rem;
}
</style>
