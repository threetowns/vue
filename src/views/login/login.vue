<template>
  <div class="login-layout">
    <h1 class="logo">东湖大数据交易中心</h1>
    <div class="login-form">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" v-model="username" :placeholder="placeholder.username">
      </div>
      <div class="login-items">
        <i class="icon-lock"></i>
        <input type="password" class="login-text" v-model="password" :placeholder="placeholder.password">
      </div>
    </div>

    <button class="login-button" type="button" @click="checkLogin">登录</button>
    <div class="login-tips">
      <router-link to="/join" class="to-join">快速注册</router-link>
      <router-link to="/forget" class="to-forget">忘记密码？</router-link>
    </div>

  </div>
</template>

<script>
  import { md5 } from 'vux';

  export default {
    data(){
      return {
        username: '',
        password: '',
        placeholder: {
          username: '请输入手机号或者邮箱地址',
          password: '请输入密码'
        }
      }
    },
    methods:{
      checkLogin(){
        console.log(md5(this.username))
      }
    }
  }
</script>
<style lang="less">
   @import '~assets/styles/login.less';
</style>

