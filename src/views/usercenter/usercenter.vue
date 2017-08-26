<template>
  <div class="profile">
    <div class="profile-cover">
      <div class="face"><img :src="face" alt="头像"></div>
      <div class="account">{{ userAccount }}</div>
      <router-link to="usercenter/switchAccount" class="action">切换帐号</router-link>
    </div>
    <div class="profile-list">
      <router-link to="usercenter/release" class="items"><i class="icon-order"></i>发布清单</router-link>
      <router-link to="usercenter/reply" class="items"><i class="icon-msg"></i>我的回复</router-link>
      <router-link to="usercenter/favorite" class="items"><i class="icon-favorite"></i>我的收藏</router-link>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import FooterNav from 'components/footer/footer';

  export default {
    components: {
      FooterNav
    },
    data(){
      return {
        face: require('assets/images/face.jpg'),
        userAccount: '13007128888'
      }
    }
  }
</script>

<style lang="less">
  @import "~assets/styles/variables.less";
  @indent: .2rem;
  @right: .32rem;
  @height: 1rem;

  .profile{
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
</style>
