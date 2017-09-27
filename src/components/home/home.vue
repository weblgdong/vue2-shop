<template>
  <div class="home-wrapper">
    <div class="home-head">
      <div class="scan-code">
        <i class="icon"></i>
      </div>
      <div class="home-search">
        <i class="icon"></i>
        <span>搜索商品</span>
      </div>
      <div class="message"></div>
    </div>
    <ul class="button-group" v-if="appButtons.length">
      <li v-for="(item,index) in appButtons" class="item"
          :class="{'active':buttonIndex==index}"
          :data-cdeCode="item.cdeCode"
          :data-index="index"
          @click="_getHomeContent"
      >
        <p :data-cdeCode="item.cdeCode" :data-index="index">{{item.cdeName}}</p>
      </li>
    </ul>
    <div class="home-content" v-if="themes.length">
      <scroll ref="scroll" :data="goodsRecommend" class="scroll-content">
        <div>
          <div v-if="sliders.length" class="slider-wrapper">
            <slider>
              <div v-for="item in sliders">
                <a href="javascript:;">
                  <img :src="item.url" height="203"/>
                </a>
              </div>
            </slider>
          </div>
          <div class="all-types" v-if="themes.length">
            <h2 class="title">全部分类</h2>
            <dl>
              <dt>
                <a href="javascript:;">
                  <img :src="themes[0].themeGoodImgurl"/>
                </a>
              </dt>
              <dd>
                <a href="javascript:;">
                  <img :src="themes[1].themeGoodImgurl"/>
                </a>
                <a href="javascript:;">
                  <img :src="themes[2].themeGoodImgurl"/>
                </a>
              </dd>
            </dl>
          </div>
          <div class="goodsNewest" v-if="goodsNewest.length">
            <h2 class="title">新品推荐</h2>
            <div class="goods-wrapper">
              <slider-x :data="goodsNewest">
                <div>
                  <ul class="goods" style="width:505px">
                    <li class="goods-item" v-for="item in goodsNewest" @click="clickGoods(item)">
                      <a href="javascript:;">
                        <img v-lazy="item.imgUrl" width="118" height="118"/>
                        <span class="name">{{item.title}}</span>
                        <span class="price">¥{{item.price}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </slider-x>
            </div>
            <div class="more-all">
              查看所有新品 &gt;
            </div>
          </div>
          <div class="subject" v-if="data.subject">
            <h2 class="title">
              专题推荐
            </h2>
            <div class="subject-wrapper" @click="clickSubject(data.subject)">
              <img :src="data.subject.subjectImageUrl" height="117"/>
              <div class="subject-bottom">
                <div class="sub-l">
                  <span class="sub-title">{{data.subject.subjectTitle}}</span>
                  <span class="sub-desc">{{data.subject.subjectDescription}}</span>
                </div>
                <div class="sub-r">
                  <i class="icon"></i>
                  <span class="visit">{{data.subject.subjectVisitCount}}</span>
                </div>
              </div>
            </div>
          </div>
          <recommend :recommend="goodsRecommend"></recommend>
        </div>
        <div class="loading-container" v-show="loadingShow">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {RETURN_CODE} from 'api/config';
  import {getIndexContent} from 'api/home';
  import {getAppBut} from 'api/public';
  import {getData} from 'common/js/demo';
  import Slider from 'base/slider/slider';
  import sliderX from 'base/sliderX/sliderX';
  import Scroll from 'base/scroll/scroll';
  import Recommend from 'components/recommend/recommend';
  import Loading from 'base/loading/loading';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        data: {},
        appButtons: [],
        sliders: [],
        themes: [],
        goodsNewest: [],
        goodsRecommend: [],
        buttonIndex: 0,
        loadingShow: true
      };
    },
    created() {
      this._getAppBut();
      this._getIndexContent();
    },
    methods: {
      clickGoods(goods) {
        this.$router.push({
          path: `/goods`
        });
        this.setGoods(goods);
      },
      clickSubject(subject) {
        this.$router.push({
          path: `subject/${subject.id}`
        });
        this.setSubject(subject);
      },
      _getIndexContent(typeId) {
        this.loadingShow = true;
        getIndexContent(typeId).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.data = res;
            this.themes = res.theme;
            this.goodsNewest = res.goodsNewest;
            this.goodsRecommend = res.goodsRecommend;
            this.loadingShow = false;
            if (res.carousels.length) {
              this.sliders = res.carousels;
            }
          }
        });
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
      _getHomeContent(e) {
        let typeCode = getData(e.target, 'cdecode');
        this.buttonIndex = getData(e.target, 'index');
        this._getIndexContent(typeCode);
        e.cancelBubble = true;
      },
      ...mapMutations({
        setSubject: 'SET_SUBJECT',
        setGoods: 'SET_GOODS'
      })
    },
    components: {
      Scroll,
      Slider,
      Recommend,
      sliderX,
      Loading
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  .home-wrapper
    .home-head
      padding-top: 7px
      height: 40px
      background: #25d299
      display: flex
      .scan-code
        flex: 0 0 48px
        width: 48px
        text-align center
        .icon
          display: block
          height: 32px
          bg-image(scan-code)
          background-position: center 2px
          background-repeat: no-repeat
          background-size: 24.5px 28px
      .home-search
        flex: 1
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
      .message
        flex: 0 0 49px
        background: url(message@3x.png) no-repeat center 1px
        background-size: 17px 29px
        &.has
          background-image: url(has-message@3x.png)
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
    .home-content
      position: fixed
      left: 0
      right: 0
      bottom: 45px
      top: 80px
      .scroll-content
        height: 100%
        overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 203px
        overflow: hidden
      .all-types
        .title
          padding: 17px 0 15px
          text-align: center
          font-size: 16px
          color: #212121
        dl
          display: flex
          padding: 0 5px
          img
            display block
            width: 100%
            border-radius: 5px
          a
            display block
          dt
            overflow: hidden
            margin-right: 5px
            flex: 1
            img
              width: auto
              min-width: 100%
              height: 180px
            a
              height: 100%
          dd
            flex: 1
            img
              height: 88px
            a:first-child
              margin-bottom: 5px

      .goodsNewest
        margin-top: 27px
        background: #f6f6f6
        .title
          padding: 17px 0 15px
          text-align: center
          font-size: 16px
          color: #212121
        .goods-wrapper
          position: relative
          padding-left: 14px
          height: 184px
          .goods
            height: 184px
            overflow: hidden
            .goods-item
              float: left
              margin-right: 8px
              width: 118px
              height: 184px
              text-align: center
              padding-bottom: 16px
              a
                display block
                span
                  display: block
                  &.name
                    padding: 13px 0 9px
                    font-size: 13px
                    color: #212121
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
                  &.price
                    color: #269f77
                    font-size: 13px
                img
                  max-width: 98%
                  border-radius: 5px
        .more-all
          padding-bottom: 19px
          font-size: 11px
          text-align: center
          color: #626262
      .subject
        .title
          padding: 17px 0 15px
          text-align: center
          font-size: 16px
          color: #212121
        .subject-wrapper
          img
            width: 100%
            height: 177px
          .subject-bottom
            overflow: hidden
            height: 61px
            padding: 0 11px 0 14px
            .sub-title
              padding-top: 10px
              padding-bottom: 7px
              color: #1d1d1d
              font-size: 13px
            .sub-desc
              font-size: 10px
              color: #4f4f4f
            .sub-l
              float: left
              span
                display block
            .sub-r
              padding-top: 12px
              float: right
              .icon
                display: inline-block
                margin-right: 9px
                width: 17.5px
                height: 10px
                bg-image(visit)
                background-size: 17.5px 10px
              .visit
                font-size: 10px
                color: #828282
</style>
