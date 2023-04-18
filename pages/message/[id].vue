<template>
  <section>
    <NavBar title="x先生" />

    <div class="msg-div">
      <van-space class="msg-right">
        <div class="speech-bubble">i am text</div>
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </van-space>
    </div>

    <div class="msg-div">
      <van-space class="msg-left">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="img-left"
        />
        <div class="b-f">i am text</div>
      </van-space>
    </div>
  </section>
</template>

<style lang="less" scoped>
.speech-bubble {
  display: inline-block;
  position: relative;
  background: #6bf023;
  border-radius: 0.4em;

  max-width: 30rem;
  padding: 1.4rem 1rem;
  margin-top: 5rem;
  margin-right: 2rem;
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
  padding: 1.4rem 1rem;
  margin-top: 5rem;
  margin-left: 2rem;
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

  .van-image {
    margin-right: 3rem;
    margin-top: 3rem;
  }
}

.msg-left {
  float: left;

  .van-image {
    margin-left: 3rem;
    margin-top: 3rem;
  }
}

.msg-div {
  height: 8rem;
  width: 100vw;
}
</style>
