<template>
  <div class="subject-list" v-if="list.length">
    <div class="subject-item" v-for="item in list" @click="selectItem(item)">
      <div class="list-head">
        <h2 class="title">{{item.subjectTitle}}</h2>
        <p class="description">{{item.subjectDescription}}</p>
      </div>
      <div class="list-body">
        <div class="hot" v-if="item.popularitySetting==='10A'"></div>
        <img v-lazy="item.subjectImageUrl" class="cover"/>
      </div>
      <div class="list-footer">
        <i class="icon"></i>
        <span class="visit">{{item.subjectVisitCount}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"

  .subject-list
    padding: 6px 4px
    .subject-item
      margin-bottom: 6px
      padding: 11px 5px 0
      background: #fff
      border: 1px #d8d8d8 solid
      .list-head
        text-align: center
        .title
          font-size: 15px
          color: #1d1d1d
          font-weight: 600
        .description
          padding: 7px 0 9px
          font-size: 12px
          color: #4f4f4f
      .list-body
        position: relative
        height: 164px
        .hot
          position: absolute
          right: -4px
          top: -3px
          width: 41px
          height: 41px
          bg-image(hot)
          background-size: 41px 41px
        .cover
          width: 100%
          height: 100%
      .list-footer
        text-align: right
        padding: 8px
        .icon
          display: inline-block
          margin-right: 9px
          width: 17.5px
          height: 10px
          bg-image(visit)
          background-size: 17.5px 10px
        .visit
          display: inline-block
          font-size: 10px;
          color: #828282;
</style>
