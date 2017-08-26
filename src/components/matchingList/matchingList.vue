<template>
  <div class="matching_list">
    <scroller lock-x height="100%" ref="myscroller" use-pullup use-pulldown @on-pulldown-loading="pulldownFn" @on-pullup-loading="pullupFn" :pulldown-config="pulldownConfig" :pullup-config="pullupConfig" v-model="scrollerStatus" v-show="classifyList">
      <div>
        <div v-for="list in classifyList">
          <matching-xq :m-list="list"></matching-xq>
        </div>
      </div>
    </scroller>
    <no-data class="matching_no_data" v-if="!classifyList" :noText="noDataText"></no-data>
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
        pageNum: 0,
        pageSize: 5,
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
      /*// 显示loading
      this.$vux.loading.show({
        text: 'Loading'
      })
      // 隐藏loading
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 3000)*/
      //下拉刷新
      pulldownFn() {
        var v_this = this;
        console.log(v_this.demandType, 1234);
        if(v_this.onFetching) {
          // do nothing
        } else {
          v_this.onFetching = true

          $$.post("/data/wxdemand/getClassifyList", {
            version: "1.0",
            pageSize: v_this.pageSize,
            pageNum: 1,
            data: {
              "demandType": v_this.demandType,
              "auditStatus": v_this.auditStatus,
              "sort": v_this.readSort
            }
          }, function(data) {
            console.log(data);
            if(!data.status) {
              v_this.classifyList = data.data.classifyList;
              v_this.$nextTick(() => {
                v_this.$refs.myscroller.reset({
                  top: 0
                })
              })
            } else {
              alert('服务器错误');
            }
            v_this.onFetching = false
          });
        }
      },
      //上拉加载更多
      pullupFn() {
        var v_this = this;
        if(v_this.onFetching) {
          // do nothing
        } else {
          v_this.onFetching = true
          var v_this = this;
          $$.post("/data/wxdemand/getClassifyList", {
            version: "1.0",
            pageSize: v_this.pageSize,
            pageNum: ++v_this.pageNum,
            data: {
              "demandType": v_this.demandType,
              "auditStatus": v_this.auditStatus,
              "sort": v_this.readSort
            }
          }, function(data) {
            if(!data.status) {
              v_this.classifyList = [...v_this.classifyList, ...(data.data.classifyList)];

              v_this.scrollerStatus.pullupStatus = 'default';
              v_this.$nextTick(() => {
                v_this.$refs.myscroller.reset();
              })
            } else {
              alert('服务器错误');
            }
            v_this.onFetching = false
          });
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
      this.pulldownFn();
    },
    //数据更改后调用
    watch: {
      demandType: function(newV, oldV) {
        if(newV != oldV) {
          this.pulldownFn();
          console.log('demandType' + newV);
        }
      },
      auditStatus: function(newV, oldV) {
        if(newV != oldV) {
          this.pulldownFn();
          console.log('auditStatus' + newV);
        }
      },
      readSort: function(newV, oldV) {
        if(newV != oldV) {
          this.pulldownFn();
          console.log('readSort' + newV);
        }
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
  }
  
  .matching_no_data {
    margin-top: 0.20rem;
    width: 100%;
    height: 100%;
  }
</style>