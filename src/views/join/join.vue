<template>
  <div class="login-layout">
    <div class="login-form">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" v-model="userAccount" :placeholder="placeholder.userAccount">
      </div>
      <div class="login-items">
        <i class="icon-username"></i>
        <input type="text" class="login-text" v-model="username" :placeholder="placeholder.username">
      </div>
      <div class="login-items">
        <i class="icon-check"></i>
        <input type="text" class="login-text" v-model="code" :placeholder="placeholder.code">
        <button class="sent-sms" type="button" @click.prevent="getVerifyCode" :class="{sentSmsOk : isAccount}" v-show="!computedTime">获取验证码</button>
        <button class="sent-sms" type="button" @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </div>
      <div class="login-items">
        <i class="icon-lock"></i>
        <input type="password" class="login-text" v-model="password" :placeholder="placeholder.password">
      </div>
    </div>

    <button class="login-button" type="button" @click="checkJoin">注册</button>
    <div class="login-tips">
      <router-link to="/login" class="to-login">返回登录</router-link>
    </div>

  </div>
</template>

<script>
  import { md5 } from 'vux';
  import C from 'assets/js/common';

   export default {
    data(){
      return {
        userAccount: '',
        username: '',
        code: '',
        password: '',
        computedTime: 0,
        placeholder: {
          userAccount: '请输入手机号或者邮箱地址',
          username: '请输入用户名',
          code: '输入验证码',
          password: '请输入密码'
        },
        regex: {
          phone: /^1[3|4|5|7|8][0-9]{9}$/,
          email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          username: /^\S{4,20}$/
        }
      }
    },
    computed: {
      isPhone: function (){
        return this.regex.phone.test(this.userAccount)
      },
      isEmail: function(){
        return this.regex.email.test(this.userAccount)
      },
      isUsername: function(){
        return this.regex.username.test(this.username)
      },
      isAccount: function(){
        return !(!this.isPhone && !this.isEmail)
      }
    },
    methods: {
      checkJoin(){
        let self = this;

        if (!this.userAccount) {
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else if(!this.isAccount){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else if(!this.username){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.username })
          return false;
        }else if(!this.isUsername){
          this.$vux.alert.show({ title: '温馨提示', content: '用户名长度在4—20位之间，且不含空格' })
          return false;
        }else if(!this.code){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.code })
          return false;
        }else if(!this.password){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.password })
          return false;
        }

        this.sentRegister()
      },
      sentRegister(){
        let self = this;
        let phone = this.isPhone ? this.userAccount : '';
        let email = this.isEmail ? this.userAccount : '';

        C.post('/data/userinfo/wxRegister',{
          "phone": phone,
          "email": email,
          "real_name": self.username,
          "code": self.code,
          "pwd": md5(self.password)
        },function(res){
          if (res.status == '0') {
            console.log('ok')
          }else{
            self.$vux.alert.show({ title: '温馨提示', content: res.msg })
          }
        })
      },
      getVerifyCode(){
        let self = this;
        if (this.isAccount) {
          this.computedTime = 60;
          this.timer = setInterval(() => {
              self.computedTime --;
              if (self.computedTime == 0) {
                  clearInterval(self.timer)
              }
          }, 1000)

          //发送验证码
          this.sentVerify()
        }
      },
      sentVerify(){
        let self = this;
        let phone = this.isPhone ? this.userAccount : '';
        let email = this.isEmail ? this.userAccount : '';

        C.post('/data/userinfo/wxSendCode',{
          "phone": phone,
          "email": email,
          "type": "1"
        },function(res){
          if (res.status != '0') {
            self.$vux.alert.show({ title: '温馨提示', content: res.msg })
          }
        })
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

