<template>
  <div class="shop-cart" v-if="type">
    <div class="btn-group" v-if="type.indexOf('10A') >= 0 || type.indexOf('10B') >=0">
      <div class="collect"></div>
      <div class="cart">
        <div class="number" v-if="cartCount>0">{{cartCount}}</div>
      </div>
      <div class="add-cart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
    <div class="btn-group" v-if="type=='10E'">
      <div class="collect"></div>
      <div class="cart"></div>
      <div class="buy red">立即换购</div>
    </div>
    <div class="btn-group" v-if="type=='10C'">
      <div class="collect"></div>
      <div class="cart"></div>
      <div class="buy red">立即秒杀</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: String
      },
      cartCount: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isIPhone: false,
        appUrl: ''
      };
    },
    methods: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-cart
    position: fixed
    left: 3%
    bottom: 5px
    background: #fff
    width: 94%
    height: 45px
    border-top: 1px #b2b2b2 solid
    border-left: 1px #b2b2b2 solid
    border-radius 5px
    box-sizing border-box
    overflow hidden
    box-shadow: 0 8px 15px 5px rgba(204, 204, 204, 0.59)
    .iphone-url
      position absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
    .btn-group
      display flex
      .collect
        flex: 0 0 60px
        width: 60px
        height: 45px
        background-size: 19px 18.5px
        background-position: center
        background-repeat: no-repeat
        bg-image('collect')
      .cart
        position: relative
        flex: 0 0 60px
        width: 60px
        height: 45px
        background-repeat: no-repeat
        background-position: center
        background-size: 26px 25px
        bg-image('cart')
        .number
          position: absolute
          left: 65%
          top: 26%
          background: #ff5156
          border-radius: 50%
          color: #fff
          padding: 3px 3px
          min-width: 12px
          font-size: 10px
          text-align: center
          transform: translate(-50%, -50%);
      .add-cart
        flex 1
        font-size: 13px
        padding: 0 25px
        line-height: 45px
        color: #000
      .buy
        padding: 0 10px
        flex 1
        text-align center
        line-height: 45px
        background: #28cd87
        font-size: 14px
        color: #fff
      .red
        background: #f93043
        color: #fff
</style>
