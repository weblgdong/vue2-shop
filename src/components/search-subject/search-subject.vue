<template>
  <transition name="slide">
    <view-slot :title="title">
      <scroll :data="resultList" class="search-subject">
        <div>
          <subject-list :list="resultList" @select="selectSubject"></subject-list>
        </div>
      </scroll>
    </view-slot>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {RETURN_CODE} from 'api/config';
  import Scroll from 'base/scroll/scroll';
  import viewSlot from 'base/view-slot/view-slot';
  import {mapGetters, mapMutations} from 'vuex';
  import {getGoodOrSubjectByKey} from 'api/search';
  import subjectList from 'components/subjectList/subjectList';

  export default {
    data() {
      return {
        resultList: []
      };
    },
    computed: {
      ...mapGetters([
        'subjectList'
      ])
    },
    created() {
      if (!this.subjectList.id) {
        this.$router.push('/subject');
      }
      this._getGoodOrSubjectByKey();
    },
    methods: {
      selectSubject(subject) {
        this.$router.push({
          path: `/subject/${subject.id}`
        });
        this.setSubject(subject);
      },
      _getGoodOrSubjectByKey() {
        this.title = this.subjectList.searchKey || this.subjectList.subjectTitle;
        console.log(this.title);
        getGoodOrSubjectByKey(this.title, '10B').then((res) => {
          if (res.return_code === RETURN_CODE) {
            this.resultList = res.resultList;
          }
        });
      },
      ...mapMutations({
        setSubject: 'SET_SUBJECT'
      })
    },
    components: {
      Scroll,
      viewSlot,
      subjectList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-subject
    position: absolute
    left: 0
    top: 40px
    right: 0
    bottom: 0
    background: #eaeaea
</style>
