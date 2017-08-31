<template>
  <div class="matching_list">
    <div class="noScroller" v-if="!noScroller">
      <div class="margin_bottom"></div>
      <div v-for="list in classifyList">
        <matching-xq :m-list="list"></matching-xq>
      </div>
      <div class="jzwP" v-if="classifyList.length==dataCount">加载完了，共{{dataCount}}条</div>
    </div>
    <scroller lock-x height="100%" ref="myscroller" use-pullup @on-pullup-loading="pullupFn" :pullup-config="pullupConfig" v-model="scrollerStatus" v-show="!noDataShow && noScroller" @on-scroll="scrollFn">
      <div>
        <div class="margin_bottom"></div>
        <div v-for="list in classifyList">
          <matching-xq :m-list="list"></matching-xq>
        </div>
        <div class="jzwP" v-if="classifyList.length==dataCount">加载完了，共{{dataCount}}条</div>
      </div>
    </scroller>
    <no-data class="matching_no_data" v-if="noDataShow" :noText="noDataText"></no-data>
  </div>
</template>
<script>
  import $$ from 'assets/js/common';
  import { Scroller } from 'vux';
  import MatchingXq from '../matchingXq/matchingXq';
  import NoData from '../noData/noData';
  import { pulldownConfig, pullupConfig, scrollerStatus, pulldownF, pullupF, watchF } from './index';

  export default {
    name: 'matchingList',
    components: {
      Scroller,
      NoData,
      MatchingXq
    },
    data() {
      return {
        myUrl: '/api/wxdemand/getClassifyList',
        pulldownConfig,
        pullupConfig,
        scrollerStatus,
        classifyList: '',
        noDataText: '暂无数据',
        pageNum: 1,
        pageSize: 5,
        dataCount: 0,
        scrollTop: 0,
        scrollTopMax: 0,
        noScroller: false,
      }
    },
    computed: { //计算
      noDataShow() {
        return this.classifyList.length ? false : true;
      }
    },
    props: { //继承
      demandType: { //需求类型
        default: '', //---空：全部，0：需求，1：接单"
      },
      auditStatus: {
        default: '', //---空：全部，0：进行中，3：结束"
      },
      readSort: {
        default: '', //---10：阅读排序降序，11：阅读排序升序，20：收藏数排序降序：21：收藏数排序升序，30：时间排序降序，31：时间排序升序;
      },
      demandCategory: {
        default: '', //空（””）：全部，0：精准营销，1：数据报告，2：数据交易；3：API,4:其他定制”
      },
    },
    methods: {
      scrollFn(arg) {
        if(this.scrollTop < this.scrollTopMax || arg.top <= 0) {
          this.noScroller = false;
        } else {
          this.noScroller = true;
        }
      },
      //下拉刷新
      pulldownFn() {
        var v_this = this;
        pulldownF(this, v_this.myUrl, {
          version: "1.0",
          pageSize: v_this.pageSize,
          pageNum: 1,
          token: localStorage.getItem('userToken'),
          data: {
            "demandType": v_this.demandType,
            "auditStatus": v_this.auditStatus,
            "sort": v_this.readSort,
            "demandCategory": v_this.demandCategory
          }
        });
      },
      //上拉加载更多
      pullupFn() {
        var v_this = this;
        v_this.pageNum++;
        pullupF(this, v_this.myUrl, {
          version: "1.0",
          pageSize: v_this.pageSize,
          pageNum: v_this.pageNum,
          token: localStorage.getItem('userToken'),
          data: {
            "demandType": v_this.demandType,
            "auditStatus": v_this.auditStatus,
            "sort": v_this.readSort
          }
        });
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      var v_this = this;
      var topMax = $$.css($$.query(".swiperList")[0], 'height') + $$.css($$.query(".nav_2")[0], 'height');
      v_this.scrollTopMax = Math.floor(topMax);

      window.addEventListener('scroll', function(ev) {
        v_this.scrollTop = Math.floor(this.scrollY);
        if(v_this.scrollTop == v_this.scrollTopMax) {
          v_this.noScroller = true;
        }
      }, false);

      console.log('分类:', this.demandCategory)
      this.$nextTick(() => {
        this.$refs.myscroller.reset({
          top: 0
        })
      });
      if(this.$route.path == '/usercenter/release') {
        this.myUrl = '/api/personalCenter/demandUserList';
      }
      if(this.$route.path == '/usercenter/favorite') {
        this.myUrl = '/api/personalCenter/demandFavList';
      }
      if(this.$route.path == '/usercenter/reply') {
        this.myUrl = '/api/personalCenter/demandAnswerList';
      }
      console.log('请求地址:', this.myUrl)
      //初始数据请求
      this.pulldownFn();
    },
    //数据更改后调用
    watch: {
      demandType: function(newV, oldV) {
        watchF(this, newV, oldV);
      },
      auditStatus: function(newV, oldV) {
        watchF(this, newV, oldV);
      },
      readSort: function(newV, oldV) {
        watchF(this, newV, oldV);
      },
    },
    activated() {
      this.$refs.scroller.reset()
    }
  }
</script>

<style lang="less">
  @import url("../../assets/styles/less");
  .matching_list {
    flex: 1;
    overflow: hidden;
    padding-bottom: 1.0rem;
    position: relative;
    .my-container {
      line-height: 40px;
    }
    .margin_bottom {
      &:after {
        content: '';
        display: block;
        height: 0.20rem;
        background-color: #ebebeb;
      }
    }
    .mengceng {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  
  .matching_no_data {
    margin-top: 0.20rem;
    width: 100%;
    height: 100%;
  }
  
  .vux-loading {
    .weui-mask_transparent {
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
  .jzwP{
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>