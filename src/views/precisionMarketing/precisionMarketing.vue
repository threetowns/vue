<template>
  <div class="precision">
    <div class="screen">
      <div class="nav_a">
        <a @click="screenFn(0)" :class="[(screenC==0) ? 'active':'']">类型筛选<i></i></a>
        <a @click="screenFn(1)" :class="[(screenC==1) ? 'active':'']">状态筛选<i></i></a>
        <a @click="screenFn(2)" :class="[(screenC==2) ? 'active':'']">排序<i></i></a>
      </div>
      <div class="nav_d">

      </div>
    </div>
    <matching-list :demand-type="demandType" :audit-status="auditStatus" :read-sort="readSort"></matching-list>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import FooterNav from '../../components/footer/footer';
  import MatchingList from '../../components/matchingList/matchingList';

  export default {
    name: 'matching',
    components: {
      MatchingList,
      FooterNav,
    },
    data() {
      return {
        demandType: '', //---空：全部，0：需求，1：接单"
        auditStatus: '', //---空：全部，0：进行中，3：结束"
        readSort: '', //---10：阅读排序降序，11：阅读排序升序，20：收藏数排序降序：21：收藏数排序升序，30：时间排序降序，31：时间排序升序;
        screenC: 0
      }
    },
    computed: { //计算
    },
    props: { //继承
    },
    methods: {
      screenFn(i) {
        this.screenC = i;
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
    }
  }
</script>

<style lang="less">
  @import url("./index.less");
</style>