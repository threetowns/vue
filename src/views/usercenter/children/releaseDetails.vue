<template>
  <div class="details">
    <div class="time_d">
      <matching-xq :m-list="classifyList[0]"></matching-xq>
      <div>
        <div class="time"><span>发布日期：2017-08-17 12:00</span><i></i></div>
        <div class="time2"><span>截止日期：2018-08-17 12：00</span><i></i></div>
      </div>
    </div>
    <div class="details_xq">
      <div class="name_input">
        <span class="name">姓名</span>
        <div class="_input">王先生</div>
      </div>
      <div class="name_input">
        <span class="name">联系方式</span>
        <div class="_input">15622224545</div>
      </div>
    </div>
    <div class="details_xq">
      <div class="name_textarea">
        <span class="name">详情描述</span>
        <div class="_textarea">需要大量汽车行业数据，并能够精准营销需要大量汽车 行业数据，并能够精准营销需要大量汽车行业数据，并 能够精准营销需要大量汽车行</div>
      </div>
    </div>
  </div>
</template>

<script>
  import $$ from 'assets/js/common';
  import MatchingXq from 'components/matchingXq/matchingXq2';
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
  @import url("./details");
</style>