<template>
  <transition name="slide">
    <scroll class="subject-detail" :data="recommend">
      <div>
        <div class="back">
          <i class="icon-back" @click="toSubject"></i>
        </div>
        <div class="subject-cont" v-if="recommend">
          <h2 class="title">{{subjectDetail.subjectTitle}}</h2>
          <p class="title">{{subjectDetail.subjectDescription}}</p>
          <div class="content">
            <div v-html="setTimeData(subjectDetail.subjectUpdateTime)"></div>
            <img v-for="item in subjectDetail.imgList" :src="item.imgUrl"/>
          </div>
        </div>
        <div class="recommend-title">相关推荐</div>
        <recommend :recommend="recommend"></recommend>
      </div>
    </scroll>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {getSpecialSubjectById} from 'api/subject';
  import {RETURN_CODE} from 'api/config';
  import Recommend from 'components/recommend/recommend';
  import Scroll from 'base/scroll/scroll';

  export default {
    data() {
      return {
        recommend: [],
        subjectDetail: {}
      };
    },
    computed: {
      ...mapGetters([
        'subject'
      ])
    },
    created() {
      this._getDetail();
    },
    methods: {
      setTimeData(time) {
        return time;
      },
      toSubject() {
        this.$router.push('/subject');
      },
      _getDetail() {
        if (!this.subject.id) {
          this.$router.push('/subject');
          return;
        }
        getSpecialSubjectById(this.subject.id).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.recommend = res.goodsRecommend;
            this.subjectDetail = res.subjectDetail[0];
          }
        });
      }
    },
    components: {
      Recommend,
      Scroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .subject-detail
    position: absolute
    z-index: 100
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: #f4f4f4
    .back
      position: absolute
      left: 5px
      top: 5px
      width: 20px
      height: 30px
      .icon-back
        display: inline-block
        width: 20px
        height: 30px
        background: no-repeat center
        bg-image(l-arrow)
        background-size: 8.5px 18.5px
    .subject-cont
      padding: 10px 4px 10px
      background: #fff
      .title
        text-align: center
        font-size: 14px
        line-height: 26px
        color: #414141
      .desc
        font-size: 13px
        line-height: 30px
        color: #414141
    .content
      img
        width: 100%

  .recommend-title
    margin: 10px 0
    font-size: 14px
    line-height: 45px
    text-align: center
    background: #fff
    color: #000

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
