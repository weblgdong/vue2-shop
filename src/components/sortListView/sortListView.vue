<template>
  <transition name="slide">
    <view-slot :title="title">
      <div class="sort-list-view">
        <div class="recommend-goods" @click="selectGoods(recommendTop)">
          <img v-lazy="recommendTop.imgUrl" width="100%" height="175"/>
          <div class="text">
            <p class="title">{{recommendTop.title}}</p>
            <p class="desc">{{recommendTop.introduction}}</p>
          </div>
        </div>
        <div class="screen">
          <p class="screen-item">全部</p>
          <p class="screen-item">新品</p>
          <p class="screen-item">价格</p>
        </div>
        <recommend v-if="goods.length" :recommend="goods" @goodsSelect="selectGoods"></recommend>
      </div>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex';
  import {getAllGoodsByType} from 'api/sort';
  import {RETURN_CODE} from 'api/config';
  import viewSlot from 'base/view-slot/view-slot';
  import Recommend from 'components/recommend/recommend';

  export default {
    data() {
      return {
        recommendTop: {},
        title: '',
        goods: []
      };
    },
    computed: {
      ...mapGetters([
        'sort'
      ])
    },
    created() {
      this._getViewName();
      this._getSortData();
    },
    methods: {
      selectGoods(item) {
        if (!item.id) {
          return;
        }
        this.$router.push({
          path: `goods`
        });
        this.setGoods(item);
      },
      _getViewName() {
        this.title = this.sort.name;
      },
      _getSortData() {
        // 处理返回
        if (!this.sort.id) {
          this.$router.push('/sort');
          return;
        }
        getAllGoodsByType(this.sort.id, '10A', '10A').then((res) => {
          if (res.return_code === RETURN_CODE) {
            res.goods.forEach((item) => {
              if (item.recommendTop === '10A') {
                this.recommendTop = item;
              } else {
                this.goods.push(item);
              }
            });
            console.log(res);
          }
        });
      },
      ...mapMutations({
        setGoods: 'SET_GOODS'
      })
    },
    components: {
      viewSlot,
      Recommend
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .sort-list-view
    position: absolute
    left: 0
    top: 40px
    right: 0
    bottom: 0
    background: #f4f4f4
    .recommend-goods
      background: #fff
      .text
        height: 76px
        padding: 12px 16px 0
        .title
          font-size: 15px
          line-height: 23px
          color: #000
        .desc
          font-size: 13px
          line-height: 19px
          color: #4f4f4f
    .screen
      display: flex
      margin: 10px 0 0
      background: #fff
      height: 35px
      .screen-item
        flex: 1
        font-size: 13px
        line-height: 35px
        text-align: center
        color: #000

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
