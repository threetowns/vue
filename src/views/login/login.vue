<template>
  <div class="login-layout">
    <h1 class="logo">东湖大数据交易中心</h1>
    <div class="login-form">
      <div class="login-items">
        <i class="icon-card"></i>
        <input type="text" class="login-text" v-model="userAccount" :placeholder="placeholder.userAccount">
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
  import { mapActions } from 'vuex'
  import { md5 } from 'vux';

  import { Login,getLogin } from 'src/service/getData'

  export default {
    data(){
      return {
        userAccount: '',
        password: '',
        userInfo: null,
        placeholder: {
          userAccount: '请输入手机号或者邮箱地址',
          password: '请输入密码'
        },
        regex: {
          phone: /^1[3|4|5|7|8][0-9]{9}$/,
          email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
      }
    },
    methods:{
      ...mapActions([
        'recordUserInfo'
      ]),
      checkLogin(){
        let self = this;

        if (!this.userAccount) {
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else if(!this.isAccount){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.userAccount })
          return false;
        }else if(!this.password){
          this.$vux.alert.show({ title: '温馨提示', content: self.placeholder.password })
          return false;
        }

        let data = {
            phone: this.isPhone ? this.userAccount : '',
            email: this.isEmail ? this.userAccount : '',
            pwd: md5(this.password)
        }
        Login(data)
          .then(res => {
            if (res.status == '0') {
              self.$vux.toast.show({
                text: '登录成功', time: 1000, onHide () {
                  self.recordUserInfo(res)
                  let redirect = decodeURIComponent(self.$route.query.redirect || '/usercenter');
                  self.$router.push({
                    path: redirect
                  })
                }
              })
            }else{
              self.$vux.alert.show({ title: '温馨提示', content: res.msg })
            }
          })
          .catch(error => {
            self.$vux.alert.show({ title: '温馨提示', content: '请稍后再试！' })
          })
      }
    }
  }
</script>
<style lang="less">
   @import '~assets/styles/login.less';
</style>

