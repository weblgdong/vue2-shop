<template>
  <transition name="slide">
    <view-slot :title="subjectDetail.subjectTitle">
      <scroll class="subject-detail" :data="recommend">
        <div>
          <div class="subject-cont" v-if="recommend">
            <p class="desc">{{subjectDetail.subjectDescription}}</p>
            <div class="content">
              <img v-for="item in subjectDetail.imgList" :src="item.imgUrl"/>
            </div>
            <visit v-if="subjectDetail.subjectCreateTime" :visit="subjectDetail.subjectVisitCount"
                   :time="subjectDetail.subjectCreateTime.time"></visit>
          </div>
          <div class="recommend-title">相关推荐</div>
          <recommend :recommend="recommend"></recommend>
        </div>
      </scroll>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {getSpecialSubjectById} from 'api/subject';
  import {RETURN_CODE} from 'api/config';
  import Recommend from 'components/recommend/recommend';
  import Scroll from 'base/scroll/scroll';
  import Visit from 'base/visit/visit';
  import viewSlot from 'base/view-slot/view-slot';

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
          console.log(1, this.subjectDetail);
        });
      }
    },
    components: {
      Recommend,
      Scroll,
      Visit,
      viewSlot
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .subject-detail
    position: absolute
    left: 0
    top: 40px
    bottom: 0
    right: 0
    background: #f4f4f4
    .subject-cont
      padding: 5px 4px 10px
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
        text-align: center;
    .content
      img
        width: 100%

  .subject-cont
    text-align: right

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
