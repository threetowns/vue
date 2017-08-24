<template>
  <div class="login-layout">
    <div class="login-form">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" placeholder="请输入手机号或者邮箱地址">
      </div>
      <div class="login-items">
        <i class="icon-username"></i>
        <input type="password" class="login-text" placeholder="请输入用户名">
      </div>
      <div class="login-items">
        <i class="icon-check"></i>
        <input type="text" class="login-text" placeholder="输入验证码">
        <button class="sent-sms" type="button">获取验证码</button>
      </div>
      <div class="login-items">
        <i class="icon-lock"></i>
        <input type="password" class="login-text" placeholder="请输入密码">
      </div>
      <button class="login-button" type="button">注册</button>
      <div class="login-tips">
        <router-link to="/login" class="to-login">返回登录</router-link>
      </div>
    </div>

  </div>
</template>

<script>

</script>
<style lang="less">
   @import '~assets/styles/login.less';
   .login-tips{
    text-align: center;
   }
</style>

