<template>
  <div class="notfound">
    <div>
      <img src="./notfound.gif" alt="404 notfound">
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
  import FooterNav from 'components/footer/footer'
  export default {
    components: {
      FooterNav
    }
  }
</script>
<style lang="less">
  @import url("~assets/styles/less");
  body {
    background: #fff!important;
  }

  .notfound {
    width: 100%;
    height: 100vh;
    display: flex;
    >div {
      margin: auto;
      img {
        width: 3.5rem;
        vertical-align: middle;
      }
    }
  }
</style>
