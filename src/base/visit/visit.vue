<template>
  <div class="visit-group">
    <span v-if="time" v-html="formatTime()" class=""></span>
    <i class="visit-icon"></i>
    <span class="visit-number">{{visit}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      visit: {
        type: Number,
        default: 1
      },
      time: {
        type: Number,
        default: 0
      }
    },
    methods: {
      formatTime() {
        if (this.time === 0) {
          return '';
        }
        return new Date(this.time).toLocaleString('GMT').split(' ')[0].split('/').join('-');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .visit-group
    padding: 8px;
    padding-right: 10px
    text-align: right
    font-size: 10px
    color: #828282
    .release-time
      display: inline-block
    .visit-icon
      display: inline-block
      margin: 0 5px 0 9px
      width: 17.5px
      height: 10px
      bg-image(visit)
      background-size: 17.5px 10px
    .visit-number
      display: inline-block

</style>
