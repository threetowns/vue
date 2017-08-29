<template>
  <div class="details">
    <div class="time_d">
      <matching-xq :m-list="classify"></matching-xq>
      <div class="time"><span>回复时间：{{answerTime}}</span><i></i></div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_input">
        <span class="name">回复详情</span>
      </div>
      <div class="name_input">
        <span class="name">姓名</span>
        <div class="_input">{{classify.userName}}</div>
      </div>
      <div class="name_input">
        <span class="name">联系方式</span>
        <div class="_input">{{classify.phone}}</div>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_textarea">
        <span class="name">详情描述</span>
        <div class="_textarea">classify.描述</div>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_fileImage">
        <span class="name">附件</span>
        <div class="fileImage_w floatClear">
          <div class="_fileImage_div left" v-for="picL in picData" :style="{'background-image': 'url(https://'+picL+')'}"></div>
        </div>
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
        classify: {},
      }
    },
    computed: { //计算
      picData() {
        var picAll = [];
        for(var n in this.classify) {
          if(n.indexOf('pic') != -1) {
            picAll.push(this.classify[n])
          }
        }
        return picAll;
      },
      answerTime() {
        return dateFormat(this.classify.answer_time, 'YYYY-MM-DD HH:mm:ss')
      },
    },
    props: { //继承

    },
    methods: {

    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      //this.pulldownFn();
      var _token = localStorage.getItem('userToken');
      var v_this = this;
      $$.post('/api/wxanswer/details', {
        "token": _token,
        "data": {
          "answerId": v_this.$route.query.id
        }
      }, function(data) {
        console.log(data);
        if(data.status != '0') {
          v_this.classify = {
            "demand_id": 1,
            "demand_title": "精准营销啊啊啊",
            "demand_category": 0,
            "original_cost": 10,
            "current_price": 20,
            "create_time": "2017-08-23 14:20:23",
            "end_time": "2017-08-23 14:20:23",
            "userName": "张三",
            "phone": "13500000000",
            "answer_time": "2017-08-23 14:20:23",
            "pic1_id": "www.baidu.com/img/bd_logo1.png",
            "pic2_id": "www.baidu.com/img/bd_logo1.png",
            "pic3_id": "www.baidu.com/img/bd_logo1.png",
            "pic4_id": "www.baidu.com/img/bd_logo1.png",
            "pic5_id": "www.baidu.com/img/bd_logo1.png"
          }
        }
      });
    },
    //数据更改后调用
    watch: {

    }
  }
</script>

<style lang="less">
  @import url("./details");
</style>