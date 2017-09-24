<template>
  <transition name="slide">
    <view-slot>
      <div class="goods-detail">

      </div>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import viewSlot from 'base/view-slot/view-slot';
  import { mapGetters } from 'vuex';
  export default {
    created() {
      console.log('goods', this.goods);
    },
    computed: {
      ...mapGetters([
        'goods'
      ])
    },
    methods: {},
    components: {
      viewSlot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods-detail
    position: absolute
    left: 0
    top: 40px
    right: 0
    bottom: 0
    background:#fff
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
