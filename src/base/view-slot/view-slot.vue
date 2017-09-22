<template>
  <div class="view-slot">
    <div class="header-title">
      <div class="back" @click="toBack">
        <i class="icon-back"></i>
      </div>
      <p class="title">
        {{title}}
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      toBack() {
        window.history.back();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .view-slot
    position: absolute
    z-index: 100
    left: 0
    top: 0
    right: 0
    bottom: 0
    .header-title
      position: relative
      z-index: 9
      height: 40px
      background: rgb(25, 209, 163)
      .back
        position: absolute;
        left: 5px;
        top: 5px;
        width: 20px;
        height: 30px;
        .icon-back
          display: inline-block;
          width: 20px;
          height: 30px;
          background: no-repeat center;
          bg-image(l-arrow)
          background-size: 8.5px 18.5px;
      .title
        padding: 0 30px
        font-size: 16px
        line-height: 40px
        color: #000
        text-align: center
</style>
