<template>
  <div class="sort-wrapper">
    <div class="sort-head">
      <div class="sort-search">
        <i class="icon"></i>
        <span>搜索商品</span>
      </div>
    </div>
    <div class="sort-content">
      <div class="goods-types">
        <scroll class="menu-wrapper" :data="types">
          <div>
            <ul>
              <li class="menu-item"
                  v-for="(type,index) in types"
                  :class="{'active':index==selIndex}"
                  @click="getElNode(type.id,index)"
              >{{type.name}}
              </li>
            </ul>
          </div>
        </scroll>
        <scroll class="child-wrapper" :data="allTypes">
          <sort-list :cover="cover" :allTypes="allTypes" @select="selectSort"></sort-list>
        </scroll>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import {getAllParentType, getAllTypeByParent} from 'api/sort';
  import {RETURN_CODE} from 'api/config';
  import sortList from 'components/sort-list/sort-list';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        types: [],
        cover: '',
        allTypes: [],
        typeTitle: '',
        parentId: '',
        selIndex: 0
      };
    },
    created() {
      this._getAllParentType();
    },
    watch: {
      parentId(id) {
        this._getAllTypeByParent(id);
      }
    },
    methods: {
      selectSort(item) {
        this.$router.push({
          path: `sort/liveView`
        });
        this.setSort(item);
      },
      _getAllParentType() {
        getAllParentType().then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.types = res.types;
            this.typeTitle = res.types[0].name || '';
            this.parentId = res.types[0].id;
          }
        });
      },
      _getAllTypeByParent(parentId) {
        getAllTypeByParent(parentId).then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.allTypes = res.types;
            this.cover = res.parentImgUrl;
          }
        });
      },
      getElNode(id, index) {
        this.parentId = id;
        this.selIndex = index;
      },
      ...mapMutations({
        setSort: 'SET_SORT'
      })
    },
    components: {
      Scroll,
      sortList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  .sort-wrapper
    .sort-head
      padding: 7px 3% 0
      height: 40px
      background: #25d299
      .sort-search
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
    .sort-content
      position: fixed
      left: 0
      right: 0
      bottom: 45px
      top: 47px
      background: #ffffff
      overflow: hidden
      .goods-types
        display: flex
        height: 100%
        .menu-wrapper
          flex: 0 0 82px
          width: 82px
          text-align: center
          border-right: 1px #dcdcdc solid
          .menu-item
            padding: 13px 10px
            font-size: 15px
            color: #464646
            &.active
              color: #fff
              background: #28cd87
        .child-wrapper
          flex: 1
          padding: 11px 12px
</style>
