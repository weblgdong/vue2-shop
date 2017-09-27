<template>
  <div>
    <ul class="recommend" v-if="recommend.length">
      <li class="recommend-item" v-for="item in recommend" @click="selectItem(item)">
        <img v-lazy="changeImg(item.imgUrl)" height="185">
        <div class="good-desc">
          <div class="title">
            <sale-type :type="item.saleType"></sale-type>
            {{item.title}}
          </div>
          <div class="price">
            ¥{{item.price}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import saleType from 'base/sale-type/sale-type';
  import {mapMutations} from 'vuex';

  export default {
    props: {
      recommend: {
        type: Array,
        default: []
      }
    },
    created() {
    },
    methods: {
      changeImg(url) {
        url = url.replace('123.127.76.30:9951', '192.168.1.200');
        return url;
      },
      selectItem(item) {
        this.$router.push({
          path: `/goods`
        });
        this.setGoods(item);
      },
      ...mapMutations({
        setGoods: 'SET_GOODS'
      })
    },
    components: {
      saleType
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    background: #ededed
    padding: 11px 0 11px 3px
    overflow: hidden
    .recommend-item
      float: left
      width: 50%
      height: 255px
      margin-bottom: 3px
      box-sizing border-box
      border-right: 3px solid #f0f0f0;
      overflow: hidden
      border-radius: 3px
      background: #fff
      img
        display: block
        vertical-align: top
        width: 100%
        border-radius: 5px
      .good-desc
        height: 57px
        padding: 5px 7px 8px
        background: #fff
        .title
          font-size: 11px
          line-height: 17px
          color: #343434
          min-height: 26px
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .price
          padding-top: 8px
          font-size: 15px
          color: #0f9669
          font-weight: 600

</style>
