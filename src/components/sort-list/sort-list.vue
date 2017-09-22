<template>
  <div>
    <div class="cover-wrapper">
      <img v-lazy="cover" class="cover"/>
    </div>
    <div class="type-title">
        <span class="name">
           {{typeTitle}}
        </span>
    </div>
    <div class="child-group">
      <ul>
        <li class="type-item" v-for="item in allTypes" @click="selectSortItem(item)">
          <img v-lazy="item.imgUrl" width="62" height="62"/>
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      typeTitle: {
        typeTitle: {
          type: String,
          default: ''
        }
      },
      allTypes: {
        type: Array,
        default: []
      },
      cover: {
        type: String,
        default: ''
      }
    },
    methods: {
      selectSortItem(item) {
        this.$emit('select', item);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cover-wrapper
    height: 100px
    overflow: hidden
    .cover
      width: 100%

  .type-title
    padding: 25px 0 10px
    text-align: center
    font-size: 13px
    color: #464646
    .name
      position: relative
      display: inline-block
      &:before
        position: absolute
        left: -33px
        top: 6px
        content: ''
        font-size: 0
        width: 25px
        height: 1px
        background: #dfdddd
      &:after
        position: absolute
        right: -33px
        top: 6px
        content: ''
        font-size: 0
        width: 25px
        height: 1px
        background: #dfdddd

  .child-group
    .type-item
      display: inline-block
      width: 33%
      text-align center
      .name
        display block
        padding-top: 10px
        height: 33px
        font-size: 13px
        color: #464646
</style>
