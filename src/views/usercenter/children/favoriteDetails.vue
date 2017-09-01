<template>
  <div class="details">
    <div class="time_d">
      <matching-xq :m-list="classify"></matching-xq>
      <div>
        <div class="time"><span>发布日期：{{createTime}}</span><i></i></div>
        <div class="time2"><span>截止日期：{{endTime}}</span><i></i></div>
      </div>
      <div v-if="myVisible">
        <span class="scqx sc" v-if="classify.isFav" @click="noFavFn"></span>
        <span class="scqx qx" v-else @click="isFavFn"></span>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_input">
        <span class="name">姓名</span>
        <div class="_input">{{classify.user_name}}</div>
      </div>
      <div class="name_input">
        <span class="name">联系方式</span>
        <div class="_input">{{classify.phone}}<i v-if="!myVisible"> （登录后可见）</i></div>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_textarea">
        <span class="name">详情描述</span>
        <div class="_textarea">{{classify.description}}</div>
      </div>
    </div>
    <div class="margin_bottom"></div>
    <div class="details_xq">
      <div class="name_reply">
        <span class="name">回复的人</span>
        <div class="_textarea textQzhh">
          <span v-for="list in classify.answerList"
@click="replyXqFn(list.id,list.isMyAnswer)">{{list.nickname}}<i>，</i></span>
        </div>
      </div>
    </div>
    <input class="_button" :class="{'no':(classify.audit_status==3)}" type="button" id="" value="回复" v-if="classify.audit_status==1 || classify.audit_status==3" @click="replyFn" />
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
        myVisible: false,
      }
    },
    computed: { //计算
      createTime() {
        return dateFormat(this.classify.create_time, 'YYYY-MM-DD HH:mm:ss')
      },
      endTime() {
        return dateFormat(this.classify.end_time, 'YYYY-MM-DD HH:mm:ss')
      },
    },
    props: { //继承

    },
    methods: {
      replyXqFn(id, b) {
        if(b) {
          this.$router.push('/usercenter/reply/details?id=' + id);
        } else if(this.classify.isMe) {
          this.$router.push('/usercenter/reply/details?id=' + id);
        }
      },
      replyFn() {
        if(this.classify.audit_status == 1) {
          this.$router.push('/reply?id=' + this.$route.query.id);
        }
      },
      noFavFn() {
        var v_this=this;
        $$.post('/api/wxdemand/cancelFav', {
          "token": localStorage.getItem('userToken'),
          "data": {
            "demandId": v_this.$route.query.id
          }
        }, function(data) {
          if(data.status == '0') {
            v_this.classify.isFav = 0;
          }
        });
      },
      isFavFn() {
        var v_this=this;
        $$.post('/api/wxdemand/saveFav', {
          "token": localStorage.getItem('userToken'),
          "data": {
            "demandId": v_this.$route.query.id
          }
        }, function(data) {
          if(data.status == '0') {
            v_this.classify.isFav = 1;
          }
        });
      },
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      //this.pulldownFn();
      var v_this = this;
      $$.post('/api/wxdemand/demandDetail', {
        "token": localStorage.getItem('userToken'),
        "demandId": v_this.$route.query.id
      }, function(data) {
        if(data.status = '0') {
          console.log('收藏详情:',data);
          v_this.classify = data.data;
          if((v_this.classify.phone).indexOf('*') != -1) {
            v_this.myVisible = false;
          } else {
            v_this.myVisible = true;
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