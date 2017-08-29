<template>
  <div class="matching_list">
    <scroller lock-x height="100%" ref="myscroller" use-pullup use-pulldown @on-pulldown-loading="pulldownFn" @on-pullup-loading="pullupFn" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" v-model="scrollerStatus" v-show="!noDataShow">
      <div>
        <div class="margin_bottom"></div>
        <div v-for="list in classifyList">
          <matching-xq :m-list="list"></matching-xq>
        </div>
      </div>
    </scroller>
    <no-data class="matching_no_data" v-if="noDataShow" :noText="noDataText"></no-data>
  </div>
</template>
<script>
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
        pulldownConfig,
        pullupConfig,
        scrollerStatus,
        classifyList: null,
        noDataText: '暂无数据',
        noDataShow: false,
        pageNum: 1,
        pageSize: 5,
        dataCount:0,
      }
    },
    computed: { //计算
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
      }
    },
    methods: {
      //下拉刷新
      pulldownFn() {
        pulldownF(this);
      },
      //上拉加载更多
      pullupFn() {
        pullupF(this);
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      this.$nextTick(() => {
        this.$refs.myscroller.reset({
          top: 0
        })
      });
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
</style>