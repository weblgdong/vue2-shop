<template>
  <div class="user-wrapper">
    <div class="header">
      <div class="user-info">
        <div class="avatar-wrapper">
          <div class="avatar">
            <img v-if="!data.imgUrl" src="./avatar.png" width="48.5" height="53.5"/>
            <img v-if="data.imgUrl" :src="data.imgUrl" width="100%" height="100%"/>
          </div>
        </div>
        <div class="register">
          <div class="nickName" v-if="data.nickName">
            <span>{{data.nickName}}</span>
          </div>
          <div class="types" v-if="!data.nickName">
            <span>登录</span><span class="line">/</span><span>注册</span>
          </div>
        </div>
      </div>
    </div>
    <Scroll class="user-scroll">
      <div>
        <div class="order-desc">
          <div class="all-order"></div>
          <div class="order-types">
            <div class="order-item unpaid"></div>
            <div class="order-item wait-Send"></div>
            <div class="order-item wait-collect"></div>
            <div class="order-item customer-service"></div>
          </div>
        </div>
        <ul class="user-list">
          <li class="list-item border-1px">
            <i class="icon oybuy"></i>
            <span class="name">一元购</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon coupon"></i>
            <span class="name">优惠劵</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon footprint"></i>
            <span class="name">我的足迹</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon collection"></i>
            <span class="name">我的收藏</span>
            <span class="arrow"></span>
          </li>
        </ul>
        <ul class="user-list">
          <li class="list-item border-1px">
            <i class="icon master"></i>
            <span class="name">成为达人</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon invite"></i>
            <span class="name">邀请好友</span>
            <span class="arrow"></span>
          </li>
        </ul>
        <ul class="user-list">
          <li class="list-item border-1px">
            <i class="icon service"></i>
            <span class="name">在线客服</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon news"></i>
            <span class="name">通知消息</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon address"></i>
            <span class="name">地址管理</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon safe"></i>
            <span class="name">账户安全</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon help"></i>
            <span class="name">帮助中心</span>
            <span class="arrow"></span>
          </li>
          <li class="list-item border-1px">
            <i class="icon set"></i>
            <span class="name">设置</span>
            <span class="arrow"></span>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import {RETURN_CODE} from 'api/config';
  import {getMemberImgBy16Id} from 'api/user';

  export default {
    data() {
      return {
        data: {}
      };
    },
    created() {
      this._getMemberImgBy16Id();
    },
    methods: {
      _getMemberImgBy16Id() {
        getMemberImgBy16Id().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.data = res.data;
          }
        });
      }
    },
    components: {
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .user-wrapper
    height: 100%
    background: #f0f0f0
    .header
      display: flex
      align-items center
      height: 180px
      background-repeat: no-repeat
      bg-image(header-bj)
      background-size: cover
      .user-info
        display: flex
        padding-left: 17px
        .avatar-wrapper
          flex: 0 0 80px
          margin-right: 22px
          width: 80px
          .avatar
            display: flex
            justify-content: center
            align-items center
            width: 80px
            height: 80px
            background: #fff
            border-radius: 50%
            overflow: hidden
        .register
          flex: 1
          .types,.nickName
            display: flex
            height: 100%
            align-items center
            span
              display: inline-block
              font-size: 16px
              color: #000
              &.line
                padding: 0 4px

    .user-scroll
      position: absolute
      left: 0
      top: 180px
      bottom: 45px
      right: 0
      overflow: hidden
    .order-desc
      display: flex
      margin: 10px
      height: 150px
      border-radius: 5px
      border: 1px #a8a8a8 solid
      background: #fff
      .all-order
        flex: 0 0 33.3%
        width: 33.3%
        background: no-repeat center
        bg-image(all-order)
        background-size: 57px 53px
      .order-types
        flex: 1
        .order-item
          float: left
          width: 50%
          height: 75px
          box-sizing border-box
          border-left: 1px #f0f0f0 solid
          background: no-repeat center
          background-size: 43px 42px
          &.unpaid
            bg-image(unpaid)
            border-bottom: 1px #f0f0f0 solid
          &.wait-Send
            bg-image(wait-Send)
            border-bottom: 1px #f0f0f0 solid
          &.wait-collect
            bg-image(wait-collect)
          &.customer-service
            bg-image(customer-service)
    .user-list
      background: #fff
      padding: 0 14px
      margin-bottom: 6px
      .list-item
        height: 42px
        line-height: 42px
        font-size: 14px
        color: rgb(73, 73, 73)
        border-1px(rgb(240, 240, 240))
        .icon
          vertical-align top
          display: inline-block
          width: 40px
          height: 42px
          background: no-repeat center
          background-size: 20px 18px
          &.oybuy
            bg-image(oybuy)
          &.coupon
            bg-image(coupon)
          &.footprint
            bg-image(footprint)
          &.collection
            bg-image(collection)
          &.master
            bg-image(master)
          &.invite
            bg-image(invite)
          &.service
            bg-image(service)
          &.news
            bg-image(normal-news)
            &.has
              bg-image(news)
          &.address
            bg-image(address)
          &.safe
            bg-image(safe)
          &.help
            bg-image(help)
          &.set
            bg-image(set)
        .arrow
          float right
          width: 20px
          height: 42px
          background: no-repeat left center
          bg-image(r-arrow)
          background-size: 6px 12.5px
      &:last-child
        padding-bottom: 25px
</style>
