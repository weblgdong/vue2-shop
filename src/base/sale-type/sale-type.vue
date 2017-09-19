<template>
  <div class="sale-type">
    <span class="type" v-for="item in type.split(',')" v-if="item!==undefined">{{saleMap[item]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: String
      }
    },
    created() {
      this.saleMap = {
        '10A': '自营',
        '10B': '推荐',
        '10C': '秒杀',
        '10D': '换购'
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sale-type
    display: inline-block
    .type
      display inline-block
      margin-right:3px
      line-height:13px
      padding:0 3px
      font-size:10px
      background:#0f9669
      color:#fff
      border-radius 1px
</style>
