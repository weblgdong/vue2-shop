<template>
  <div>
    <ul class="seckill-tab">
      <li class="tab-item" v-for="(item,index) in seckillTime" :class="{'active':index===selIndex}"
          @click="selItem(index)">
        <p class="time" v-html="getStartHour(item.startTime.time)"></p>
        <p class="status">{{seckillStatus[item.seckillStatus]}}</p>
      </li>
    </ul>
    <goods-list :list="list"></goods-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSeckillTime, getSeckillGoods} from 'api/oybuy';
  import {RETURN_CODE} from 'api/config';
  import {dateFilter} from 'common/js/dateFilter';
  import goodsList from 'base/goods-list/goods-list';

  export default {
    data() {
      return {
        seckillTime: [],
        selIndex: 0,
        firstVisit: true,
        initTime: [],
        list: []
      };
    },
    created() {
      this.seckillStatus = {
        '10A': '正在抢购',
        '10B': '将要抢购',
        '10C': '抢购结束'
      };
      this._getSeckillTime();
    },
    methods: {
      selItem(index) {
        this.selIndex = index;
      },
      getStartHour(time) {
        return dateFilter(time, 'HH:mm');
      },
      _getSeckillGoods(time) {
        getSeckillGoods(time).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.list = res.seckillGoods;
          }
        });
      },
      _getSeckillTime() {
        getSeckillTime().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.seckillTime = res.seckillTime;
            res.seckillTime.forEach((item) => {
              let time = item.startTime.time;
              this.initTime.push(dateFilter(time));
            });
            if (this.firstVisit) {
              this._getSeckillGoods(this.initTime[0]);
              this.firstVisit = false;
            }
          }
        });
      }
    },
    watch: {
      selIndex(index) {
        this._getSeckillGoods(this.initTime[index]);
      }
    },
    components: {
      goodsList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";

  .seckill-tab
    display: flex
    margin-bottom: 6px
    height: 52px
    background: #fff
    .tab-item
      flex: 1
      text-align: center
      color: #aaa
      line-height: 1
      &.active
        color: #f82f44
        .status
          font-weight: bold
      .time
        padding: 8px 0 5px
        font-size: 20px
        font-weight: bold
      .status
        font-size: 12px
</style>
