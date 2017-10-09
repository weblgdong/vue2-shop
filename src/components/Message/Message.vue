<template>
  <transition name="slide">
    <view-slot :title=title>
      <ul class="message-list">
        <li class="message-item border-1px" v-for="(item,key) in messageList" @click="selMessType(item.type)">
          <i class="icon" :class="key"></i>
          <span class="name">{{item.name}}</span>
          <i class="icon arrows"></i>
          <span class="tip" v-if="messageNumber[item.relevance]">有未读信息</span>
        </li>
      </ul>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import viewSlot from 'base/view-slot/view-slot';
  import {mapGetters} from 'vuex';
  import {messageManger} from 'api/message';

  export default {
    data() {
      return {
        title: '我的消息',
        messageList: {
          service: {
            name: '客服信息',
            relevance: 'kefuNum',
            type: '10A'
          },
          system: {
            name: '系统消息',
            relevance: 'xitongNum',
            type: '10B'
          },
          activity: {
            name: '活动通知',
            relevance: 'pingtaiNum',
            type: '10C'
          },
          logistics: {
            name: '交易物流消息',
            relevance: 'wuliuNum',
            type: '10D'
          }
        }
      };
    },
    computed: {
      ...mapGetters([
        'messageNumber'
      ])
    },
    created() {
      console.log(11, this.messageNumber);
    },
    methods: {
      selMessType(type) {
        messageManger(type).then((res) => {
          console.log(res);
        });
      }
    },
    components: {
      viewSlot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl";
  @import "~common/stylus/variable.styl";

  .message-list
    position: absolute
    left: 0
    top: $h-height
    right: 0
    bottom: 0
    background: $c-b-color
    .message-item
      height: 46px
      line-height: 46px
      background: #fff
      border-1px(#ddd)
      .icon
        float: left
        width: 52px
        height: 46px
        background: no-repeat center;
        background-size: 26px 25px
        &.service
          bg-image(service)
        &.activity
          bg-image(activity)
        &.logistics
          bg-image(logistics)
        &.system
          bg-image(system)
        &.arrows
          float: right
          bg-image(arrows)
          background-size: 7px 15px
      .name
        float: left
        font-size: 14px
        color: #000
      .tip
        float: right
        font-size: 12px
        color: #aaa
</style>
