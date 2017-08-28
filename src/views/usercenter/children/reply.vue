<template>
  <div class="user-reply precision rating_page">
    <div class="screen">
      <div class="nav_a">
        <a @click="screenFn(1)" :class="[(screenC==1) ? 'active':'']">类型筛选<i></i></a>
        <a @click="screenFn(2)" :class="[(screenC==2) ? 'active':'']">状态筛选<i></i></a>
        <a @click="screenFn(3)" :class="[(screenC==3) ? 'active':'']">排序<i></i></a>
      </div>
      <div class="nav_d" v-if="screenC!=0" @click="navDFn">
        <div v-if="screenC==1" @click.stop>
          <a @click="genreFn('')" :class="[(genreC=='') ? 'active':'']"><i></i>全部</a>
          <a @click="genreFn('0')" :class="[(genreC=='0') ? 'active':'']"><i></i>需求</a>
          <a @click="genreFn(1)" :class="[(genreC==1) ? 'active':'']"><i></i>接单</a>
        </div>
        <div v-if="screenC==2" @click.stop>
          <a @click="stateFn('')" :class="[(stateC=='') ? 'active':'']"><i></i>全部</a>
          <a @click="stateFn(1)" :class="[(stateC==1) ? 'active':'']"><i></i>进行中</a>
          <a @click="stateFn(3)" :class="[(stateC==3) ? 'active':'']"><i></i>已结束</a>
        </div>
        <div v-if="screenC==3" @click.stop>
          <a @click="sortFn(0)" :class="[(sortC==0) ? 'active':'',sortPx_0 ? 'xia':'shang','sort_a']"><i></i>阅读数</a>
          <a @click="sortFn(1)" :class="[(sortC==1) ? 'active':'',sortPx_1 ? 'xia':'shang','sort_a']"><i></i>收藏数</a>
          <a @click="sortFn(2)" :class="[(sortC==2) ? 'active':'',sortPx_2 ? 'xia':'shang','sort_a']"><i></i>时间</a>
        </div>
      </div>
    </div>
    <matching-list :demand-type="demandType" :audit-status="auditStatus" :read-sort="readSort"></matching-list>
    <footer-nav></footer-nav>
    <loading :show="showLoading"></loading>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import FooterNav from 'components/footer/footer';
  import MatchingList from 'components/matchingList/myMatchingList';

  export default {
    name: 'user-reply',
    components: {
      Loading,
      MatchingList,
      FooterNav,
    },
    data() {
      return {
        showLoading: true,
        demandType: '', //---空：全部，0：需求，1：接单"
        auditStatus: '', //---空：全部，0：进行中，3：结束"
        readSort: '', //---10：阅读排序降序，11：阅读排序升序，20：收藏数排序降序：21：收藏数排序升序，30：时间排序降序，31：时间排序升序;
        screenC: 0,
        genreC: '',
        oldgenreC: '',
        stateC: '',
        oldstateC: '',
        sortC: 0,
        sortPx_0: true,
        sortPx_1: true,
        sortPx_2: true,
        sortPx: 10,
        oldsortPx: 10,
      }
    },
    computed: { //计算
    },
    props: { //继承
    },
    methods: {
      init() {
        setTimeout(() => {
          this.showLoading = false;
        }, 1000)
      },
      screenFn(i) {
        this.screenC = i;
      },
      genreFn(i) {
        this.genreC = i;
      },
      stateFn(i) {
        this.stateC = i;
      },
      sortFn(i) {
        if(this.sortC == i) {
          this['sortPx_' + i] = !this['sortPx_' + i];
        }
        this.sortC = i;
        this.sortPx = parseInt((i + 1) + '' + (this['sortPx_' + i] ? '0' : '1'));
        console.log(this.sortPx);
      },
      navDFn() {
        this.screenC = 0;
        if((this.oldgenreC != this.genreC) || (this.oldstateC != this.stateC) || (this.oldsortPx != this.sortPx)) {
          //ajax
          console.log('ajax请求')
          this.demandType = this.genreC;
          this.auditStatus = this.stateC;
          this.readSort = this.sortPx;
          //重置
          {
            console.log('重置')
            this.oldgenreC = this.genreC;
            this.oldstateC = this.stateC;
            this.oldsortPx = this.sortPx;
          };
        } else {}
      },
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)

    }
  }
</script>

<style lang="less">
  @import url("../../precisionMarketing/index.less");
  .rating_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 18;
  }
</style>