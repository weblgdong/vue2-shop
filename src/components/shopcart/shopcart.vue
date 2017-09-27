<template>

  <scroll class="shopcart-wrapper">
    <div>
      <div class="tip" >
        <p class="txt">满10元包邮</p>
        <p class="txt">2天快速发货</p>
        <p class="txt">30天无忧退货</p>
      </div>
      <div class="shopcart-group">
        <div class="shopcart-item" v-for="item in shoppingCart">
          <div class="purchased" v-if="item.amtLimit<item.price*item.quantity">
            <i class="purchased-icon"></i><span class="desc">已购满{{item.amtLimit}}元，可参见一元换购活动</span>
            <p class="to-buy"><span>去换购</span><i class="icon"></i></p>
          </div>
          <div class="parent-goods">
            <div class="select-btn">
            </div>
            <div class="goods-img">
              <img v-lazy="item.imgUrl" width="85" height="85"/>
            </div>
            <div class="goods-info">
              <div class="name">
                {{item.title}}
              </div>
              <div class="type">
                {{item.goodsAttribute}}
              </div>
              <div class="price">
                ¥{{item.price}}
              </div>
              <div class="cart-control">
                <i class="icon minus-sign"></i>
                <span class="quantity">{{item.quantity}}</span>
                <i class="icon plus-sign"></i>
              </div>
            </div>
          </div>
          <div class="purchased-goods" v-if="item.cartVo!=null">
            <div class="purchased-type">
              已参与一元换购,换购商品：{{item.cartVo.title}}
            </div>
            <div class="purchased-info">
              <div class="purchased-image">
                <img :src="item.cartVo.imgUrl" width="50" height="50"/>
              </div>
              <div class="purchased-desc">
                <div class="name">
                  <i class="purchased-icon"></i>
                  <span class="desc">{{item.cartVo.title}}</span>
                </div>
                <div class="purchased-price">
                  ¥1
                </div>
              </div>
              <div class="quantity">
                x1
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="you-like">
        猜你喜欢
      </div>
      <recommend v-if="goodsRecommend.length" :recommend="goodsRecommend"></recommend>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {getShoppingCartList} from 'api/shopcart';
  import {RETURN_CODE} from 'api/config';
  import Recommend from 'components/recommend/recommend';
  import Scroll from 'base/scroll/scroll';

  export default {
    data() {
      return {
        goodsRecommend: [],
        shoppingCart: []
      };
    },
    created() {
      this._getShoppingCartList();
    },
    methods: {
      _getShoppingCartList() {
        getShoppingCartList().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.shoppingCart = res.shoppingCart;
            this.goodsRecommend = res.goodsRecommend;
          }
        });
      }
    },
    components: {
      Scroll,
      Recommend
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"

  .shopcart-wrapper
    position: fixed
    left: 0
    right: 0
    bottom: 45px
    top: 0
    background: #f5f5f5
    overflow: hidden
    .tip
      display: flex
      height: 37px
      line-height: 37px
      background: #efefef
      .txt
        flex: 1
        color: #7f6215
        font-size: 11px
        text-align: center
    .shopcart-group
      padding-bottom:10px
      .shopcart-item
        background: #fff
        margin-bottom: 6px
        .purchased
          height: 33px
          border-bottom: 1px #f0f0f0 solid
          .purchased-icon
            float: left
            margin: 10px 10px 0 15px
            width: 20.5px
            height: 11.5px
            bg-image(purchased)
            background-size: 20.5px 11.5px
          .desc
            float: left;
            font-size: 12px
            line-height: 33px
            color: #969696
          .to-buy
            float: right
            font-size: 12px
            line-height: 16px
            padding-top: 8px
            span
              vertical-align: top
              color: #f82f44
            .icon
              display: inline-block
              margin: 0 22px 0 7px
              width: 7px
              height: 16px
              bg-image(arrow)
              background-size: 7px 16px
        .parent-goods
          display: flex
          padding-top: 18px
          height: 105px
          border-bottom: 1px #f0f0f0 solid
          .select-btn
            flex: 0 0 45px
            width: 45px
            background: #fff no-repeat center;
            bg-image(select_normal)
            background-size: 16px 16px
          .goods-img
            flex: 0 0 85px
            margin-right: 15px
          .goods-info
            position: relative
            flex: 1
            .name
              padding: 2px 0 7px
              font-size: 13px
              color: #252525
            .type
              height: 53px
              font-size: 13px
              color: #7f7f7f
            .price
              font-weight: 600
              font-size: 13px
              color: #232323
            .cart-control
              position: absolute
              right: 14px
              bottom: 20px
              min-width: 66px
              height: 17px
              border: 1px #d2d1d1 solid
              .quantity
                float: left
                display: inline-block
                min-width: 27px
                padding: 0 5px
                line-height: 17px
                text-align: center
                font-size: 12px
                border-left: 1px #b4b2b3 solid
                border-right: 1px #b4b2b3 solid
                box-sizing border-box
              .icon
                float: left
                width: 20px
                height: 17px
                background: no-repeat center
                &.minus-sign
                  bg-image(minus-sign)
                  background-size: 10px 1px
                &.plus-sign
                  bg-image(plus-sign)
                  background-size: 9px 9px
        .purchased-goods
          padding: 15px 0 0 15px
          .purchased-type
            height: 27px
            color: #969696
            font-size: 12px
          .purchased-info
            display: flex
            padding-bottom: 15px
            .purchased-image
              flex: 0 0 95px
              width: 95px
              text-align: center
            .purchased-desc
              flex: 1
              .name
                font-size: 12px
                color: #262626
                height: 40px
              .purchased-icon
                float: left
                margin: 0 5px 0 0
                width: 20.5px
                height: 11.5px
                bg-image(purchased)
                background-size: 20.5px 11.5px
              .purchased-price
                font-weight: 600
                font-size: 12px
                color: #393939
            .quantity
              flex: 0 0 30px
              color: #252525
              font-size: 13px
    .you-like
      background: #fff
      font-size: 13px
      line-height: 48px
      color: #262626
      text-align: center
</style>
