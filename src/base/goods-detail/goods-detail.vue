<template>
  <transition name="slide">
    <view-slot :display="display" :title="title" ref="viewSlot">
      <scroll class="goods-detail" :data="recommend"
              @scroll="scroll"
              :listen-scroll="listenScroll"
              :probeType="probeType"
              ref="goodsDetail">
        <div>
          <div class="toBack" @click="toBack"></div>
          <div class="slider-wrapper" v-if="sliders.length">
            <slider :autoPlay="false">
              <div v-for="item in sliders">
                <a>
                  <img v-lazy="item.imgUrl" height="365"/>
                </a>
              </div>
            </slider>
          </div>
          <div class="desc border-1px" v-if="goodsList">
            <h2 class="title"><span class="icon" :class="classMap[goodsList.saleType]"></span>{{goodsList.title}}</h2>
            <div class="price normal" v-if="goodsList.saleType !== '10C' && goodsList.saleType !== '10E'">
              ¥{{goodsList.price}}
            </div>
            <div class="price" v-if="goodsList.saleType === '10C' || goodsList.saleType === '10E'">
              <div class="agio">¥1</div>
              <div class="cost-price">原价¥{{goodsList.price}}</div>
            </div>
            <count-down :goods="goodsList" v-if="goods && goodsList.saleType === '10C'"></count-down>
            <div class="introduction" v-if="goodsList.saleType !== '10C'">{{goodsList.introduction}}</div>
          </div>
          <div v-if="goodsList.saleType !== '10C' && goodsList.saleType !== '10E'">
            <div class="format border-1px">
              <span class="type">商品数量选择</span>
              <span class="icon"></span>
            </div>
            <div class="format border-1px" v-if="discount && discount.isDiscount === '10A'">
              <span class="type">优惠活动 :</span>
              <span class="discount"> {{discount.discountImgUrl}}</span>
              <span class="icon"></span>
            </div>
          </div>
          <div class="info" v-if="infoList.length">
            <div v-for="(item,index) in infoList">
              <img v-lazy="item.imgUrl" @load="loadImage(index)"/>
            </div>
          </div>
          <div class="recommend-tile" v-if="recommend.length">
            相关推荐
          </div>
          <recommend v-if="recommend" :recommend="recommend" style="padding-bottom:50px;background:#ededed"></recommend>
        </div>
        <shop-cart :type="type" v-if="type" :cartCount="cartCount" @selType="showTypes"></shop-cart>
      </scroll>
      <sel-goods :show="disSel" v-if="goodsList.id" :goods="goodsList"></sel-goods>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider';
  import viewSlot from 'base/view-slot/view-slot';
  import {mapGetters} from 'vuex';
  import {getGoodsDetail} from 'api/goods';
  import {RETURN_CODE} from 'api/config';
  import Scroll from 'base/scroll/scroll';
  import Recommend from 'components/recommend/recommend';
  import shopCart from 'base/shopcart/shopcart';
  import selGoods from 'components/goods-type/goods-type';

  export default {
    props: {
      backUrl: {
        type: String,
        default: '/home'
      }
    },
    data() {
      return {
        disSel: false,
        title: '',
        data: {},
        sliders: [],
        goodsList: {},
        discount: [],
        recommend: [],
        display: false,
        type: '',
        cartCount: 0,
        infoList: []
      };
    },
    created() {
      this.classMap = {
        '10C': 'seckill',
        '10E': 'purchased'
      };
      this.probeType = 3;
      this.listenScroll = true;
      this._getGoodsDetail();
    },
    computed: {
      ...mapGetters([
        'goods'
      ])
    },
    methods: {
      showTypes(a) {
        this.disSel = a;
      },
      loadImage(index) {
        if (index === this.infoList.length - 1) {
          this.$refs.goodsDetail.refresh();
        }
      },
      toBack() {
        window.history.back();
      },
      scroll(pos) {
        if (-pos.y > 50) {
          this.display = true;
        } else {
          this.display = false;
        }
      },
      _getGoodsDetail() {
        if (!this.goods.id) {
          this.$router.push(this.backUrl);
          return;
        }
        this.title = this.goods.title;
        this.goodsList = [];
        this.recommend = [];
        this.discount = [];
        getGoodsDetail(this.goods.id).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.data = res;
            this.cartCount = res.cartCount;
            this.goodsList = res.goods[0];
            this.recommend = res.goodsRecommend;
            this.discount = res.disCountList[0];
            this.sliders = res.goods[0].imgList.filter((value) => {
              return value.type === '101';
            });
            this.infoList = res.goods[0].imgList.filter((value) => {
              return value.type === '102';
            });
            this.type = this.goodsList.saleType;
            this.$refs.goodsDetail.scrollElement(document.querySelector('.goods-detail'), 0, 0);
            this.$refs.goodsDetail.refresh();
            this.display = false;
          }
        });
      }
    },
    watch: {
      goods() {
        this._getGoodsDetail();
      }
    },
    components: {
      shopCart,
      Scroll,
      viewSlot,
      Slider,
      Recommend,
      selGoods
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"

  .goods-detail
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: #fff
    overflow: hidden
    .toBack
      position: absolute
      top: 3px
      left: 5px
      width: 20px
      height: 30px
      background: no-repeat center
      bg-image(l-arrow)
      background-size: 8.5px 18.5px
      z-index: 33
    .empty
      height: 50px
    .slider-wrapper
      position: relative
      width: 100%
      height: 365px
      overflow: hidden
      .slider-group
        height: 365px
        .slider-item
          height: 365px
    .desc
      padding: 23px 22px 12px
      border-1px(rgb(240, 240, 240))
      .title
        font-size: 17px
        line-height: 25px
        font-weight bold
        color: rgb(0, 0, 0)
        .icon
          &.purchased
            display inline-block
            vertical-align top
            font-size: 0
            margin: 3px 5px 0 0
            width: 28.5px;
            height: 16px;
            background-size: 28.5px 16px
            bg-image('purchased')
          &.seckill
            display inline-block
            vertical-align top
            font-size: 0
            margin: 3px 5px 0 0
            width: 28.5px;
            height: 16px;
            background-size: 28.5px 16px
            bg-image('purchased')
            bg-image('seckill')
      .price.normal
        padding-bottom: 17px
        font-size: 20px
        font-weight bold
        color: rgb(15, 150, 105)
      .price
        padding-bottom: 17px
        .agio
          display: inline-block
          font-size: 20px
          font-weight bold
          color: #f82f44
        .cost-price
          padding-left: 5px
          display inline-block
          font-size: 10px
          color: #aaa
          text-decoration: line-through;
      .count-down
        color: #f82f44
        .name
          padding-bottom: 9px
          color: #aaa
          font-size: 13px
        .time
          span
            display inline-block
            width: 34px
            height: 34px
            box-sizing border-box
            text-align center
            line-height: 34px
            border: 1px #f82f44 solid
            font-weight bold
            border-radius 3px
          i
            padding: 0 5px
            display inline-block
            font-style normal
      .introduction
        font-size: 12px
        color: rgb(98, 98, 98)
        line-heigt: 22px
    .format
      overflow hidden
      padding: 14px 28px 11px 22px
      border-1px(rgb(240, 240, 240))
      .type
        float left
        font-size: 14px
        color: rgb(98, 98, 98)
      .discount
        float left
        padding: 2px 0 0 8px
        width: 120px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-size: 12px
        color: rgb(98, 218, 182)
      .icon
        float right
        width: 7px
        height: 15px
        background-size: 7px 15px
        bg-image('arrow')
    .info
      border-top: 6px #f0f0f0 solid
      padding: 0 6px
      img
        display: block
        width 100%
    .recommend-tile
      font-size: 13px
      line-height: 50px
      text-align: center
      color: rgb(42, 42, 42)
      background: #fff

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
