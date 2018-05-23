<template>
  <div>123456
    <div class="d1">
      <span>123</span>
    </div>
    <router-link to="/next">to next</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>
<style scoped lang="less">
@import '../assets/css/common.less';
.d1{
  width: 100px;
  height: 100px;
  background: @goodBlur;
  span{
    font-size: @fontSize;
  }
}
</style>
