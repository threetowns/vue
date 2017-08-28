<template>
  <div class="details">
    <div class="time_d">
      <matching-xq :m-list="classifyList[0]"></matching-xq>
      <div class="time"><span>回复时间：2017-08-17 12:00</span><i></i></div>
    </div>
    11111
  </div>
</template>

<script>
  import $$ from 'assets/js/common';
  import MatchingXq from 'components/matchingXq/matchingXq';
  export default {
    name: 'matchingList',
    components: {
      MatchingXq
    },
    data() {
      return {
        classifyList: ['']
      }
    },
    computed: { //计算
    },
    props: { //继承

    },
    methods: {
      //下拉刷新
      pulldownFn() {
        var v_this = this;
        console.log(v_this.demandType, 1234);
        if(v_this.onFetching) {
          // do nothing
        } else {

          $$.post("/data/wxdemand/getClassifyList", {
            version: "1.0",
            pageSize: 1,
            pageNum: 1,
            data: {
              "demandType": '',
              "auditStatus": '',
              "sort": '10'
            }
          }, function(data) {
            console.log(data);
            if(!data.status) {
              v_this.classifyList = data.data.classifyList;
            } else {
              alert('服务器错误');
            }
          });
        }
      },
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      this.pulldownFn();
    },
    //数据更改后调用
    watch: {

    }
  }
</script>

<style lang="less">
  @import url("../../../assets/styles/less");
  body {
    background: #ebebeb;
  }
  
  .details {
    .matching_list_xq {
      margin-top: 0;
      margin-bottom: 0;
    }
    .time {
      padding-left: 0.28rem;
      font-size: 0.24rem;
      color: @color9;
      line-height: 0.90rem;
      vertical-align: middle;
      background: @colorf;
      margin-top: -0.6rem;
      position: relative;
    }
    .div_2 {
      display: none;
    }
    .jingxingjueshu {
      z-index: 1;
    }
    .time_d{
      margin-bottom: 0.20rem;
    }
  }
</style>