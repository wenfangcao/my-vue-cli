<template>
  <div>
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
      img: [1, 1, 2],
    }
  },
}
</script>
<style scoped lang="less">
@import '../assets/css/common.less';
.d1{
  width: 100px;
  height: 100px;
  background: @goodBlur;
  display: flex;
  span{
    font-size: @fontSize;
  }
}
</style>
