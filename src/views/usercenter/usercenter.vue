<template>
  <div class="profile">
    <div v-if="!showLoading">
      <div class="profile-cover">
        <div class="face"><img :src="face" alt="头像"></div>
        <div class="account">{{ userAccount }}</div>
        <div class="action" @click="Logout">切换帐号</div>
      </div>
      <div class="profile-list">
        <router-link to="/usercenter/release" class="items"><i class="icon-order"></i>发布清单</router-link>
        <router-link to="/usercenter/reply" class="items"><i class="icon-msg"></i>我的回复</router-link>
        <router-link to="/usercenter/favorite" class="items"><i class="icon-favorite"></i>我的收藏</router-link>
      </div>
      <footer-nav :nav-a="navA"></footer-nav>
    </div>
    <loading :show="showLoading"></loading>

    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import FooterNav from 'components/footer/footer'
  import { Loading } from 'vux'
  import { mapGetters, mapActions } from 'vuex'
  import { logout } from 'src/service/getData'

  export default {
    components: {
      FooterNav,
      Loading
    },
    computed: {
      ...mapGetters([ 'userToken', 'userData' ])
    },
    data(){
      return {
        navA: 3,
        showLoading: false,
        face: null,
        userAccount: null
      }
    },
    methods: {
      ...mapActions([ 'userLogout' ]),
      Logout(){
        let self = this;
        let data = {
          token: localStorage.getItem('userToken')
        }
        logout(data)
          .then(res => {
            if (res.status == '0') {
              self.userLogout()
              self.$vux.toast.show({
                text: '退出成功', time: 1000, onHide () {
                  self.$router.push('login')
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
    },
    created() {
      this.userAccount = JSON.parse(localStorage.getItem('userData')).nickname ? JSON.parse(localStorage.getItem('userData')).nickname : '暂未填写';
      this.face = JSON.parse(localStorage.getItem('userData')).head ? JSON.parse(localStorage.getItem('userData')).head : require('assets/images/face.jpg');
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/styles/variables.less";
  @indent: .2rem;
  @right: .32rem;
  @height: 1rem;

  .profile{
    background: #fff;
    .footer_nav{
      border-top-color: #ccc;
    }
    &-cover{
      height: 3.76rem;
      width: 100%;
      padding-top: .31rem;
      background: #4a8bdb url('~assets/images/usercenter.gif') center no-repeat;
      background-size: cover;
      text-align: center;
      .face{
        width: 1.68rem;
        height: 1.68rem;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .account{
        height: .42rem;
        font-size: .32rem;
        line-height: .42rem;
        color: #fff;
        margin: .18rem auto .22rem;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .action{
        height: .52rem;
        font-size: .28rem;
        line-height: .52rem;
        padding: 0 .22rem;
        background: #fff;
        color: #2c3544;
        border-radius: .26rem;
        text-align: center;
        display: inline-block;
      }
    }
    &-list{
      .items{
        position: relative;
        width: 100%;
        height: @height;
        font-size: .32rem;
        line-height: @height;
        color: #666;
        text-indent: @indent;
        display: block;
        &:after{
          position: absolute;
          bottom: 0;
          font-family: 'icomoon' !important;
          content: @icon-arrow;
          right: @right;
        }
        &:before{
          position: absolute;
          bottom: 0;
          left: @indent;
          content: "";
          display: block;
          height: 1px;
          width: 100%;
          background: #ebebeb;
        }
        >i{
          font-size: .42rem;
          width: .88rem;
          height: @height;
          line-height: @height;
          text-align: center;
          display: inline-block;
          vertical-align: top;
          &.icon-order{
            color: #ffa632;
          }
          &.icon-msg{
            color: #2e99fc;
          }
          &.icon-favorite{
            color: #fc836f;
          }
        }
      }


    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slid_up-enter-active, .slid_up-leave-active {
    transition: all .3s;
  }
  .slid_up-enter, .slid_up-leave-active {
    transform: translate3d(0,10rem,0)
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
