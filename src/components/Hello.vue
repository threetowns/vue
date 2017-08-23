<template>
  <div class="mainWarp">
    <group title="prop:content">
      <x-switch title="显示" v-model="show2"></x-switch>
    </group>
    <div>
      <alert v-model="show2" title="温馨提示" content="这里是内容了"></alert>
    </div>

  </div>
</template>

<script>

import { Alert, Group, XSwitch } from 'vux'



export default {

  components: {
    Alert,
    Group,
    XSwitch
  },
  data () {
    return {
      show2: false
    }
  },
  methods: {

  }
}
</script>

<style lang="less">



</style>
