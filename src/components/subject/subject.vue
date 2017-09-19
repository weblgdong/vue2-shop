<template>
  <div class="subject-wrapper">
    <div class="subject-head">
      <div class="subject-search">
        <i class="icon"></i>
        <span>搜索专题</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAppBut} from 'api/public';
  import {RETURN_CODE} from 'api/config';

  export default {
    methods: {
      _getAppBut() {
        getAppBut().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.appButtons = res.buttonText.sort((a, b) => {
              return a.cdeCode.charCodeAt(2) - b.cdeCode.charCodeAt(2);
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .subject-wrapper
    .subject-head
      padding: 7px 3% 0
      height: 40px
      background: #25d299
      .subject-search
        height: 32px;
        background: #fff
        text-align: center
        line-height: 32px
        border-radius: 4px
        font-size: 13px
        color: #000
        .icon
          display: inline-block
          width: 14.5px
          height: 13px
          bg-image(search)
          background-size: 14.5px 13px
</style>
