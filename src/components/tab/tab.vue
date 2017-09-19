<template>
  <div class="tab">
    <router-link tag="div" to="/home" class="tab-item">
      <div class="tab-link">
        <span class="icon home-icon"></span>
        <span class="name">首页</span>
      </div>
    </router-link>
    <router-link tag="div" to="/subject" class="tab-item">
      <div class="tab-link">
        <span class="icon subject-icon"></span>
        <span class="name">
          专题
        </span>
      </div>
    </router-link>
    <router-link tag="div" to="/sort" class="tab-item">
      <div class="tab-link">
        <span class="icon sort-icon"></span>
        <span class="name">
          分类
        </span>
      </div>
    </router-link>
    <router-link tag="div" to="/shopcart" class="tab-item">
      <div class="tab-link">
        <span class="icon shopcart-icon"></span>
        <span class="name">
          购物车
        </span>
      </div>
    </router-link>
    <router-link tag="div" to="/user-center" class="tab-item">
      <div class="tab-link">
        <span class="icon user-icon"></span>
        <span class="name">
          我的
        </span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .tab
    position fixed
    left: 0
    bottom: 0
    z-index: 99
    display: flex
    width: 100%
    height: 48px
    background: #fff
    .tab-item
      position: relative
      top: -5px
      flex: 1
      padding: 5px 10px 0
      background: #fff
      &:before
        content: ""
        position: absolute
        left: 0
        top: 0
        width: 10px;
        height: 100%
        background: #fff
      &:after
        content: ""
        position: absolute
        right: 0
        top: 0
        width: 10px;
        height: 100%
        background: #fff
      .tab-link
        text-align: center
        .icon
          display: block
          height: 26px
          background-repeat: no-repeat
          background-position: center 2px
          &.home-icon
            bg-image(home)
            background-size: 21px 20px
          &.subject-icon
            bg-image(subject)
            background-size: 24px 20px
          &.sort-icon
            bg-image(sort)
            background-size: 18px 20px
          &.shopcart-icon
            bg-image(shopcart)
            background-size: 24px 20px
          &.user-icon
            bg-image(user)
            background-size: 19px 19px
        .name
          display: block
          font-size: 12px
          color: #888

    .router-link-active
      top: 0
      padding-top: 0
      &:before
        top: -5px
        border-radius: 0 5px 0 0
      &:after
        top: -5px
        border-radius: 5px 0 0 0
      .tab-link
        border-radius: 0 0 5px 5px
        box-shadow: inset 0px 0px 10px #e1e1e1
        .name
          padding-bottom: 3px
          color: #58b281
        .icon
          height: 30px
          background-position: center 5px
          &.home-icon
            bg-image(home_active)
            background-size: 21px 20px
          &.subject-icon
            bg-image(subject_active)
            background-size: 24px 20px
          &.sort-icon
            bg-image(sort_active)
            background-size: 18px 20px
          &.shopcart-icon
            bg-image(shopcart_active)
            background-size: 24px 20px
          &.user-icon
            bg-image(user_active)
            background-size: 19px 19px
</style>
