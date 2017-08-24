<template>
  <div class="login-layout">
    <h1 class="logo">东湖大数据交易中心</h1>
    <div class="login-form">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" placeholder="请输入手机号或者邮箱地址" value="a">
      </div>
      <div class="login-items" style="margin-bottom: .62rem;">
        <i class="icon-lock"></i>
        <input type="password" class="login-text" placeholder="请输入密码">
      </div>
      <button class="login-button" type="button">登录</button>
      <div class="login-tips">
        <router-link to="/join" class="to-join">快速注册</router-link>
        <router-link to="/forget" class="to-forget">忘记密码？</router-link>
      </div>
    </div>

  </div>
</template>

<script>

</script>
<style lang="less">
   @import '~assets/styles/login.less';
</style>

