<template>
  <div>
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
