<template>
  <section>
    <NavBar title="接案資料設定" />

    <van-form @submit="next" @failed="onFailed">
      <van-cell-group inset>
        <div class="list">
          <label><span> * </span>接案狀態 :</label>
          <van-radio-group v-model="expectDateChk">
            <van-radio name="1"
              >開啟，顯示聯絡資訊 (全站案主皆能查看您的聯絡資訊，主動與您聯繫。)</van-radio
            >
            <van-radio name="2">
              開啟，隱藏聯絡資訊
              (僅開放成交過的業主查看您的聯絡資訊，其他案主胥發送邀請函)</van-radio
            >
            <van-radio name="3">關閉</van-radio>
          </van-radio-group>
        </div>

        <div class="list">
          <label><span> * </span>接案暱稱 :</label>
          <van-space>
            <van-field
              v-model="cityTalk"
              name="cityTalk"
              placeholder="市話"
              style="width: 6rem"
              :rules="[{ pattern: /^\d{0,4}$/, message: '錯誤' }]"
            />
            <span>此為您對外公開顯示名稱</span>
          </van-space>
        </div>

        <div class="list">
          <label><span> * </span>接案身份 :</label>
          <van-radio-group v-model="expectDateChk">
            <van-radio name="1">個人兼職</van-radio>
            <van-radio name="2"> 專職SOHO</van-radio>
            <van-radio name="3">工作室</van-radio>
            <van-radio name="3">兼職上班族</van-radio>
            <van-radio name="3">公司</van-radio>
            <van-radio name="3">學生</van-radio>
          </van-radio-group>
        </div>

        <van-field
          v-model="phone"
          name="phone"
          label="電話"
          required
          placeholder="請輸入聯絡電話"
          :rules="[{ pattern: phonePtn, required: true, message: '請輸入正確格式' }]"
        />

        <van-field label="市話">
          <template #input>
            <van-field
              v-model="cityTalk"
              name="cityTalk"
              placeholder="市話"
              style="width: 6rem"
              :rules="[{ pattern: /^\d{0,4}$/, message: '錯誤' }]"
            />
            -
            <van-field
              v-model="cityTalk2"
              name="cityTalk2"
              placeholder="市話"
              :rules="[{ pattern: /^\d{0,10}$/, message: '請輸入正確格式' }]"
            />
          </template>
        </van-field>

        <van-field
          v-model="addressTxt"
          is-link
          readonly
          label="地區"
          placeholder="請選擇所在地區"
          @click="show = true"
        />
        <van-popup v-model:show="show" round position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="請選擇所在地區"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>

        <van-field
          v-model="email"
          name="email"
          label="E-mail"
          placeholder="帳號為您的 E-mail"
          :rules="[{ pattern: emailPtn, message: 'e-mail 格式錯誤' }]"
        />
      </van-cell-group>
    </van-form>
  </section>
</template>

<script setup></script>

<style lang="less" scoped>
.list {
  margin: 1rem;
}

label {
  font-size: 1.2rem;
  span {
    color: red;
  }
}
.van-radio-group {
  margin: 0.5rem;
  .van-radio {
    margin: 0.5rem;
  }
}
</style>
