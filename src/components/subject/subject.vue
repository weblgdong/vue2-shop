<template>
  <div class="subject-wrapper">
    <div class="subject-head">
      <div class="subject-search">
        <i class="icon"></i>
        <span>搜索专题</span>
      </div>
    </div>
    <ul class="button-group" v-if="appButtons.length">
      <li v-for="(item,index) in appButtons" class="item"
          :class="{'active':buttonIndex==index}"
          :data-cdeCode="item.cdeCode"
          :data-index="index"
          @click="_getButtonCode(item.cdeCode,index)"
      >
        <p :data-cdeCode="item.cdeCode" :data-index="index">{{item.cdeName}}</p>
      </li>
    </ul>
    <div class="subject-content" :data="subjectList" v-if="subjectList.length">
      <div>
        <subject-list v-if="subjectList.length" @select="selectSubject" :list="subjectList"></subject-list>
      </div>
      <div class="loading-container" v-show="!subjectList.length" v-if="!noData">
        <loading></loading>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAppBut} from 'api/public';
  import {RETURN_CODE} from 'api/config';
  import {getSubjectList} from 'api/subject';
  import Scroll from 'base/scroll/scroll';
  import subjectList from 'components/subjectList/subjectList';
  import Loading from 'base/loading/loading';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        appButtons: [],
        subjectList: [],
        buttonIndex: 0,
        noData: false
      };
    },
    created() {
      this._getAppBut();
      this._getSubjectList();
    },
    methods: {
      selectSubject(subject) {
        this.$router.push({
          path: `/subject/${subject.id}`
        });
        this.setSubject(subject);
      },
      _getButtonCode(code, index) {
        this.buttonIndex = index;
        this._getSubjectList(code);
      },
      _getAppBut() {
        getAppBut().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.appButtons = res.buttonText.sort((a, b) => {
              return a.cdeCode.charCodeAt(2) - b.cdeCode.charCodeAt(2);
            });
          }
        });
      },
      _getSubjectList(code) {
        getSubjectList(code).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.subjectList = res.subjectList;
            if (res.subjectList.length === 0) {
              this.noData = true;
            }
          }
        });
      },
      ...mapMutations({
        setSubject: 'SET_SUBJECT'
      })
    },
    components: {
      subjectList,
      Scroll,
      Loading
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
    .button-group
      display: flex
      background: #fafafa
      height: 32px
      border-bottom: 1px #d8d8d8 solid
      .item
        position: relative
        flex: 1
        z-index: 1
        height: 32px
        text-align: center
        font-size: 14px
        color: #858585
        background: #fafafa
        p
          padding-top: 9px
        &.active
          background: #fff
          color: #212121
          z-index: 2
          padding-bottom: 2px
          transform: skewX(-25deg)
          box-shadow: 0px 0px 3px rgba(136, 136, 136, 0.36);
          p
            transform: skewX(25deg)
        &.active:first-child
          box-shadow: 3px 0px 3px rgba(136, 136, 136, 0.36);
        &.active:last-child
          box-shadow: 0px 0px 3px rgba(136, 136, 136, 0.36);
          &:after
            position: absolute
            content: ''
            right: 0;
            top: 0
            width: 15%
            height: 34px
            background: #fff
            transform: skewX(35deg)
    .subject-content
      position: fixed
      left: 0
      right: 0
      bottom: 45px
      top: 80px
      background: #eaeaea
      overflow: hidden
</style>
