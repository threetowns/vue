<template>
  <div  class="rating_page">
    <div v-if="!showLoading">
      <h1>发布清单 release</h1>
    </div>
    <loading :show="showLoading"></loading>
  </div>
</template>

<script>
  import { Loading } from 'vux'

  export default {
    components: {
      Loading
    },
    data(){
      return{
        showLoading: true
      }
    },mounted(){
      this.init()
    },
    methods: {
      init(){
        setTimeout(()=>{
          this.showLoading = false;
        },1000)
      }
    }
  }
</script>

<style>
  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 18;
  }
</style>
