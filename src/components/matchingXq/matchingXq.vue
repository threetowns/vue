<template>
  <div class="matching_list_xq" @click="pushFn(mList.id)">
    <h3 class="headline">{{mList.demand_title}}</h3>
    <div class="div_1">
      <span class="leixing">{{demand_category[mList.demand_category]}}</span>
      <div class="xianjia"><i>￥</i><span>{{mList.current_price}}</span></div>
      <div class="yuanjia"><i>原价￥</i><span>{{mList.original_cost}}</span></div>
    </div>
    <div class="div_2">
      <span class="chakan"><i></i>{{mList.browse_count}}</span>
      <span class="xihuan"><i></i>{{mList.fav_count}}</span>
      <span class="shijian">{{createTime}}</span>
    </div>
    <span class="xujie jie" v-if="mList.demand_type"></span>
    <span class="xujie xu" v-else></span>
    <span class="jingxingjueshu jingxing" v-if="mList.audit_status==1"></span>
    <span class="jingxingjueshu jueshu" v-if="mList.audit_status==2"></span>
    <span class="jingxingjueshu jujue" v-if="mList.audit_status==3"></span>
  </div>
</template>

<script>
  //需求分类
  var demand_category = {
    "0": "精准营销",
    "1": "数据报告",
    "2": "数据交易",
    "3": "API",
    "4": "其他定制"
  };
  export default {
    name: 'matchingXq',
    data() {
      return {
        demand_category,
      }
    },
    props: {
      mList: {
        required: true
      }
    },
    computed: {
      createTime() {
        return dateFormat(this.mList.create_time, 'YYYY-MM-DD HH:mm:ss')
      },
    },
    methods: { //方法
      pushFn(id) {
        //this.$router.push('/home');
        console.log(id)
      }
    },
    mounted: function() { //类似于回调函数(初次实例化完成后调用)
    }
  }
</script>

<style lang="less">
  @import url("./index.less");
</style>