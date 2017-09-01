<template>
  <div class="login-layout">


    <div class="login-form" v-if="!isNext">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" v-model="userAccount" :placeholder="placeholder.userAccount">
      </div>
    </div>

    <div class="login-form" v-else>
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

    <button class="login-button" type="button" v-if="!isNext" @click.prevent="checkAccount">下一步</button>
    <button class="login-button" type="button" v-else @click.prevent="resetPassword">完成</button>

  </div>
</template>

<script>
  import { md5 } from 'vux';
  import { forgetPassword,sentVerify } from 'src/service/getData'

  export default {
    data() {
      return {
        userAccount: '',
        code: '',
        password: '',
        computedTime: 0,
        isNext: false,
        placeholder: {
          userAccount: '请输入手机号或者邮箱地址',
          code: '输入验证码',
          password: '请输入密码'
        },
        regex: {
          phone: /^1[3|4|5|7|8][0-9]{9}$/,
          email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          password: /^\S{6,12}$/
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
      isAccount: function(){
        return !(!this.isPhone && !this.isEmail)
      },
      isPassword: function(){
        return this.regex.password.test(this.password)
      }
    },
    watch: {
      $route () {
        this.isNext = this.$route.query.from ? true : false
      }
    },
    methods: {
      resetPassword(){
        let self = this;
        if(!this.isAccount){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else if(!this.code){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.code })
          return false;
        }else if(!this.password){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.password })
          return false;
        }else if(!this.isPassword){
          this.$vux.alert.show({ title: '温馨提示', content: '请输入密码长度为6-12位之间，且不含空格' })
          return false;
        }

        let data = {
          "phone": this.isPhone ? this.userAccount : '',
          "email": this.isEmail ? this.userAccount : '',
          "code": this.code,
          "pwd": md5(this.password)
        }

        forgetPassword(data)
          .then(res => {
            if (res.status == '0') {
              self.$vux.toast.show({
                text: '操作成功',
                time: 1000,
                onHide () {
                  self.$router.push('/login');
                }
              })
            }else{
              self.$vux.alert.show({ title: '温馨提示', content: res.msg })
            }
          })
          .catch(error => {
            self.$vux.alert.show({ title: '温馨提示', content: '请稍后再试！' })
          })
      },
      checkAccount(){
        let self = this;
        if(!this.isAccount){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else{
          this.$router.push({ path: 'forget', query: { from: 'forget' }})
          this.isNext = true;
        }
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
          let data = {
            phone: this.isPhone ? this.userAccount : '',
            email: this.isEmail ? this.userAccount : '',
            type: '2'
          }
          sentVerify(data)
            .then(res => {
              if (res.status != '0') {
                self.computedTime = 0;
                clearInterval(self.timer)
                self.$vux.alert.show({ title: '温馨提示', content: res.msg })
              }
            })
            .catch(error => {
              self.$vux.alert.show({ title: '温馨提示', content: '请稍后再试！' })
            })

        }
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
