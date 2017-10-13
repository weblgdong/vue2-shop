<template>
  <div class="search-wrapper" v-if="disSearch">
    <div class="search-header">
      <div class="text-wrapper">
        <div class="text">
          <div class="search-icon">
            <i class="icon"></i>
          </div>
          <input type="text" v-model="searchVal" :placeholder="searchMap[searchType]" class="search-input">
        </div>
      </div>
      <div class="cancel" @click="hideSearch">
        取消
      </div>
    </div>
    <div v-show="!toSearch">
      <div class="hot-search border-1px">
        <dl>
          <dt class="type">热搜</dt>
          <dd class="name-group">
            <p class="name" v-if="hotSearch.length" v-for="item in hotSearch" @click="selSearchItem(item)">
              {{item.cdeName}}</p>
          </dd>
        </dl>
      </div>
      <ul class="record-list">
        <li class="border-1px name" v-for="item in keyList" @click="selSearchItem(item)">{{item.searchKey}}</li>
      </ul>
      <div class="clear-record" v-if="keyList.length">一键清空历史记录</div>
      <div class="clear-record" v-if="keyList.length===0">暂无搜索记录</div>
    </div>
    <ul class="record-list" v-show="toSearch" v-if="searchData.length">
      <li v-if="searchType==='10A'" class="border-1px name" v-for="item in searchData" @click="selSearchItem(item)">
        {{item.title}}
      </li>
      <li v-if="searchType==='10B'" class="border-1px name" v-for="item in searchData" @click="selSearchItem(item)">
        {{item.subjectTitle}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {RETURN_CODE} from 'api/config';
  import {getGoodSearchKey, searchRecordList, getGoodOrSubjectByKey, getSubjectSearchKey} from 'api/search';
  import {mapMutations} from 'vuex';
  import {debounce} from 'underscore';

  export default {
    props: {
      disSearch: {
        type: Boolean,
        default: false
      },
      searchType: {
        type: String,
        default: '10A'
      }
    },
    data() {
      return {
        hotSearch: [],
        keyList: [],
        toSearch: false,
        searchData: [],
        isSearch: true,
        searchVal: ''
      };
    },
    created() {
      this.searchMap = {
        '10A': '搜索商品',
        '10B': '搜索专题'
      };
      this.toSearch = false;
      this._getSearchKey();
      this._searchRecordList();
    },
    methods: {
      selSearchItem(item) {
        if (this.searchType === '10A') {
          this.$router.push({
            path: `/sort/liveView`
          });
          this.$emit('hiddenSearch', '111');
          this.setSort(item);
        } else {
          this.$router.push({
            path: 'search-subject'
          });
          this.setSubjectList(item);
        }
      },
      hideSearch() {
        this.$emit('hiddenSearch', '111');
      },
      _getSearchKey() {
        if (this.searchType === '10A') {
          getGoodSearchKey().then((res) => {
            if (res.return_code === RETURN_CODE) {
              this.hotSearch = res.goodKeyList;
            }
          });
        } else {
          getSubjectSearchKey().then((res) => {
            if (res.return_code === RETURN_CODE) {
              this.hotSearch = res.subjectKeyList;
            }
          });
        }
      },
      _searchRecordList() {
        searchRecordList(this.searchType).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.keyList = res.keyList;
          }
        });
      },
      _getGoodOrSubjectByKey: debounce(function () {
        getGoodOrSubjectByKey(this.searchVal, this.searchType).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.searchData = res.resultList;
          }
        });
      }, 300),
      ...mapMutations({
        setGoods: 'SET_GOODS',
        setSort: 'SET_SORT',
        setSubjectList: 'SET_SSUBJECT'
      })
    },
    watch: {
      searchVal(newVal) {
        if (newVal.length) {
          this.toSearch = true;
          this._getGoodOrSubjectByKey();
        } else {
          this.toSearch = false;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .search-wrapper
    position: fixed
    z-index: 100
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: rgba(255, 255, 255, 0.95)
    .search-header
      padding: 7px 0 0 16px
      height: 40px
      background: #25d299
      display: flex
      .text-wrapper
        flex: 1
        padding: 5px 0
        height: 32px
        background: #e5faf6
        border-radius: 4px
        font-size: 13px
        color: #000
        box-sizing border-box
        .text
          display: flex
          .search-icon
            flex: 0 0 30px
            padding: 3px 5px 0 0
            text-align: right
            .icon
              display: inline-block
              width: 14.5px
              height: 13px
              bg-image(search)
              background-size: 14.5px 13px
        input.search-input
          flex: 1
          color: #000
          font-size: 15px
          line-height: 20px
          background: none
      .cancel
        flex: 0 0 60px
        font-size: 14px
        line-height: 32px
        text-align center
        color: #000
    .hot-search
      border-1px(rgb(186, 186, 186))
      .type
        padding-left: 10px
        font-size: 12px
        font-weight: 600
        line-height: 27px
      .name-group
        max-height: 72px
        overflow: hidden
        .name
          display: inline-block
          padding: 0 15px
          margin: 0 0 9px 10px
          font-size: 12px
          line-height: 25px
          background: #e2e0e2
          color: #222
          border: 1px #e9e8e9 solid
          border-radius: 3px
    .record-list
      .name
        padding-left: 16px
        font-size: 12px
        color: #000
        line-height: 42px
        white-space: nowrap
        height: 42px
        overflow: hidden
        text-overflow: ellipsis
        border-1px(rgb(210, 210, 210))
    .clear-record
      font-size: 11px
      line-height: 37px
      color: #757575
      text-align: center
</style>
