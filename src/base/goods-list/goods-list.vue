<template>
  <div class="goods-list" v-if="list.length">
    <div class="goods-item border-1px" v-for="item in list" @click="selGoods(item)">
      <div class="goods-photo">
        <img v-lazy="item.imgUrl" width="140" height="140"/>
      </div>
      <div class="goods-desc">
        <div class="name"><i class="icon" :class="classMap[item.saleType]"></i>{{item.title}}</div>
        <div class="description">{{item.introduction}}</div>
        <div class="price">
          <div class="current-price">¥1</div>
          <div class="former-price">原价:¥{{item.price}}</div>
        </div>
        <i class="buy-btn" :class="classMap[item.saleType]"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';

  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        classMap: {
          '10C': 'seckill',
          '10E': 'purchased'
        }
      };
    },
    methods: {
      selGoods(item) {
        this.$router.push('/goods');
        this.setGoods(item);
      },
      ...mapMutations({
        setGoods: 'SET_GOODS'
      })
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  .goods-list
    background: #fff
    .goods-item
      display: flex
      min-height: 150px
      .goods-photo
        flex: 0 0 140px
        padding: 3px
      .goods-desc
        position: relative
        flex: 1
        .name
          margin: 16px 0 8px
          font-size: 13px
          color: #252525
          line-height: 18px
          max-height: 36px
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical
          .icon
            &.purchased
            &.seckill
              display: inline-block
              vertical-align: top
              margin: 3px
              width: 20.05px
              height: 11.5px
              background-size: 20.05px 11.5px
            &.purchased
              bg-image(purchased_icon)
            &.seckill
              bg-image(seckill_icon)
        .description
          font-size: 13px
          color: #9c9c9c
        .price
          .current-price
            padding: 26px 0 8px
            font-size: 23px
            color: #f82f44
          .former-price
            font-size: 10px
            color: #aaa
        .buy-btn
          position: absolute
          right: 16px
          bottom: 16px
          &.purchased
          &.seckill
            width: 80px
            height: 25px
            background-size: 80px 25px
          &.purchased
            bg-image(purchased_btn)
          &.seckill
            bg-image(seckill_btn)
</style>
