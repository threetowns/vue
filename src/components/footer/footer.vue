<template>
  <div class="footer_nav">
    <div class="nav_d">
      <router-link to="/matching" class="repository" :class="{'active':navA==1}" @click="navFn(1)"><i></i>资源库</router-link>
    </div>
    <i class="nav_line"></i>
    <div class="nav_d">
      <router-link to="/precision" class="issue" :class="{'active':navA==2}" @click="navFn(2)"><i></i>发布</router-link>
    </div>
    <i class="nav_line"></i>
    <div class="nav_d">
      <router-link to="/precision" class="personalcenter" :class="{'active':navA==3}" @click="navFn(3)"><i></i>个人中心</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'async',
    components: {},
    data() { //数据
      return {
      }
    },
    computed: {},
    props: {
      navA: {
        required: true
      }
    },
    methods: { //方法
      navFn(i) {
        this.navA = i
      }
    },
    mounted: function() {}
  }
</script>

<style lang="less">
  @import url("../../assets/styles/less");
  body {
    background-color: #ebebeb;
  }
  
  .footer_nav {
    display: flex;
    width: 100%;
    border-top: 1px solid @colorf;
    position: fixed;
    bottom: 0;
    left: 0;
    .nav_d {
      flex: 1;
      width: auto;
      height: 0.98rem;
      line-height: 0.98rem;
      text-align: center;
      background-color: #fafafa;
      a {
        display: block;
        width: 100%;
        height: 100%;
        padding-top: 0.08rem;
        line-height: 1;
        color: @color6;
        font-size: 0.20rem;
        font-weight: bold;
        i {
          display: block;
          width: 0.46rem;
          height: 0.46rem;
          margin: 0 auto;
          margin-bottom: 0.1rem;
        }
        &.repository i {
          background: url(zlk.svg) no-repeat;
          @bg100;
        }
        &.issue i {
          background: url(fb.svg) no-repeat;
          @bg100;
        }
        &.personalcenter i {
          background: url(grzx.svg) no-repeat;
          @bg100;
        }
        &.active {
          color: #15aafb;
          &.repository i {
            background: url(zlk_on.svg) no-repeat;
            @bg100;
          }
          &.issue i {
            background: url(fb_on.svg) no-repeat;
            @bg100;
          }
          &.personalcenter i {
            background: url(grzx_on.svg) no-repeat;
            @bg100;
          }
        }
      }
    }
    .nav_line {
      width: 1px;
      background-color: @colorc;
    }
  }
</style>