<template>
  <div>
    <van-progress :percentage="50" stroke-width="8" track-color="#ADADAD" />

    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <van-field name="expectDate" required>
          <template #input>
            <div>
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
                  <input
                    v-model="expectDay"
                    style="width: 3rem"
                    readonly
                    @click="showExpectDay = true"
                  />
                  天完成</van-radio
                >
                <van-radio name="3">無指定時間</van-radio>
              </van-radio-group>
            </div>
          </template>
        </van-field>

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
        <van-field name="expectMoney" required>
          <template #input>
            <div>
              <label><span> * </span>請問您的預算 ?</label>
              <van-radio-group v-model="expectMoneyChk">
                <van-radio name="1"
                  ><input
                    v-model="expectMoney"
                    style="width: 8rem"
                    readonly
                    @click="showExpectMoney = true"
                  />
                </van-radio>
                <van-radio name="2"
                  >自訂金額$<input
                    v-model="expectCustomMoney"
                    style="width: 8rem"
                    readonly
                    @click="showExpectDate = true"
                  />
                </van-radio>
              </van-radio-group>
            </div>
          </template>
        </van-field>
        <van-popup v-model:show="showExpectMoney" position="bottom">
          <van-picker
            :columns="colMoney"
            @confirm="onMoneyConfirm"
            @cancel="showExpectMoney = false"
          />
        </van-popup>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script setup>
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

const expectMoneyChk = ref('')
const expectMoney = ref('')
const showExpectMoney = ref(false)
const colMoney = []
for (let i = 1; i <= 30; i++) {
  colMoney.push({ text: i, value: i })
}

const onMoneyConfirm = ({ selectedOptions }) => {
  expectDay.value = selectedOptions[0]?.text
  showExpectDay.value = false
}
</script>

<style lang="less" scoped>
label {
  font-size: 1.6rem;
  span {
    color: red;
  }
}
.van-radio-group {
  margin-left: 3rem;

  .van-radio {
    margin: 1rem;
  }
}
</style>
