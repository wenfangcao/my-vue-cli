<template>
  <div>
    <router-link to="/next">to next</router-link>
    <button>{{$store.state.count}}</button>
    <button @click="click">add</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: [1, 1, 2],
    }
  },
  methods: {
    click() {
      console.log(this.$store)
      this.$store.commit('increment', '12')
    },
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
