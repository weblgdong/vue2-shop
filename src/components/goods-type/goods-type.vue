<template>
  <transition name="fadeInUp">
    <div class="mask" v-if="show">
      <scroll class="goods-type">
        <div>
          <div class="goods-info">
            <div class="icon">
              <img :src="goods.imgUrl" width="115" height="115" class="image"/>
            </div>
            <div class="desc">
              <div class="price">¥{{goods.price}}</div>
              <div class="type">请选择<span v-for="(item,key) in typeList">{{key}}/</span></div>
              <div class="selType">222</div>
              <div class="hasStock">库存</div>
            </div>
          </div>
          <div class="types">
            <dl v-for="(items,key) in typeList" class="type-item border-1px">
              <dt class="key">{{key}}</dt>
              <dd class="value" v-for="(item,key) in items">{{key}}</dd>
            </dl>
          </div>
          <div class="number">
            <div class="key">数量</div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';

  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        typeList: {}
      };
    },
    created() {
      this.typeList = this.goodsClass(this.goods.jsonStr);
      console.log(this.typeList);
    },
    methods: {
      goodsClass(arr) {
        let json = {};
        arr.forEach((item) => {
          let types = item.format;
          for (var i = 0; i < types.length; i++) {
            let type = types[i];
            if (!json[type.name]) {
              json[type.name] = {};
            }
            json[type.name][type.text] = type;
          }
        });
        return json;
      }
    },
    components: {
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";

  .mask
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    background: rgba(0, 0, 0, 0.3)

  .goods-type
    position: fixed
    left: 50%
    bottom: 7px
    width: 96%
    padding: 15px 3%
    z-index: 9
    transform: translateX(-50%)
    height: 362px
    background: #fff
    border-radius: 8px
    box-sizing border-box
    overflow: hidden
    .goods-info
      display: flex
      padding-bottom: 30px
      border-1px(#d9d9d9)
      .icon
        flex: 0 0 115px
        border: 1px #ccc solid
        border-radius: 5px
        .image
          display: block
      .desc
        flex: 1
        padding: 0 20px
        .price
          color: #d85645
          font-size: 17px
          line-height: 42px
          font-weight: 600
        .type
          font-size: 17px
          line-height: 34px
          color: #333
        .selType
        .hasStock
          color: #999;
          line-height: 20px;
    .types
      .type-item
        border-1px(#d9d9d9)
        .key
          padding-top: 12px;
          font-size: 14px;
          line-height: 28px
          font-weight: 600
          color: #333
        .value
          display: inline-block
          font-size: 12px
          margin-left: 25px;
          margin-bottom: 15px;
          padding: 0 16px;
          color: #333;
          line-height: 26px;
          border: 1px #b3b3b3 solid;
          border-radius: 6px;
    .number
      padding-bottom: 60px
      .key
        padding-top: 12px;
        font-size: 14px;
        line-height: 28px
        font-weight: 600
        color: #333
</style>
