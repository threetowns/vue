<template>
  <div class="login-layout">


    <div class="login-form" v-if="!isNext">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" placeholder="请输入手机号或者邮箱地址">
      </div>
    </div>

    <div class="login-form" v-else>
      <div class="login-items">
        <i class="icon-check"></i>
        <input type="text" class="login-text" placeholder="输入验证码">
        <button class="sent-sms" type="button">获取验证码</button>
      </div>
      <div class="login-items">
        <i class="icon-lock"></i>
        <input type="password" class="login-text" placeholder="请输入密码">
      </div>
    </div>

    <button class="login-button" type="button" v-if="!isNext">下一步</button>
    <button class="login-button" type="button" v-else>完成</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isNext: false
    }
  }
}
</script>
<style lang="less">
   @import '~assets/styles/login.less';
   .login-tips{
    text-align: center;
   }
</style>
