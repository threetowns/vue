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
        <div class="_input">{{classify.user_name}}</div>
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
        <div class="_textarea">{{classify.answer_content}}</div>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_fileImage">
        <span class="name">附件</span>
        <div class="fileImage_w floatClear">
          <div class="_fileImage_div left" v-for="picL in picData" :style="{'background-image': 'url(http://image.dhbigdata.cn/dfun//'+picL+')'}"></div>
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
        classify: {
          answer_time: new Date()
        },
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
      var v_this = this;
      $$.post('/api/wxanswer/details', {
        "token": localStorage.getItem('userToken'),
        "data": {
          "answerId": v_this.$route.query.id
        }
      }, function(data) {
        console.log('回复详情:', data);
        if(data.status = '0') {
          v_this.classify = data.data;
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