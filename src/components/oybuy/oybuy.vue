<template>
  <transition name="slide">
    <view-slot title="一元购" :toBackEv="toBackEv">
      <div class="oybuy-header">
        <router-link tag="div" to="/user-center/oybuy/seckill" class="tab-item"><p>一元秒杀</p></router-link>
        <router-link tag="div" to="/user-center/oybuy/purchased" class="tab-item"><p>一元换购</p></router-link>
      </div>
      <div class="oybuy-content">
          <router-view></router-view>
      </div>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import viewSlot from 'base/view-slot/view-slot';

  export default {
    created() {
    },
    methods: {
      toBackEv() {
        this.$router.push('/user-center');
      }
    },
    components: {
      viewSlot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  .oybuy-header
    display: flex;
    background: #fff;
    height: 32px;
    border-bottom: 1px #d8d8d8 solid;
    .tab-item
      flex: 1
      text-align: center
      z-index: 1;
      height: 32px;
      line-height: 32px
      font-size: 14px;
      color: #858585;
      background: #fafafa;
      &.router-link-active
        margin-left: -7px
        background: #fff
        color: #212121
        z-index: 2
        padding-bottom: 2px
        transform: skewX(-25deg)
        box-shadow: 0px 0px 3px rgba(136, 136, 136, 0.36);
        p
          transform: skewX(25deg)
      &.router-link-active:last-child
        margin-right: -7px

  .oybuy-content
    position: absolute
    z-index: 1
    left: 0
    top: 73px
    right: 0
    bottom: 0
    padding-top: 6px
    background: #f0f0f0
</style>
