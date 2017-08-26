<template>
  <div class="no_data">
    <div>
      <img src="./nodata.png" />
      <p>{{noText}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noData',
    components: {},
    data() {
      return {}
    },
    computed: { //计算
    },
    props: { //继承
      noText: {
        default: '暂无数据',
        //required: true
      },
    },
  }
</script>

<style lang="less">
  @import url("../../assets/styles/less");
  body {
    background-color: #ebebeb;
  }
  
  .no_data {
    display: flex;
    >div {
      margin: auto;
      p {
        padding: 0.14rem 0.50rem;
        line-height: 1.8;
        .font32;
        color: @color9;
      }
      img {
        width: 2.00rem;
      }
    }
  }
</style>