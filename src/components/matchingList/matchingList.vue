<template>
  <div class="matching_list">
    <scroller lock-x height="100%" ref="myscroller" use-pullup use-pulldown @on-pulldown-loading="pulldownFn" @on-pullup-loading="pullupFn" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" v-model="scrollerStatus" v-show="outCallList">
      <div>
        <div v-for="list in outCallList">
          <matching-xq :m-list="list"></matching-xq>
        </div>
      </div>
    </scroller>
    <no-data class="matching_no_data" v-if="!outCallList" :noText="noDataText"></no-data>
  </div>
</template>

<script>
  import { Scroller } from 'vux';
  import MatchingXq from '../matchingXq/matchingXq';
  import NoData from '../noData/noData';
  import $$ from '../../assets/js/common';
  //刷新配资
  const pulldownConfig = {
    content: '当前为最新',
    downContent: '下拉刷新',
    upContent: '释放后更新',
    loadingContent: 'Loading...',
    clsPrefix: 'my-'
  }
  //加载配资
  const pullupConfig = {
    content: '没有更多内容',
    upContent: '上拉加载更多',
    downContent: '释放后加载',
    loadingContent: 'Loading...',
    clsPrefix: 'my-'
  }
  //解决只刷新一次问题
  var scrollerStatus = {
    pullupStatus: 'default'
  }

  var moniData = {
    "status": 0,
    "msg": "",
    "data": {
      "count": 0,
      "outCallList": [{
          "id": "1",
          "demand_title": "标题1",
          "demand_category": "0",
          "audit_status": "1",
          "create_time": "2017-01-01",
          "original_cost": 100,
          "current_price": 10,
          "browse_count": 10,
          "fav_count": 10
        },
        {
          "id": "2",
          "demand_title": "标题2",
          "demand_category": "0",
          "audit_status": "1",
          "create_time": "2017-01-01",
          "original_cost": 100,
          "current_price": 10,
          "browse_count": 10,
          "fav_count": 10
        }
      ]
    }
  };

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
        bottomCount: 20, //模拟4条
        outCallList: null,
        noDataText: '暂无数据',
      }
    },
    computed: { //计算
    },
    props: { //继承
      demandType: { //需求类型
        default: '', //---空：全部，0：需求，1：接单"
        //required: true
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
        var v_this = this;
        if(v_this.onFetching) {
          // do nothing
        } else {
          v_this.onFetching = true
          setTimeout(function() {
            //定时器模拟加载
            //v_this.bottomCount += 4;
            v_this.$nextTick(() => {
              v_this.$refs.myscroller.reset({
                top: 0
              })
            })
            v_this.onFetching = false
          }, 1000);
        }
      },
      //上拉加载更多
      pullupFn() {
        var v_this = this;
        if(v_this.onFetching) {
          // do nothing
        } else {
          v_this.onFetching = true
          setTimeout(function() {
            //定时器模拟加载
            v_this.bottomCount += 10;
            v_this.scrollerStatus.pullupStatus = 'default';
            v_this.$nextTick(() => {
              v_this.$refs.myscroller.reset();
            })
            v_this.onFetching = false
          }, 1000);
        }
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
      this.$nextTick(() => {
        this.$refs.myscroller.reset({
          top: 0
        })
      });
      //初始数据请求
      var v_this = this;
      $$.post("/data/wxdemand/getClassifyList", {
        "version": "1.0",
        "pageSize": 5,
        "pageNum": 1,
      }, function(data) {
        console.log(data);
        if(data.status) {
          data = moniData
        };
        v_this.outCallList = data.data.outCallList;
      });
    },
    activated() {
      this.$refs.scroller.reset()
    }
  }
</script>

<style lang="less">
  @import url("./index.less");
</style>